# Title Bar Customization Options

## Overview

With Tauri v2 and the native macOS title bar implementation, we have several powerful options for customizing the title bar appearance and behavior. This document outlines all available customization approaches.

## Current Implementation Status

- ✅ **Native macOS Title Bar**: Enabled (`decorations: true`)
- ✅ **Dynamic Titles**: Working with project name updates
- ✅ **Standard Controls**: Native close, minimize, maximize buttons
- ✅ **Full Height Layout**: Content uses entire window space

## Customization Options

### 1. Native Title Bar Styling (Recommended)

#### 1.1 Title Bar Style Options

**Available Styles:**
```json
{
  "app": {
    "windows": [
      {
        "titleBarStyle": "Visible",     // Default - standard title bar
        "titleBarStyle": "Transparent", // Transparent background
        "titleBarStyle": "Overlay"      // Overlay style (macOS only)
      }
    ]
  }
}
```

**Transparent Style:**
- Removes title bar background
- Keeps window controls visible
- Allows content to show through
- Great for modern, immersive designs

**Overlay Style:**
- Hides title bar text
- Keeps window controls
- Allows custom content overlay
- Perfect for custom branding

#### 1.2 Title Bar Overlay Customization

**Color Customization:**
```json
{
  "app": {
    "windows": [
      {
        "titleBarStyle": "Transparent",
        "titleBarOverlay": {
          "color": "#1e1e1e",        // Background color
          "symbolColor": "#ffffff"   // Control button color
        }
      }
    ]
  }
}
```

**Dynamic Color Themes:**
- Light mode: `#f5f5f5` background, `#000000` symbols
- Dark mode: `#1e1e1e` background, `#ffffff` symbols
- Custom brand colors
- Project-specific themes

### 2. Advanced Visual Customizations

#### 2.1 Window Transparency

**Transparent Window:**
```json
{
  "app": {
    "windows": [
      {
        "transparent": true,
        "titleBarStyle": "Transparent",
        "titleBarOverlay": {
          "color": "rgba(30, 30, 30, 0.8)",
          "symbolColor": "#ffffff"
        }
      }
    ]
  }
}
```

**Blur Effects:**
- Background blur for modern look
- Frosted glass effect
- Custom opacity levels

#### 2.2 Custom Title Bar Height

**Height Customization:**
```json
{
  "app": {
    "windows": [
      {
        "titleBarStyle": "Transparent",
        "titleBarOverlay": {
          "color": "#1e1e1e",
          "symbolColor": "#ffffff",
          "height": 40  // Custom height in pixels
        }
      }
    ]
  }
}
```

### 3. Dynamic Theming

#### 3.1 System Theme Integration

**Dark/Light Mode Detection:**
```typescript
// Detect system theme preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Update title bar colors based on theme
const titleBarColors = {
  light: {
    color: '#f5f5f5',
    symbolColor: '#000000'
  },
  dark: {
    color: '#1e1e1e',
    symbolColor: '#ffffff'
  }
};
```

#### 3.2 Project-Based Theming

**Dynamic Colors by Project:**
```typescript
const getProjectTheme = (projectType: string) => {
  const themes = {
    'translation': { color: '#3b82f6', symbolColor: '#ffffff' },
    'documentation': { color: '#10b981', symbolColor: '#ffffff' },
    'development': { color: '#f59e0b', symbolColor: '#000000' }
  };
  return themes[projectType] || themes['translation'];
};
```

### 4. Custom Content Overlay

#### 4.1 Custom Title Bar Content

**HTML Overlay:**
```html
<div class="titlebar-overlay">
  <div class="titlebar-content">
    <img src="logo.png" class="app-logo" />
    <span class="app-title">Gaia Translation App</span>
    <div class="project-indicator">
      <span class="project-name">{{ projectName }}</span>
    </div>
  </div>
</div>
```

