import { useEffect } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';

interface UseWindowTitleProps {
  projectName?: string;
  appName?: string;
}

export const useWindowTitle = ({ 
  projectName, 
  appName = 'Gaia Translation App' 
}: UseWindowTitleProps) => {
  useEffect(() => {
    const updateTitle = async () => {
      try {
        const window = getCurrentWindow();
        const title = projectName 
          ? `${projectName} - ${appName}` 
          : appName;
        await window.setTitle(title);
      } catch (error) {
        console.error('Failed to update window title:', error);
      }
    };

    updateTitle();
  }, [projectName, appName]);
};
