/**
 * TitleBarOverlay Component
 * 
 * A custom overlay component that provides additional functionality on top of the native macOS title bar.
 * This component creates a three-section layout with GAIA branding, project information, and settings access.
 * 
 * Features:
 * - Dynamic theme switching (light/dark mode)
 * - Project-aware content display
 * - Responsive design for different screen sizes
 * - Accessibility support with ARIA labels
 * - Smooth animations and hover effects
 * 
 * @fileoverview Custom title bar overlay with branding and controls
 * @author Development Team
 * @version 1.0.0
 */

import { Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTitleBarTheme } from '../hooks/useTitleBarTheme';
import styles from './TitleBarOverlay.module.css';

/**
 * TitleBarOverlay - Custom title bar overlay component
 * 
 * This component renders a custom overlay on top of the native macOS title bar,
 * providing additional branding, project information, and interactive controls.
 * 
 * The overlay consists of three main sections:
 * 1. Left Section: GAIA branding and current project name
 * 2. Center Section: Project description (if available)
 * 3. Right Section: Settings button for accessing app settings
 * 
 * @returns {JSX.Element} The rendered title bar overlay
 */
export default function TitleBarOverlay() {
  // State management hooks
  const { currentProject, setSettingsOpen } = useStore(); // Get current project and settings state
  const theme = useTitleBarTheme(); // Get current theme (light/dark)

  /**
   * Event handler for settings button click
   * Opens the settings modal when the settings button is clicked
   */
  const handleSettingsClick = () => {
    setSettingsOpen(true);
  };

  return (
    <div className={`${styles.overlay} ${styles[theme]}`}>
      {/* 
        Left Section - GAIA Branding
        Displays the app name "GAIA" with gradient styling and current project name
        This section is draggable to allow window movement
      */}
      <div className={styles.leftSection}>
        <div className={styles.branding}>
          {/* App title with gradient styling and hover effects */}
          <span className={styles.appTitle}>GAIA</span>
          
          {/* Project indicator - only shown when a project is selected */}
          {currentProject && (
            <span className={styles.projectIndicator}>
              • {currentProject.name}
            </span>
          )}
        </div>
      </div>

      {/* 
        Center Section - Project Status
        Displays additional project information in the center of the title bar
        This section is also draggable for window movement
      */}
      <div className={styles.centerSection}>
        {/* Project description - only shown when available */}
        {currentProject?.description && (
          <span className={styles.projectDescription}>
            {currentProject.description}
          </span>
        )}
      </div>

      {/* 
        Right Section - Settings Icon
        Provides access to application settings via a gear icon button
        This section is not draggable to allow proper button interaction
      */}
      <div className={styles.rightSection}>
        <button
          className={styles.settingsButton}
          onClick={handleSettingsClick}
          title="Settings"                    // Tooltip text for hover
          aria-label="Open Settings"          // Screen reader accessible label
        >
          <Settings className={styles.settingsIcon} />
        </button>
      </div>
    </div>
  );
}
