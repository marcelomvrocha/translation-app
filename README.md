# Translation App

A cross-platform translation application built with Tauri, React, and local AI integration. Designed for translators and localizers working with sensitive or unreleased projects.

## Features

### 🎯 Core Features
- **Grid-based Translation Editor**: Excel-like interface for managing translations
- **AI Chat Panel**: Contextual AI assistance for translation work
- **Local-first Architecture**: All data stored locally with SQLite
- **Project Management**: Create, organize, and manage translation projects
- **Real-time Collaboration**: Chat with AI assistant for translation help

### 🔧 Technical Features
- **Cross-platform**: Runs on macOS and Windows
- **Local AI Integration**: DeepSeek LLM running locally (offline support)
- **Modern UI**: Built with React and Tailwind CSS
- **Type Safety**: Full TypeScript support
- **State Management**: Zustand for lightweight state management

## Tech Stack

### Frontend
- **Framework**: Tauri (Rust + Web)
- **UI Library**: React + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

### Backend
- **Language**: Rust
- **Database**: SQLite with SQLx
- **AI Integration**: Local DeepSeek LLM
- **HTTP Client**: Reqwest

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- Rust (latest stable)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd translation-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run tauri dev
   ```

### Building for Production

```bash
npm run build
npm run tauri build
```

## Usage

### Creating a Project
1. Click the "+" button in the sidebar
2. Enter project name and description
3. Click "Create Project"

### Managing Translations
1. Select a project from the sidebar
2. Add new translations using the "Add Row" button
3. Edit translations directly in the grid
4. Use the status dropdown to track progress (Draft/Validated/Approved)

### Using AI Assistant
1. Open the chat panel (toggle in sidebar)
2. Ask questions about translations, cultural context, or improvements
3. The AI will provide contextual assistance based on your project

## Project Structure

```
src/
├── components/          # React components
│   ├── Sidebar.tsx     # Project navigation
│   ├── TranslationGrid.tsx  # Main translation interface
│   ├── ChatPanel.tsx   # AI chat interface
│   └── ProjectModal.tsx # Project creation modal
├── store/              # State management
│   └── useStore.ts     # Zustand store
└── App.tsx            # Main application component

src-tauri/
├── src/
│   ├── database.rs    # SQLite database operations
│   ├── llm_bridge.rs  # AI/LLM integration
│   └── lib.rs         # Tauri commands and setup
└── Cargo.toml         # Rust dependencies
```

## Database Schema

### Projects
- `id`: Unique identifier
- `name`: Project name
- `description`: Optional project description
- `created_at`: Creation timestamp
- `updated_at`: Last modification timestamp

### Translations
- `id`: Unique identifier
- `project_id`: Foreign key to projects
- `source_text`: Original text to translate
- `target_text`: Translated text
- `notes`: Translation notes
- `status`: Draft/Validated/Approved
- `created_at`: Creation timestamp
- `updated_at`: Last modification timestamp

### Chat Messages
- `id`: Unique identifier
- `project_id`: Foreign key to projects
- `role`: User/Assistant
- `content`: Message content
- `created_at`: Creation timestamp

## AI Integration

The application includes a mock LLM bridge that simulates local DeepSeek integration. In a production environment, this would be replaced with:

1. **Local DeepSeek Model**: Running in a separate process
2. **HTTP API**: Exposed via the Rust backend
3. **Context Awareness**: Chat history and project context

### Available AI Commands
- Translation assistance
- Cultural context explanation
- Translation improvement suggestions
- General translation questions

## Development

### Adding New Features
1. Update the database schema in `database.rs`
2. Add Tauri commands in `lib.rs`
3. Update the Zustand store in `useStore.ts`
4. Create/update React components

### Database Migrations
The database schema is automatically created on first run. For schema changes:
1. Update the `init()` function in `database.rs`
2. Handle migration logic as needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Roadmap

### Phase 1 (Current)
- ✅ Basic translation grid
- ✅ AI chat panel
- ✅ Project management
- ✅ Local database

### Phase 2 (Future)
- [ ] Real DeepSeek LLM integration
- [ ] Import/Export functionality (CSV, XLSX, JSON)
- [ ] Advanced filtering and search
- [ ] Keyboard shortcuts
- [ ] Translation memory
- [ ] Glossary management

### Phase 3 (Advanced)
- [ ] Multi-user collaboration
- [ ] Cloud sync (optional)
- [ ] Plugin system for CAT tools
- [ ] Advanced AI features
- [ ] Custom prompt templates

## Support

For issues and questions:
1. Check the GitHub issues
2. Create a new issue with detailed description
3. Include system information and error logs

## Acknowledgments

- Built with [Tauri](https://tauri.app/)
- UI components with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)