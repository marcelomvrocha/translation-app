import { PanelLeft, PanelBottom, MessageSquare, Settings, X, Minus, Square } from 'lucide-react';
import { useStore } from '../store/useStore';
import styles from './TopBar.module.css';

interface TopBarProps {
  projectName?: string;
  projectDescription?: string;
}

export default function TopBar({ projectName = "Untitled Project", projectDescription }: TopBarProps) {
  const { 
    sidebarOpen, 
    chatPanelOpen, 
    setSidebarOpen, 
    setChatPanelOpen,
    lowerPaneOpen,
    setLowerPaneOpen,
    settingsOpen,
    setSettingsOpen
  } = useStore();
  
  // Window control handlers (will be implemented in Phase 3)
  const handleClose = () => {
    console.log('Close window');
    // TODO: Implement window close functionality
  };

  const handleMinimize = () => {
    console.log('Minimize window');
    // TODO: Implement window minimize functionality
  };

  const handleMaximize = () => {
    console.log('Maximize window');
    // TODO: Implement window maximize functionality
  };

  return (
    <div className={styles.container}>
      {/* Left Section: Window Controls */}
      <div className={styles.leftSection}>
        {/* Window Controls */}
        <div className={styles.windowControls}>
          <button 
            className={`${styles.windowButton} ${styles.closeButton}`}
            onClick={handleClose}
            title="Close"
          >
            <X className={styles.windowIcon} />
          </button>
          <button 
            className={`${styles.windowButton} ${styles.minimizeButton}`}
            onClick={handleMinimize}
            title="Minimize"
          >
            <Minus className={styles.windowIcon} />
          </button>
          <button 
            className={`${styles.windowButton} ${styles.maximizeButton}`}
            onClick={handleMaximize}
            title="Maximize"
          >
            <Square className={styles.windowIcon} />
          </button>
        </div>
      </div>

      {/* Center Section: Document Title */}
      <div className={styles.centerSection}>
        <h1 className={styles.documentTitle}>{projectName || "Untitled Project"}</h1>
        {projectDescription && (
          <p className={styles.documentSubtitle}>{projectDescription}</p>
        )}
      </div>

      {/* Right Section: Button Groups */}
      <div className={styles.rightSection}>
        {/* Navigation Group */}
        <div className={styles.buttonGroup}>
          <span className={styles.groupLabel}>View</span>
          <div className={styles.groupButtons}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`${styles.button} ${sidebarOpen ? styles.active : ''}`}
              title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            >
              <PanelLeft className={styles.icon} />
            </button>
            <button
              onClick={() => setLowerPaneOpen(!lowerPaneOpen)}
              className={`${styles.button} ${lowerPaneOpen ? styles.active : ''}`}
              title={lowerPaneOpen ? 'Hide Lower Pane' : 'Show Lower Pane'}
            >
              <PanelBottom className={styles.icon} />
            </button>
          </div>
        </div>

        {/* Communication Group */}
        <div className={styles.buttonGroup}>
          <span className={styles.groupLabel}>Chat</span>
          <div className={styles.groupButtons}>
            <button
              onClick={() => setChatPanelOpen(!chatPanelOpen)}
              className={`${styles.button} ${chatPanelOpen ? styles.active : ''}`}
              title={chatPanelOpen ? 'Hide AI Chat' : 'Show AI Chat'}
            >
              <MessageSquare className={styles.icon} />
            </button>
          </div>
        </div>

        {/* Settings Group */}
        <div className={styles.buttonGroup}>
          <span className={styles.groupLabel}>Settings</span>
          <div className={styles.groupButtons}>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`${styles.button} ${settingsOpen ? styles.active : ''}`}
              title="Settings"
            >
              <Settings className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
