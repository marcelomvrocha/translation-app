import { useState } from 'react';
import { PanelLeft, PanelBottom, MessageSquare, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import styles from './TopBar.module.css';

interface TopBarProps {
  onSearch?: (query: string) => void;
}

export default function TopBar({ onSearch }: TopBarProps) {
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
      {/* macOS Window Controls */}
      <div className={styles.trafficLights}>
        <div className={`${styles.trafficLight} ${styles.trafficLightRed}`} />
        <div className={`${styles.trafficLight} ${styles.trafficLightYellow}`} />
        <div className={`${styles.trafficLight} ${styles.trafficLightGreen}`} />
      </div>

      {/* Spacer to push search bar to center */}
      <div className={styles.spacer}></div>

      {/* Search Bar - Centered */}
      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search translations..."
              className={styles.searchInput}
            />
          </div>
        </form>
      </div>

      {/* Spacer to push controls to right */}
      <div className={styles.spacer}></div>

      {/* Right Side Controls */}
      <div className={styles.controlsContainer}>
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`${styles.button} ${sidebarOpen ? styles.active : ''}`}
          title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        >
          <PanelLeft className={styles.icon} />
        </button>

        {/* Lower Pane Toggle */}
        <button
          onClick={() => setLowerPaneOpen(!lowerPaneOpen)}
          className={`${styles.button} ${lowerPaneOpen ? styles.active : ''}`}
          title={lowerPaneOpen ? 'Hide Lower Pane' : 'Show Lower Pane'}
        >
          <PanelBottom className={styles.icon} />
        </button>

        {/* Chat Panel Toggle */}
        <button
          onClick={() => setChatPanelOpen(!chatPanelOpen)}
          className={`${styles.button} ${chatPanelOpen ? styles.active : ''}`}
          title={chatPanelOpen ? 'Hide AI Chat' : 'Show AI Chat'}
        >
          <MessageSquare className={styles.icon} />
        </button>

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`${styles.button} ${settingsOpen ? styles.active : ''}`}
          title="Settings"
        >
          <Settings className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
