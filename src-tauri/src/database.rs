use sqlx::{SqlitePool, Row};
use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Translation {
    pub id: String,
    pub project_id: String,
    pub source_text: String,
    pub target_text: Option<String>,
    pub notes: Option<String>,
    pub status: TranslationStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum TranslationStatus {
    Draft,
    Validated,
    Approved,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChatMessage {
    pub id: String,
    pub project_id: String,
    pub role: ChatRole,
    pub content: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ChatRole {
    User,
    Assistant,
}

pub struct Database {
    pool: SqlitePool,
}

impl Database {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        let pool = SqlitePool::connect(database_url).await?;
        let db = Database { pool };
        db.init().await?;
        Ok(db)
    }

    async fn init(&self) -> Result<(), sqlx::Error> {
        // Create projects table
        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL
            )
            "#,
        )
        .execute(&self.pool)
        .await?;

        // Create translations table
        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS translations (
                id TEXT PRIMARY KEY,
                project_id TEXT NOT NULL,
                source_text TEXT NOT NULL,
                target_text TEXT,
                notes TEXT,
                status TEXT NOT NULL DEFAULT 'Draft',
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL,
                FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
            )
            "#,
        )
        .execute(&self.pool)
        .await?;

        // Create chat_messages table
        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS chat_messages (
                id TEXT PRIMARY KEY,
                project_id TEXT NOT NULL,
                role TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at DATETIME NOT NULL,
                FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
            )
            "#,
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    // Project operations
    pub async fn create_project(&self, name: String, description: Option<String>) -> Result<Project, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now();
        
        sqlx::query(
            "INSERT INTO projects (id, name, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
        )
        .bind(&id)
        .bind(&name)
        .bind(&description)
        .bind(&now)
        .bind(&now)
        .execute(&self.pool)
        .await?;

        Ok(Project {
            id,
            name,
            description,
            created_at: now,
            updated_at: now,
        })
    }

    pub async fn get_projects(&self) -> Result<Vec<Project>, sqlx::Error> {
        let rows = sqlx::query("SELECT id, name, description, created_at, updated_at FROM projects ORDER BY updated_at DESC")
            .fetch_all(&self.pool)
            .await?;

        let projects = rows.into_iter().map(|row| Project {
            id: row.get("id"),
            name: row.get("name"),
            description: row.get("description"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        }).collect();

        Ok(projects)
    }

    pub async fn get_project(&self, id: &str) -> Result<Option<Project>, sqlx::Error> {
        let row = sqlx::query("SELECT id, name, description, created_at, updated_at FROM projects WHERE id = ?")
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        if let Some(row) = row {
            Ok(Some(Project {
                id: row.get("id"),
                name: row.get("name"),
                description: row.get("description"),
                created_at: row.get("created_at"),
                updated_at: row.get("updated_at"),
            }))
        } else {
            Ok(None)
        }
    }

    // Translation operations
    pub async fn create_translation(&self, project_id: String, source_text: String) -> Result<Translation, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now();
        
        sqlx::query(
            "INSERT INTO translations (id, project_id, source_text, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
        )
        .bind(&id)
        .bind(&project_id)
        .bind(&source_text)
        .bind(&now)
        .bind(&now)
        .execute(&self.pool)
        .await?;

        Ok(Translation {
            id,
            project_id,
            source_text,
            target_text: None,
            notes: None,
            status: TranslationStatus::Draft,
            created_at: now,
            updated_at: now,
        })
    }

    pub async fn get_translations(&self, project_id: &str) -> Result<Vec<Translation>, sqlx::Error> {
        let rows = sqlx::query(
            "SELECT id, project_id, source_text, target_text, notes, status, created_at, updated_at FROM translations WHERE project_id = ? ORDER BY created_at ASC"
        )
        .bind(project_id)
        .fetch_all(&self.pool)
        .await?;

        let translations = rows.into_iter().map(|row| {
            let status_str: String = row.get("status");
            let status = match status_str.as_str() {
                "Draft" => TranslationStatus::Draft,
                "Validated" => TranslationStatus::Validated,
                "Approved" => TranslationStatus::Approved,
                _ => TranslationStatus::Draft,
            };

            Translation {
                id: row.get("id"),
                project_id: row.get("project_id"),
                source_text: row.get("source_text"),
                target_text: row.get("target_text"),
                notes: row.get("notes"),
                status,
                created_at: row.get("created_at"),
                updated_at: row.get("updated_at"),
            }
        }).collect();

        Ok(translations)
    }

    pub async fn update_translation(&self, id: &str, target_text: Option<String>, notes: Option<String>, status: Option<TranslationStatus>) -> Result<(), sqlx::Error> {
        let now = Utc::now();
        
        if let Some(target_text) = target_text {
            sqlx::query("UPDATE translations SET target_text = ?, updated_at = ? WHERE id = ?")
                .bind(&target_text)
                .bind(&now)
                .bind(id)
                .execute(&self.pool)
                .await?;
        }

        if let Some(notes) = notes {
            sqlx::query("UPDATE translations SET notes = ?, updated_at = ? WHERE id = ?")
                .bind(&notes)
                .bind(&now)
                .bind(id)
                .execute(&self.pool)
                .await?;
        }

        if let Some(status) = status {
            let status_str = match status {
                TranslationStatus::Draft => "Draft",
                TranslationStatus::Validated => "Validated",
                TranslationStatus::Approved => "Approved",
            };
            sqlx::query("UPDATE translations SET status = ?, updated_at = ? WHERE id = ?")
                .bind(status_str)
                .bind(&now)
                .bind(id)
                .execute(&self.pool)
                .await?;
        }

        Ok(())
    }

    // Chat operations
    pub async fn add_chat_message(&self, project_id: String, role: ChatRole, content: String) -> Result<ChatMessage, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now();
        
        let role_str = match role {
            ChatRole::User => "User",
            ChatRole::Assistant => "Assistant",
        };

        sqlx::query(
            "INSERT INTO chat_messages (id, project_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)"
        )
        .bind(&id)
        .bind(&project_id)
        .bind(role_str)
        .bind(&content)
        .bind(&now)
        .execute(&self.pool)
        .await?;

        Ok(ChatMessage {
            id,
            project_id,
            role,
            content,
            created_at: now,
        })
    }

    pub async fn get_chat_messages(&self, project_id: &str) -> Result<Vec<ChatMessage>, sqlx::Error> {
        let rows = sqlx::query(
            "SELECT id, project_id, role, content, created_at FROM chat_messages WHERE project_id = ? ORDER BY created_at ASC"
        )
        .bind(project_id)
        .fetch_all(&self.pool)
        .await?;

        let messages = rows.into_iter().map(|row| {
            let role_str: String = row.get("role");
            let role = match role_str.as_str() {
                "User" => ChatRole::User,
                "Assistant" => ChatRole::Assistant,
                _ => ChatRole::User,
            };

            ChatMessage {
                id: row.get("id"),
                project_id: row.get("project_id"),
                role,
                content: row.get("content"),
                created_at: row.get("created_at"),
            }
        }).collect();

        Ok(messages)
    }
}
