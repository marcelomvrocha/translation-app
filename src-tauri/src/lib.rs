mod database;
mod llm_bridge;

use database::{Database, Project, Translation, TranslationStatus, ChatMessage, ChatRole};
use llm_bridge::{LocalLLMBridge, ChatMessage as LLMChatMessage};
use std::sync::Arc;
use tauri::{State, Manager};
use tokio::sync::Mutex;

type DbState = Arc<Mutex<Database>>;
type LLMState = Arc<Mutex<LocalLLMBridge>>;

// Project commands
#[tauri::command]
async fn create_project(db: State<'_, DbState>, name: String, description: Option<String>) -> Result<Project, String> {
    let db = db.lock().await;
    db.create_project(name, description).await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_projects(db: State<'_, DbState>) -> Result<Vec<Project>, String> {
    let db = db.lock().await;
    db.get_projects().await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_project(db: State<'_, DbState>, id: String) -> Result<Option<Project>, String> {
    let db = db.lock().await;
    db.get_project(&id).await.map_err(|e| e.to_string())
}

// Translation commands
#[tauri::command]
async fn create_translation(db: State<'_, DbState>, project_id: String, source_text: String) -> Result<Translation, String> {
    let db = db.lock().await;
    db.create_translation(project_id, source_text).await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_translations(db: State<'_, DbState>, project_id: String) -> Result<Vec<Translation>, String> {
    let db = db.lock().await;
    db.get_translations(&project_id).await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn update_translation(
    db: State<'_, DbState>, 
    id: String, 
    target_text: Option<String>, 
    notes: Option<String>, 
    status: Option<String>
) -> Result<(), String> {
    let db = db.lock().await;
    let status_enum = status.map(|s| match s.as_str() {
        "Draft" => TranslationStatus::Draft,
        "Validated" => TranslationStatus::Validated,
        "Approved" => TranslationStatus::Approved,
        _ => TranslationStatus::Draft,
    });
    
    db.update_translation(&id, target_text, notes, status_enum).await.map_err(|e| e.to_string())
}

// Chat commands
#[tauri::command]
async fn add_chat_message(db: State<'_, DbState>, project_id: String, role: String, content: String) -> Result<ChatMessage, String> {
    let db = db.lock().await;
    let role_enum = match role.as_str() {
        "User" => ChatRole::User,
        "Assistant" => ChatRole::Assistant,
        _ => ChatRole::User,
    };
    
    db.add_chat_message(project_id, role_enum, content).await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_chat_messages(db: State<'_, DbState>, project_id: String) -> Result<Vec<ChatMessage>, String> {
    let db = db.lock().await;
    db.get_chat_messages(&project_id).await.map_err(|e| e.to_string())
}

// LLM commands
#[tauri::command]
async fn chat_with_llm(
    llm: State<'_, LLMState>, 
    db: State<'_, DbState>, 
    project_id: String, 
    message: String
) -> Result<String, String> {
    let llm = llm.lock().await;
    let db = db.lock().await;
    
    // Convert chat history to LLM format
    let chat_messages = db.get_chat_messages(&project_id).await.map_err(|e| e.to_string())?;
    let llm_messages: Vec<LLMChatMessage> = chat_messages
        .into_iter()
        .map(|msg| LLMChatMessage {
            role: match msg.role {
                ChatRole::User => "user".to_string(),
                ChatRole::Assistant => "assistant".to_string(),
            },
            content: msg.content,
        })
        .collect();
    
    // Add the new user message
    let mut messages = llm_messages;
    messages.push(LLMChatMessage {
        role: "user".to_string(),
        content: message,
    });
    
    // Get response from LLM
    let response = llm.chat_completion(messages).await.map_err(|e| e.to_string())?;
    
    // Save the assistant's response to the database
    db.add_chat_message(project_id, ChatRole::Assistant, response.clone()).await.map_err(|e| e.to_string())?;
    
    Ok(response)
}

#[tauri::command]
async fn translate_with_llm(
    llm: State<'_, LLMState>,
    source_text: String,
    source_lang: String,
    target_lang: String
) -> Result<String, String> {
    let llm = llm.lock().await;
    llm.translate_text(&source_text, &source_lang, &target_lang).await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn explain_context_with_llm(
    llm: State<'_, LLMState>,
    text: String,
    language: String
) -> Result<String, String> {
    let llm = llm.lock().await;
    llm.explain_context(&text, &language).await.map_err(|e| e.to_string())
}

#[tauri::command]
async fn suggest_improvements_with_llm(
    llm: State<'_, LLMState>,
    source_text: String,
    translation: String
) -> Result<String, String> {
    let llm = llm.lock().await;
    llm.suggest_improvements(&source_text, &translation).await.map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                // Initialize database
                let database_url = "sqlite:./translation_app.db";
                let db = Database::new(database_url).await.expect("Failed to initialize database");
                let db_state: DbState = Arc::new(Mutex::new(db));
                
                // Initialize LLM bridge
                let llm_bridge = LocalLLMBridge::new();
                let llm_state: LLMState = Arc::new(Mutex::new(llm_bridge));
                
                // Store the states in the app state
                app_handle.manage(db_state);
                app_handle.manage(llm_state);
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            create_project,
            get_projects,
            get_project,
            create_translation,
            get_translations,
            update_translation,
            add_chat_message,
            get_chat_messages,
            chat_with_llm,
            translate_with_llm,
            explain_context_with_llm,
            suggest_improvements_with_llm
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
