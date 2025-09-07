import { useState } from 'react';
import { PanelLeft, PanelBottom, MessageSquare, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import styles from './TopBar.module.css';

interface TopBarProps {
  onSearch?: (query: string) => void;
  projectName?: string;
  projectDescription?: string;
}

export default function TopBar({ onSearch, projectName = "Untitled Project", projectDescription }: TopBarProps) {
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
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      {/* Left Section: Window Controls + View Controls */}
      <div className={styles.leftSection}>
        {/* macOS Window Controls */}
        <div className={styles.trafficLights}>
          <div className={`${styles.trafficLight} ${styles.trafficLightRed}`} />
          <div className={`${styles.trafficLight} ${styles.trafficLightYellow}`} />
          <div className={`${styles.trafficLight} ${styles.trafficLightGreen}`} />
        </div>

        {/* View Controls */}
        <div className={styles.viewControls}>
          <span className={styles.searchLabel}>Search</span>
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="translations..."
                  className={styles.searchInput}
                />
              </div>
            </form>
          </div>
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
