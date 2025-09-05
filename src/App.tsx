import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import TranslationGrid from './components/TranslationGrid';
import ChatPanel from './components/ChatPanel';
import ProjectModal from './components/ProjectModal';
import ResizablePanel from './components/ResizablePanel';
import './App.css';

function App() {
  const { 
    currentProject, 
    loadProjects, 
    sidebarOpen, 
    chatPanelOpen,
    sidebarWidth,
    chatPanelWidth,
    setSidebarWidth,
    setChatPanelWidth
  } = useStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="h-screen flex bg-background-primary dark">
      {/* Sidebar */}
      {sidebarOpen && (
        <ResizablePanel
          direction="left"
          onResize={setSidebarWidth}
          initialWidth={sidebarWidth}
          minWidth={200}
          maxWidth={500}
          className="bg-background-secondary border-r border-border-primary flex-shrink-0 shadow-cursor-sm"
        >
          <Sidebar />
        </ResizablePanel>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-10 bg-background-secondary border-b border-border-primary flex items-center px-4 shadow-cursor-sm">
          <h1 className="text-sm font-medium text-text-primary">
            {currentProject ? currentProject.name : 'Translation App'}
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          {/* Translation Grid */}
          <div className="flex-1">
            {currentProject ? (
              <TranslationGrid />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center animate-fade-in">
                  <h2 className="text-lg font-medium text-text-primary mb-2">
                    No Project Selected
                  </h2>
                  <p className="text-sm text-text-secondary mb-4">
                    Create a new project or select an existing one to get started.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Panel */}
          {chatPanelOpen && currentProject && (
            <ResizablePanel
              direction="right"
              onResize={setChatPanelWidth}
              initialWidth={chatPanelWidth}
              minWidth={250}
              maxWidth={600}
              className="bg-background-secondary border-l border-border-primary flex-shrink-0 shadow-cursor-sm"
            >
              <ChatPanel />
            </ResizablePanel>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal />
    </div>
  );
}

export default App;