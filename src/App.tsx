import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { useWindowTitle } from './hooks/useWindowTitle';
import Sidebar from './components/Sidebar.tsx';
import TranslationGrid from './components/TranslationGrid.tsx';
import ChatPanel from './components/ChatPanel.tsx';
import ProjectModal from './components/ProjectModal.tsx';
import ResizablePanel from './components/ResizablePanel.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import './App.css';

function App() {
  const { 
    currentProject, 
    loadProjects, 
    sidebarOpen, 
    chatPanelOpen,
    lowerPaneOpen,
    sidebarWidth,
    chatPanelWidth,
    setSidebarWidth,
    setChatPanelWidth
  } = useStore();

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Update window title when project changes
  useWindowTitle({ 
    projectName: currentProject?.name 
  });


  return (
    <div className="h-screen flex flex-col bg-background-primary dark">

      {/* Main Layout */}
      <div className="flex-1 flex">
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

          {/* Lower Pane */}
          {lowerPaneOpen && (
            <div className="h-48 bg-background-secondary border-t border-border-primary shadow-cursor-sm">
              <div className="p-4">
                <h3 className="text-sm font-medium text-text-primary mb-2">Lower Pane</h3>
                <p className="text-xs text-text-secondary">This is the lower pane content area.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal />
      
      {/* Settings Modal */}
      <SettingsModal />
      
    </div>
  );
}

export default App;