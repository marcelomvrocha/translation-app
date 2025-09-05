import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Send, Bot, User } from 'lucide-react';

export default function ChatPanel() {
  const { 
    currentProject, 
    chatMessages, 
    isChatLoading,
    loadChatMessages, 
    sendChatMessage 
  } = useStore();

  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentProject) {
      loadChatMessages(currentProject.id);
    }
  }, [currentProject, loadChatMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && currentProject && !isChatLoading) {
      await sendChatMessage(currentProject.id, inputValue.trim());
      setInputValue('');
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-primary bg-background-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-accent-blue" />
            <h3 className="text-lg font-semibold text-text-primary">AI Assistant</h3>
          </div>
          <div className="text-xs text-text-secondary">
            {currentProject?.name}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center py-8 animate-fade-in">
            <Bot className="w-12 h-12 text-text-tertiary mx-auto mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">
              Welcome to AI Translation Assistant
            </h4>
            <p className="text-text-secondary text-sm">
              Ask me to help with translations, explain cultural nuances, or suggest improvements.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-xs text-text-tertiary">Try asking:</p>
              <div className="space-y-1">
                <button
                  onClick={() => setInputValue("Help me translate this text: 'Hello world'")}
                  className="block w-full text-left px-3 py-2 text-sm text-text-primary bg-interactive-hover rounded-lg hover:bg-interactive-active transition-all duration-200"
                >
                  "Help me translate this text: 'Hello world'"
                </button>
                <button
                  onClick={() => setInputValue("What's the cultural context for this phrase?")}
                  className="block w-full text-left px-3 py-2 text-sm text-text-primary bg-interactive-hover rounded-lg hover:bg-interactive-active transition-all duration-200"
                >
                  "What's the cultural context for this phrase?"
                </button>
                <button
                  onClick={() => setInputValue("Suggest improvements for this translation")}
                  className="block w-full text-left px-3 py-2 text-sm text-text-primary bg-interactive-hover rounded-lg hover:bg-interactive-active transition-all duration-200"
                >
                  "Suggest improvements for this translation"
                </button>
              </div>
            </div>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-3 ${
                message.role === 'User' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'Assistant' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-blue" />
                  </div>
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg transition-all duration-200 ${
                  message.role === 'User'
                    ? 'bg-accent-blue text-white shadow-cursor-sm'
                    : 'bg-background-tertiary text-text-primary border border-border-secondary'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    message.role === 'User' ? 'text-accent-blue/80' : 'text-text-tertiary'
                  }`}
                >
                  {formatTime(message.created_at)}
                </div>
              </div>

              {message.role === 'User' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-interactive-hover rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isChatLoading && (
          <div className="flex space-x-3 justify-start animate-fade-in">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-accent-blue/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-blue" />
              </div>
            </div>
            <div className="bg-background-tertiary text-text-primary px-4 py-2 rounded-lg border border-border-secondary">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border-primary bg-background-secondary">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about translations..."
            disabled={isChatLoading}
            className="flex-1 px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue disabled:bg-background-tertiary disabled:cursor-not-allowed transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isChatLoading}
            className="px-4 py-2 bg-accent-blue text-white rounded-lg hover:bg-accent-blue/90 disabled:bg-interactive-disabled disabled:cursor-not-allowed flex items-center space-x-1 transition-all duration-200 shadow-cursor-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
