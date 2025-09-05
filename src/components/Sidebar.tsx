import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Folder, Settings, MessageSquare } from 'lucide-react';

export default function Sidebar() {
  const { 
    projects, 
    currentProject, 
    loadProject, 
    setChatPanelOpen,
    chatPanelOpen 
  } = useStore();
  
  const [showNewProject, setShowNewProject] = useState(false);

  const handleProjectSelect = (projectId: string) => {
    loadProject(projectId);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-primary">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Projects</h2>
          <button
            onClick={() => setShowNewProject(true)}
            className="p-2 text-text-tertiary hover:text-text-primary hover:bg-interactive-hover rounded-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {projects.length === 0 ? (
            <div className="text-center py-8 animate-fade-in">
              <Folder className="w-8 h-8 text-text-tertiary mx-auto mb-2" />
              <p className="text-sm text-text-secondary">No projects yet</p>
              <button
                onClick={() => setShowNewProject(true)}
                className="mt-2 text-sm text-accent-blue hover:text-accent-blue/80 transition-colors duration-200"
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                    currentProject?.id === project.id
                      ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20 shadow-cursor-sm'
                      : 'text-text-primary hover:bg-interactive-hover border border-transparent hover:border-border-primary'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Folder className={`w-4 h-4 ${
                      currentProject?.id === project.id ? 'text-accent-blue' : 'text-text-tertiary group-hover:text-text-primary'
                    } transition-colors duration-200`} />
                    <span className="font-medium truncate">{project.name}</span>
                  </div>
                  {project.description && (
                    <p className="text-xs text-text-tertiary mt-1 truncate">
                      {project.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border-primary space-y-2">
        <button
          onClick={() => setChatPanelOpen(!chatPanelOpen)}
          className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
            chatPanelOpen
              ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
              : 'text-text-primary hover:bg-interactive-hover border border-transparent hover:border-border-primary'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">AI Chat</span>
        </button>
        
        <button className="w-full flex items-center space-x-2 p-2 rounded-lg text-text-primary hover:bg-interactive-hover border border-transparent hover:border-border-primary transition-all duration-200">
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>

      {/* New Project Modal Trigger */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-background-secondary border border-border-primary rounded-lg p-6 w-96 max-w-md mx-4 shadow-cursor animate-slide-in">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Create New Project</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name') as string;
              const description = formData.get('description') as string;
              
              if (name.trim()) {
                useStore.getState().createProject(name.trim(), description.trim() || undefined);
                setShowNewProject(false);
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Project Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-200"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-200 resize-none"
                    placeholder="Enter project description"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="px-4 py-2 text-sm font-medium text-text-primary bg-interactive-hover rounded-lg hover:bg-interactive-active transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-accent-blue rounded-lg hover:bg-accent-blue/90 transition-all duration-200 shadow-cursor-sm"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
