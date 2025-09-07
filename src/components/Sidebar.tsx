import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Folder, Settings, MessageSquare } from 'lucide-react';
import styles from './Sidebar.module.css';

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
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>Projects</h2>
          <button
            onClick={() => setShowNewProject(true)}
            className={styles.addButton}
          >
            <Plus className={styles.addIcon} />
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className={styles.projectsList}>
        <div className={styles.projectsContent}>
          {projects.length === 0 ? (
            <div className={styles.emptyState}>
              <Folder className={styles.emptyIcon} />
              <p className={styles.emptyText}>No projects yet</p>
              <button
                onClick={() => setShowNewProject(true)}
                className={styles.createFirstButton}
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project.id)}
                  className={`${styles.projectButton} ${
                    currentProject?.id === project.id ? styles.active : ''
                  }`}
                >
                  <div className={styles.projectContent}>
                    <Folder className={`${styles.projectIcon} ${
                      currentProject?.id === project.id ? styles.active : ''
                    }`} />
                    <span className={styles.projectName}>{project.name}</span>
                  </div>
                  {project.description && (
                    <p className={styles.projectDescription}>
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
      <div className={styles.footer}>
        <button
          onClick={() => setChatPanelOpen(!chatPanelOpen)}
          className={`${styles.footerButton} ${
            chatPanelOpen ? styles.active : ''
          }`}
        >
          <MessageSquare className={styles.footerIcon} />
          <span className={styles.footerText}>AI Chat</span>
        </button>
        
        <button className={styles.footerButton}>
          <Settings className={styles.footerIcon} />
          <span className={styles.footerText}>Settings</span>
        </button>
      </div>

      {/* New Project Modal Trigger */}
      {showNewProject && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Create New Project</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name') as string;
              const description = formData.get('description') as string;
              
              if (name.trim()) {
                useStore.getState().createProject(name.trim(), description.trim() || undefined);
                setShowNewProject(false);
              }
            }} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Project Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className={styles.formInput}
                  placeholder="Enter project name"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  rows={2}
                  className={styles.formTextarea}
                  placeholder="Enter project description"
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className={`${styles.modalButton} ${styles.secondary}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${styles.modalButton} ${styles.primary}`}
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
