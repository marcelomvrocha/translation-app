# Native Title Bar Implementation Guide

## Technical Implementation Details

This guide provides step-by-step technical instructions for implementing the native macOS title bar in the Gaia Translation App.

## Step-by-Step Implementation

### Step 1: Update Tauri Configuration

**File**: `src-tauri/tauri.conf.json`

**Current Configuration**:
```json
{
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "Gaia Translation App",
        "decorations": false,  // Currently disabled
        // ... other properties
      }
    ]
  }
}
```

**Updated Configuration**:
```json
{
  "app": {
    "windows": [
      {
        "label": "main",
        "title": "Gaia Translation App",
        "decorations": true,  // Enable native title bar
        "titleBarStyle": "Visible",  // Ensure title bar is visible
        "width": 1200,
        "height": 800,
        "minWidth": 800,
        "minHeight": 600,
        "resizable": true,
        "maximizable": true,
        "minimizable": true,
        "closable": true,
        "center": true,
        "transparent": false
      }
    ]
  }
}
```

### Step 2: Update App.tsx Layout

**File**: `src/App.tsx`

**Remove TopBar Import**:
```typescript
// Remove this line
import TopBar from './components/TopBar.tsx';
```

**Remove TopBar Component**:
```typescript
// Remove this section
<TopBar 
  projectName={currentProject?.name}
  projectDescription={currentProject?.description}
/>
```

**Update Layout Structure**:
```typescript
// Before
<div className="h-screen flex flex-col bg-background-primary dark">
  <TopBar />
  <div className="flex-1 flex" style={{ marginTop: '48px' }}>
    {/* content */}
  </div>
</div>

// After
<div className="h-screen flex flex-col bg-background-primary dark">
  <div className="flex-1 flex">
    {/* content */}
  </div>
</div>
```

### Step 3: Implement Dynamic Window Title

**Create New Hook**: `src/hooks/useWindowTitle.ts`

```typescript
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
```

**Integrate in App.tsx**:
```typescript
import { useWindowTitle } from './hooks/useWindowTitle';

function App() {
  const { currentProject } = useStore();
  
  // Update window title when project changes
  useWindowTitle({ 
    projectName: currentProject?.name 
  });

  // ... rest of component
}
```

### Step 4: Clean Up Files

**Files to Delete**:
```bash
rm src/components/TopBar.tsx
rm src/components/TopBar.module.css
rm src/hooks/useWindowControls.ts
```

**Update App.tsx Imports**:
```typescript
// Remove these imports
import TopBar from './components/TopBar.tsx';
import { useWindowControls } from './hooks/useWindowControls';
```

### Step 5: Update Store (if needed)

**File**: `src/store/useStore.ts`

**Remove Window Control State** (if present):
```typescript
// Remove any window control related state
// Keep only application state like:
// - currentProject
// - sidebarOpen
// - chatPanelOpen
// - etc.
```

## Testing Checklist

### Basic Functionality
- [ ] App launches with native title bar
- [ ] Close button closes the application
- [ ] Minimize button minimizes the window
- [ ] Maximize button maximizes/restores the window
- [ ] Window can be dragged by title bar
- [ ] Double-click title bar toggles maximize/restore

### Layout Testing
- [ ] Main content uses full window height
- [ ] Sidebar opens/closes correctly
- [ ] Chat panel opens/closes correctly
- [ ] Lower pane opens/closes correctly
- [ ] No layout shifts or overlaps

### Dynamic Title Testing
- [ ] Window title shows app name when no project selected
- [ ] Window title updates when project is selected
- [ ] Window title updates when switching projects
- [ ] Window title updates when project is closed

### Error Handling
- [ ] App handles title update failures gracefully
- [ ] App continues to function if Tauri API is unavailable
- [ ] No console errors during normal operation

## Troubleshooting

### Common Issues

**Issue**: Title bar not appearing
**Solution**: Check `decorations: true` in tauri.conf.json

**Issue**: Layout broken after removing TopBar
**Solution**: Ensure margin-top compensation is removed from main layout

**Issue**: Window title not updating
**Solution**: Check Tauri API permissions and error handling

**Issue**: App crashes on startup
**Solution**: Verify all TopBar imports are removed from App.tsx

### Debug Commands

**Check Tauri Configuration**:
```bash
cd src-tauri
cargo check
```

**Verify Frontend Build**:
```bash
npm run build
```

**Test Development Mode**:
```bash
npm run tauri dev
```

## Performance Considerations

### Benefits
- **Reduced Bundle Size**: ~500 lines of CSS/JS removed
- **Faster Rendering**: No custom title bar rendering
- **Lower Memory Usage**: Less DOM elements and CSS rules
- **Native Performance**: Title bar handled by OS

### Monitoring
- Monitor app startup time
- Check memory usage before/after
- Verify no layout thrashing
- Ensure smooth animations

## Future Enhancements

### Title Bar Customization
```json
{
  "titleBarStyle": "Transparent",
  "titleBarOverlay": {
    "color": "#1e1e1e",
    "symbolColor": "#ffffff"
  }
}
```

### Platform Detection
```typescript
import { platform } from '@tauri-apps/api/os';

const isMacOS = await platform() === 'darwin';
```

### Dark Mode Integration
```typescript
// Future: Integrate with macOS dark mode
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

## Rollback Instructions

### Quick Rollback
```bash
# Revert to previous commit
git reset --hard HEAD~1

# Or restore specific files
git checkout HEAD~1 -- src-tauri/tauri.conf.json
git checkout HEAD~1 -- src/App.tsx
```

### Manual Rollback
1. Set `decorations: false` in tauri.conf.json
2. Restore TopBar component files
3. Add TopBar back to App.tsx
4. Restore margin-top compensation

---

**Document Version**: 1.1  
**Last Updated**: December 2024  
**Status**: ✅ **IMPLEMENTATION COMPLETE - SUCCESSFUL**
