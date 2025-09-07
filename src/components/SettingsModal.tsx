import { X } from 'lucide-react';
import { useStore } from '../store/useStore';
import styles from './SettingsModal.module.css';

export default function SettingsModal() {
  const { settingsOpen, setSettingsOpen } = useStore();

  if (!settingsOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Settings</h2>
          <button
            onClick={() => setSettingsOpen(false)}
            className={styles.closeButton}
          >
            <X className={styles.closeIcon} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Appearance</h3>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>Dark mode</span>
              <div className={`${styles.toggle} ${styles.active}`}>
                <div className={styles.toggleThumb}></div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>General</h3>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>Auto-save translations</span>
              <div className={styles.toggle}>
                <div className={styles.toggleThumb}></div>
              </div>
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>Show line numbers</span>
              <div className={styles.toggle}>
                <div className={styles.toggleThumb}></div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>AI Settings</h3>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>API Endpoint</span>
              <input
                type="text"
                placeholder="https://api.openai.com/v1"
                className={styles.formInput}
              />
            </div>
            <div className={styles.settingItem}>
              <span className={styles.settingLabel}>API Key</span>
              <input
                type="password"
                placeholder="sk-..."
                className={styles.formInput}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            onClick={() => setSettingsOpen(false)}
            className={styles.button}
          >
            Cancel
          </button>
          <button
            onClick={() => setSettingsOpen(false)}
            className={`${styles.button} ${styles.primary}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
