import { Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTitleBarTheme } from '../hooks/useTitleBarTheme';
import styles from './TitleBarOverlay.module.css';

export default function TitleBarOverlay() {
  const { currentProject, setSettingsOpen } = useStore();
  const theme = useTitleBarTheme();

  const handleSettingsClick = () => {
    setSettingsOpen(true);
  };

  return (
    <div className={`${styles.overlay} ${styles[theme]}`}>
      {/* Left Section - GAIA Branding */}
      <div className={styles.leftSection}>
        <div className={styles.branding}>
          <span className={styles.appTitle}>GAIA</span>
          {currentProject && (
            <span className={styles.projectIndicator}>
              • {currentProject.name}
            </span>
          )}
        </div>
      </div>

      {/* Center Section - Project Status */}
      <div className={styles.centerSection}>
        {currentProject?.description && (
          <span className={styles.projectDescription}>
            {currentProject.description}
          </span>
        )}
      </div>

      {/* Right Section - Settings Icon */}
      <div className={styles.rightSection}>
        <button
          className={styles.settingsButton}
          onClick={handleSettingsClick}
          title="Settings"
          aria-label="Open Settings"
        >
          <Settings className={styles.settingsIcon} />
        </button>
      </div>
    </div>
  );
}
