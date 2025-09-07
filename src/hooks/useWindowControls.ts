import { getCurrentWindow } from '@tauri-apps/api/window';

export const useWindowControls = () => {
  const currentWindow = getCurrentWindow();

  const closeWindow = async () => {
    try {
      await currentWindow.close();
    } catch (error) {
      console.error('Error closing window:', error);
    }
  };

  const minimizeWindow = async () => {
    try {
      await currentWindow.minimize();
    } catch (error) {
      console.error('Error minimizing window:', error);
    }
  };

  const maximizeWindow = async () => {
    try {
      await currentWindow.maximize();
    } catch (error) {
      console.error('Error maximizing window:', error);
    }
  };

  const unmaximizeWindow = async () => {
    try {
      await currentWindow.unmaximize();
    } catch (error) {
      console.error('Error unmaximizing window:', error);
    }
  };

  const toggleMaximize = async () => {
    try {
      const isMaximized = await currentWindow.isMaximized();
      if (isMaximized) {
        await currentWindow.unmaximize();
      } else {
        await currentWindow.maximize();
      }
    } catch (error) {
      console.error('Error toggling maximize:', error);
    }
  };

  return {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    unmaximizeWindow,
    toggleMaximize
  };
};
