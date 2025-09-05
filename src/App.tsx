import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import TranslationGrid from './components/TranslationGrid';
import ChatPanel from './components/ChatPanel';
import ProjectModal from './components/ProjectModal';
import './App.css';

function App() {
  const { 
    currentProject, 
    loadProjects, 
    sidebarOpen, 
    chatPanelOpen 
  } = useStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4">
          <h1 className="text-lg font-semibold text-gray-900">
            {currentProject ? currentProject.name : 'Translation App'}
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Translation Grid */}
          <div className={`flex-1 ${chatPanelOpen ? 'mr-80' : ''}`}>
            {currentProject ? (
              <TranslationGrid />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-xl font-medium text-gray-900 mb-2">
                    No Project Selected
                  </h2>
                  <p className="text-gray-500 mb-4">
                    Create a new project or select an existing one to get started.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Panel */}
          {chatPanelOpen && currentProject && (
            <div className="w-80 bg-white border-l border-gray-200 flex-shrink-0">
              <ChatPanel />
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal />
    </div>
  );
}

export default App;