import { X } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SettingsModal() {
  const { settingsOpen, setSettingsOpen } = useStore();

  if (!settingsOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background-secondary border border-border-primary rounded-lg shadow-cursor-lg w-96 max-h-96">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-primary">
          <h2 className="text-lg font-medium text-text-primary">Settings</h2>
          <button
            onClick={() => setSettingsOpen(false)}
            className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">Appearance</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-border-primary text-accent-primary focus:ring-accent-primary"
                />
                <span className="text-sm text-text-secondary">Dark mode</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">General</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-border-primary text-accent-primary focus:ring-accent-primary"
                />
                <span className="text-sm text-text-secondary">Auto-save translations</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-border-primary text-accent-primary focus:ring-accent-primary"
                />
                <span className="text-sm text-text-secondary">Show line numbers</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">AI Settings</h3>
            <div className="space-y-2">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  API Endpoint
                </label>
                <input
                  type="text"
                  placeholder="https://api.openai.com/v1"
                  className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-md text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  placeholder="sk-..."
                  className="w-full px-3 py-2 bg-background-primary border border-border-primary rounded-md text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t border-border-primary">
          <button
            onClick={() => setSettingsOpen(false)}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setSettingsOpen(false)}
            className="px-4 py-2 bg-accent-primary text-accent-foreground text-sm rounded-md hover:bg-accent-primary/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
