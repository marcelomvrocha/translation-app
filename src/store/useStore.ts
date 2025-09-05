import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';

export interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Translation {
  id: string;
  project_id: string;
  source_text: string;
  target_text?: string;
  notes?: string;
  status: 'Draft' | 'Validated' | 'Approved';
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  project_id: string;
  role: 'User' | 'Assistant';
  content: string;
  created_at: string;
}

interface AppState {
  // Projects
  projects: Project[];
  currentProject: Project | null;
  
  // Translations
  translations: Translation[];
  selectedTranslation: Translation | null;
  
  // Chat
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  
  // UI State
  sidebarOpen: boolean;
  chatPanelOpen: boolean;
  lowerPaneOpen: boolean;
  settingsOpen: boolean;
  sidebarWidth: number;
  chatPanelWidth: number;
  
  // Search
  searchQuery: string;
  searchResults: Translation[];
  
  // Actions
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  setTranslations: (translations: Translation[]) => void;
  setSelectedTranslation: (translation: Translation | null) => void;
  setChatMessages: (messages: ChatMessage[]) => void;
  addChatMessage: (message: ChatMessage) => void;
  setChatLoading: (loading: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setChatPanelOpen: (open: boolean) => void;
  setLowerPaneOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setSidebarWidth: (width: number) => void;
  setChatPanelWidth: (width: number) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: Translation[]) => void;
  
  // API Actions
  loadProjects: () => Promise<void>;
  loadProject: (id: string) => Promise<void>;
  createProject: (name: string, description?: string) => Promise<void>;
  loadTranslations: (projectId: string) => Promise<void>;
  createTranslation: (projectId: string, sourceText: string) => Promise<void>;
  updateTranslation: (id: string, updates: Partial<Translation>) => Promise<void>;
  loadChatMessages: (projectId: string) => Promise<void>;
  sendChatMessage: (projectId: string, content: string) => Promise<void>;
  searchTranslations: (query: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  projects: [],
  currentProject: null,
  translations: [],
  selectedTranslation: null,
  chatMessages: [],
  isChatLoading: false,
  sidebarOpen: true,
  chatPanelOpen: true,
  lowerPaneOpen: false,
  settingsOpen: false,
  sidebarWidth: 256, // 16rem (w-64)
  chatPanelWidth: 320, // 20rem (w-80)
  searchQuery: '',
  searchResults: [],

  // Basic setters
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  setTranslations: (translations) => set({ translations }),
  setSelectedTranslation: (translation) => set({ selectedTranslation: translation }),
  setChatMessages: (messages) => set({ chatMessages: messages }),
  addChatMessage: (message) => set((state) => ({ 
    chatMessages: [...state.chatMessages, message] 
  })),
  setChatLoading: (loading) => set({ isChatLoading: loading }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setChatPanelOpen: (open) => set({ chatPanelOpen: open }),
  setLowerPaneOpen: (open) => set({ lowerPaneOpen: open }),
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  setSidebarWidth: (width) => set({ sidebarWidth: Math.max(200, Math.min(500, width)) }),
  setChatPanelWidth: (width) => set({ chatPanelWidth: Math.max(250, Math.min(600, width)) }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),

  // API Actions
  loadProjects: async () => {
    try {
      const projects = await invoke<Project[]>('get_projects');
      set({ projects });
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  },

  loadProject: async (id: string) => {
    try {
      const project = await invoke<Project | null>('get_project', { id });
      if (project) {
        set({ currentProject: project });
        // Load translations and chat messages for this project
        get().loadTranslations(id);
        get().loadChatMessages(id);
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    }
  },

  createProject: async (name: string, description?: string) => {
    try {
      const project = await invoke<Project>('create_project', { name, description });
      set((state) => ({ 
        projects: [project, ...state.projects],
        currentProject: project
      }));
      // Load translations and chat messages for the new project
      get().loadTranslations(project.id);
      get().loadChatMessages(project.id);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  },

  loadTranslations: async (projectId: string) => {
    try {
      const translations = await invoke<Translation[]>('get_translations', { projectId });
      set({ translations });
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  },

  createTranslation: async (projectId: string, sourceText: string) => {
    try {
      const translation = await invoke<Translation>('create_translation', { 
        projectId, 
        sourceText 
      });
      set((state) => ({ 
        translations: [...state.translations, translation] 
      }));
    } catch (error) {
      console.error('Failed to create translation:', error);
    }
  },

  updateTranslation: async (id: string, updates: Partial<Translation>) => {
    try {
      await invoke('update_translation', {
        id,
        targetText: updates.target_text,
        notes: updates.notes,
        status: updates.status
      });
      
      // Update local state
      set((state) => ({
        translations: state.translations.map(t => 
          t.id === id ? { ...t, ...updates } : t
        )
      }));
    } catch (error) {
      console.error('Failed to update translation:', error);
    }
  },

  loadChatMessages: async (projectId: string) => {
    try {
      const messages = await invoke<ChatMessage[]>('get_chat_messages', { projectId });
      set({ chatMessages: messages });
    } catch (error) {
      console.error('Failed to load chat messages:', error);
    }
  },

  sendChatMessage: async (projectId: string, content: string) => {
    try {
      // Add user message immediately
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        project_id: projectId,
        role: 'User',
        content,
        created_at: new Date().toISOString()
      };
      
      get().addChatMessage(userMessage);
      set({ isChatLoading: true });

      // Save user message to database
      await invoke<ChatMessage>('add_chat_message', {
        projectId,
        role: 'User',
        content
      });

      // Send to LLM and get response
      const response = await invoke<string>('chat_with_llm', {
        projectId,
        message: content
      });

      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        project_id: projectId,
        role: 'Assistant',
        content: response,
        created_at: new Date().toISOString()
      };
      
      get().addChatMessage(assistantMessage);
      set({ isChatLoading: false });

    } catch (error) {
      console.error('Failed to send chat message:', error);
      set({ isChatLoading: false });
    }
  },

  searchTranslations: (query) => {
    const { translations } = get();
    const results = translations.filter(translation => 
      translation.source_text.toLowerCase().includes(query.toLowerCase()) ||
      translation.target_text?.toLowerCase().includes(query.toLowerCase()) ||
      translation.notes?.toLowerCase().includes(query.toLowerCase())
    );
    set({ searchQuery: query, searchResults: results });
  }
}));