**CSS Styling:**
```css
.titlebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 28px; /* Match title bar height */
  background: transparent;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  -webkit-app-region: drag;
}

.titlebar-content {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
}

.app-logo {
  width: 16px;
  height: 16px;
}

.project-indicator {
  margin-left: auto;
  font-size: 12px;
  opacity: 0.8;
}
```

### 5. Interactive Features

#### 5.1 Custom Title Bar Buttons

**Additional Controls:**
```html
<div class="titlebar-custom-controls">
  <button class="titlebar-btn" id="settings-btn">⚙️</button>
  <button class="titlebar-btn" id="help-btn">❓</button>
  <button class="titlebar-btn" id="theme-toggle">🌙</button>
</div>
```

**JavaScript Integration:**
```typescript
// Custom title bar button handlers
document.getElementById('settings-btn')?.addEventListener('click', () => {
  // Open settings modal
});

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  // Toggle dark/light mode
});
```

#### 5.2 Drag Region Customization

**Selective Dragging:**
```css
.titlebar-overlay {
  -webkit-app-region: drag;
}

.titlebar-btn {
  -webkit-app-region: no-drag;
}

.titlebar-content {
  -webkit-app-region: drag;
}
```

### 6. Platform-Specific Customizations

#### 6.1 macOS-Specific Features

**Traffic Light Customization:**
- Custom colors for close, minimize, maximize buttons
- Hover effects and animations
- Integration with macOS system preferences

**Title Bar Integration:**
- Full-screen mode support
- Mission Control integration
- Split View compatibility

#### 6.2 Cross-Platform Considerations

**Responsive Design:**
```css
@media (prefers-color-scheme: dark) {
  .titlebar-overlay {
    background: rgba(30, 30, 30, 0.9);
  }
}

@media (prefers-color-scheme: light) {
  .titlebar-overlay {
    background: rgba(245, 245, 245, 0.9);
  }
}
```

## Implementation Recommendations

### Phase 1: Basic Styling
1. **Transparent Title Bar** - Modern, immersive look
2. **Dynamic Colors** - Light/dark mode support
3. **Custom Height** - Optimize for content

### Phase 2: Advanced Features
1. **Custom Overlay** - Branded title bar content
2. **Interactive Elements** - Custom buttons and controls
3. **Project Theming** - Dynamic colors per project

### Phase 3: Polish
1. **Animations** - Smooth transitions and effects
2. **Accessibility** - Full keyboard and screen reader support
3. **Performance** - Optimized rendering and updates

## Code Examples

### Basic Transparent Title Bar
```json
{
  "app": {
    "windows": [
      {
        "titleBarStyle": "Transparent",
        "titleBarOverlay": {
          "color": "rgba(30, 30, 30, 0.8)",
          "symbolColor": "#ffffff"
        }
      }
    ]
  }
}
```

### Dynamic Theme Hook
```typescript
export const useTitleBarTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    
    mediaQuery.addEventListener('change', (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    });
  }, []);
  
  return theme;
};
```

### Custom Title Bar Component
```tsx
const CustomTitleBar = () => {
  const { currentProject } = useStore();
  const theme = useTitleBarTheme();
  
  return (
    <div className="titlebar-overlay">
      <div className="titlebar-content">
        <img src="/logo.png" className="app-logo" />
        <span className="app-title">Gaia</span>
        {currentProject && (
          <span className="project-name">{currentProject.name}</span>
        )}
      </div>
    </div>
  );
};
```

## Next Steps

1. **Choose Customization Level** - Decide on basic styling vs. advanced features
2. **Implement Phase 1** - Start with transparent title bar and dynamic colors
3. **Test Across Themes** - Ensure compatibility with light/dark modes
4. **Add Custom Content** - Implement branded title bar overlay
5. **Polish and Optimize** - Add animations and performance improvements

---

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Status**: Ready for Implementation  
**Compatibility**: Tauri v2, macOS 10.15+
