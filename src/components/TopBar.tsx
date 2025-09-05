import { useState } from 'react';
import { PanelLeft, PanelBottom, MessageSquare, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';

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
    <div className="bg-background-secondary border-b border-border-primary flex items-start px-4 shadow-cursor-sm topbar-container" style={{ height: '32px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: '#30363d' }}>
      {/* macOS Window Controls */}
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
      </div>

      {/* Spacer to push search bar to center */}
      <div className="flex-1"></div>

      {/* Search Bar - Centered */}
      <div className="w-[40%] flex justify-center topbar-search">
        <form onSubmit={handleSearch} className="w-full max-w-xs">
          <div className="flex items-center bg-background-primary rounded-none">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search translations..."
              className="flex-1 px-3 py-0.5 bg-transparent text-xs text-text-primary placeholder-text-secondary focus:outline-none focus:ring-0 border border-border-primary rounded-md text-center"
              style={{
                padding: '1px 6px',
                margin: 0,
                height: '18px',
                minHeight: '18px',
                lineHeight: 1,
                fontSize: '12px'
              }}
            />
          </div>
        </form>
      </div>

      {/* Spacer to push controls to right */}
      <div className="flex-1"></div>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-0.5 topbar-controls">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`transition-colors pink-border`}
          style={{
            backgroundColor: sidebarOpen ? '#1a1a1a' : 'transparent',
            padding: '8px',
            margin: 0,
            height: '32px',
            minHeight: '32px',
            lineHeight: 1,
            width: '32px'
          }}
          onMouseEnter={(e) => {
            if (!sidebarOpen) (e.target as HTMLButtonElement).style.backgroundColor = '#2a2a2a'
          }}
          onMouseLeave={(e) => {
            if (!sidebarOpen) (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'
          }}
          title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        >
          <PanelLeft style={{ color: '#6b7280', width: '28px', height: '28px' }} />
        </button>

        {/* Lower Pane Toggle */}
        <button
          onClick={() => setLowerPaneOpen(!lowerPaneOpen)}
          className={`transition-colors pink-border`}
          style={{
            backgroundColor: lowerPaneOpen ? '#1a1a1a' : 'transparent',
            padding: '8px',
            margin: 0,
            height: '32px',
            minHeight: '32px',
            lineHeight: 1,
            width: '32px'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#2a2a2a'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = lowerPaneOpen ? '#1a1a1a' : 'transparent'
          }}
          title={lowerPaneOpen ? 'Hide Lower Pane' : 'Show Lower Pane'}
        >
          <PanelBottom style={{ color: '#6b7280', width: '28px', height: '28px' }} />
        </button>

        {/* Chat Panel Toggle */}
        <button
          onClick={() => setChatPanelOpen(!chatPanelOpen)}
          className={`transition-colors pink-border`}
          style={{
            backgroundColor: chatPanelOpen ? '#1a1a1a' : 'transparent',
            padding: '8px',
            margin: 0,
            height: '32px',
            minHeight: '32px',
            lineHeight: 1,
            width: '32px'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#2a2a2a'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = chatPanelOpen ? '#1a1a1a' : 'transparent'
          }}
          title={chatPanelOpen ? 'Hide AI Chat' : 'Show AI Chat'}
        >
          <MessageSquare style={{ color: '#6b7280', width: '28px', height: '28px' }} />
        </button>

        {/* Settings */}
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`transition-colors pink-border`}
          style={{
            backgroundColor: settingsOpen ? '#1a1a1a' : 'transparent',
            padding: '8px',
            margin: 0,
            height: '32px',
            minHeight: '32px',
            lineHeight: 1,
            width: '32px'
          }}
          onMouseEnter={(e) => {
            if (!settingsOpen) (e.target as HTMLButtonElement).style.backgroundColor = '#2a2a2a'
          }}
          onMouseLeave={(e) => {
            if (!settingsOpen) (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'
          }}
          title="Settings"
        >
          <Settings style={{ color: '#6b7280', width: '28px', height: '28px' }} />
        </button>
      </div>
    </div>
  );
}
