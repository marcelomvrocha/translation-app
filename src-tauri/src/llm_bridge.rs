use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatMessage {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatRequest {
    pub model: String,
    pub messages: Vec<ChatMessage>,
    pub temperature: Option<f32>,
    pub max_tokens: Option<u32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatResponse {
    pub choices: Vec<ChatChoice>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatChoice {
    pub message: ChatMessage,
}

pub struct LLMBridge {
    client: reqwest::Client,
    base_url: String,
    api_key: Option<String>,
}

impl LLMBridge {
    pub fn new(base_url: String, api_key: Option<String>) -> Self {
        let client = reqwest::Client::new();
        Self {
            client,
            base_url,
            api_key,
        }
    }

    pub async fn chat_completion(&self, messages: Vec<ChatMessage>) -> Result<String, String> {
        let request = ChatRequest {
            model: "deepseek-chat".to_string(),
            messages,
            temperature: Some(0.7),
            max_tokens: Some(2000),
        };

        let mut headers = reqwest::header::HeaderMap::new();
        headers.insert(
            reqwest::header::CONTENT_TYPE,
            "application/json".parse().unwrap(),
        );

        if let Some(api_key) = &self.api_key {
            headers.insert(
                reqwest::header::AUTHORIZATION,
                format!("Bearer {}", api_key).parse().unwrap(),
            );
        }

        let response = self
            .client
            .post(&format!("{}/v1/chat/completions", self.base_url))
            .headers(headers)
            .json(&request)
            .send()
            .await
            .map_err(|e| format!("Request failed: {}", e))?;

        if !response.status().is_success() {
            let status = response.status();
            let error_text = response.text().await.unwrap_or_else(|_| "Unknown error".to_string());
            return Err(format!("API error {}: {}", status, error_text));
        }

        let chat_response: ChatResponse = response
            .json()
            .await
            .map_err(|e| format!("Failed to parse response: {}", e))?;

        if let Some(choice) = chat_response.choices.first() {
            Ok(choice.message.content.clone())
        } else {
            Err("No response from LLM".to_string())
        }
    }

    pub async fn translate_text(&self, source_text: &str, source_lang: &str, target_lang: &str) -> Result<String, String> {
        let prompt = format!(
            "Translate the following text from {} to {}:\n\n{}\n\nTranslation:",
            source_lang, target_lang, source_text
        );

        let messages = vec![
            ChatMessage {
                role: "system".to_string(),
                content: "You are a professional translator. Provide accurate, natural translations that preserve the original meaning and tone.".to_string(),
            },
            ChatMessage {
                role: "user".to_string(),
                content: prompt,
            },
        ];

        self.chat_completion(messages).await
    }

    pub async fn explain_context(&self, text: &str, language: &str) -> Result<String, String> {
        let prompt = format!(
            "Explain the cultural and linguistic context of this {} text:\n\n{}\n\nContext:",
            language, text
        );

        let messages = vec![
            ChatMessage {
                role: "system".to_string(),
                content: "You are a cultural and linguistic expert. Explain the context, nuances, and cultural implications of texts.".to_string(),
            },
            ChatMessage {
                role: "user".to_string(),
                content: prompt,
            },
        ];

        self.chat_completion(messages).await
    }

    pub async fn suggest_improvements(&self, source_text: &str, translation: &str) -> Result<String, String> {
        let prompt = format!(
            "Review this translation and suggest improvements:\n\nSource: {}\nTranslation: {}\n\nSuggestions:",
            source_text, translation
        );

        let messages = vec![
            ChatMessage {
                role: "system".to_string(),
                content: "You are a translation quality expert. Review translations and provide constructive suggestions for improvement.".to_string(),
            },
            ChatMessage {
                role: "user".to_string(),
                content: prompt,
            },
        ];

        self.chat_completion(messages).await
    }
}

// For local DeepSeek model integration
pub struct LocalLLMBridge {
    // This would be implemented to communicate with a local DeepSeek model
    // For now, we'll use a mock implementation
}

impl LocalLLMBridge {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn chat_completion(&self, messages: Vec<ChatMessage>) -> Result<String, String> {
        // Mock implementation - in a real scenario, this would communicate
        // with a local DeepSeek model running in a separate process
        let last_message = messages.last().unwrap();
        
        // Simple mock responses based on content
        if last_message.content.contains("translate") {
            Ok("This is a mock translation. In a real implementation, this would be generated by the local DeepSeek model.".to_string())
        } else if last_message.content.contains("context") {
            Ok("This is a mock cultural context explanation. The local DeepSeek model would provide detailed cultural and linguistic insights here.".to_string())
        } else if last_message.content.contains("improve") {
            Ok("This is a mock improvement suggestion. The local DeepSeek model would analyze the translation and provide specific recommendations.".to_string())
        } else {
            Ok("This is a mock response from the local DeepSeek model. In a real implementation, this would be a contextual and helpful response based on your translation project.".to_string())
        }
    }

    pub async fn translate_text(&self, source_text: &str, source_lang: &str, target_lang: &str) -> Result<String, String> {
        let messages = vec![
            ChatMessage {
                role: "system".to_string(),
                content: "You are a professional translator. Provide accurate, natural translations.".to_string(),
            },
            ChatMessage {
                role: "user".to_string(),
                content: format!("Translate from {} to {}: {}", source_lang, target_lang, source_text),
            },
        ];

        self.chat_completion(messages).await
    }

    pub async fn explain_context(&self, text: &str, language: &str) -> Result<String, String> {
        let messages = vec![
            ChatMessage {
                role: "system".to_string(),
                content: "You are a cultural and linguistic expert.".to_string(),
            },
            ChatMessage {
                role: "user".to_string(),
                content: format!("Explain the cultural context of this {} text: {}", language, text),
            },
        ];

        self.chat_completion(messages).await
    }

    pub async fn suggest_improvements(&self, source_text: &str, translation: &str) -> Result<String, String> {
        let messages = vec![
            ChatMessage {
                role: "system".to_string(),
                content: "You are a translation quality expert.".to_string(),
            },
            ChatMessage {
                role: "user".to_string(),
                content: format!("Review this translation: Source: {} Translation: {}", source_text, translation),
            },
        ];

        self.chat_completion(messages).await
    }
}
