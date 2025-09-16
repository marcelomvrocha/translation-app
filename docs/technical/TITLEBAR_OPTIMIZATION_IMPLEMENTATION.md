# Title Bar Optimization - Technical Implementation Guide

## Implementation Overview

This guide provides step-by-step technical instructions for optimizing the GAIA title bar according to the specified requirements. The implementation focuses on centering content, matching macOS system colors, and optimizing the settings icon.

## Requirements Summary

1. **Centralize App Title**: Ensure the app title appears centered
2. **Centralize GAIA Branding**: Move GAIA branding to center section
3. **Match macOS Colors**: Use system colors for background
4. **Optimize Settings Icon**: Make larger, remove borders, clean appearance

## Step-by-Step Implementation

### Step 1: Update Component Structure

**File**: `src/components/TitleBarOverlay.tsx`

**Current Implementation**:
```tsx
export default function TitleBarOverlay() {
  const { currentProject, setSettingsOpen } = useStore();
  const theme = useTitleBarTheme();

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
          onClick={() => setSettingsOpen(true)}
          title="Settings"
          aria-label="Open Settings"
        >
          <Settings className={styles.settingsIcon} />
        </button>
      </div>
    </div>
  );
}
```

**Updated Implementation**:
```tsx
export default function TitleBarOverlay() {
  const { currentProject, setSettingsOpen } = useStore();
  const theme = useTitleBarTheme();

  return (
    <div className={`${styles.overlay} ${styles[theme]}`}>
      {/* Left Section - Empty for balance */}
      <div className={styles.leftSection}>
        {/* Empty for perfect centering */}
      </div>

      {/* Center Section - GAIA Branding */}
      <div className={styles.centerSection}>
        <div className={styles.centeredContent}>
          <span className={styles.appTitle}>GAIA</span>
          {currentProject && (
            <span className={styles.projectIndicator}>
              • {currentProject.name}
            </span>
          )}
        </div>
      </div>

      {/* Right Section - Settings Icon */}
      <div className={styles.rightSection}>
        <button
          className={styles.settingsButton}
          onClick={() => setSettingsOpen(true)}
          title="Settings"
          aria-label="Open Settings"
        >
          <Settings className={styles.settingsIcon} />
        </button>
      </div>
    </div>
  );
}
```

### Step 2: Update CSS Layout and Colors

**File**: `src/components/TitleBarOverlay.module.css`

**Complete Updated CSS**:
```css
/* Title Bar Overlay - Optimized Design */

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 28px; /* Standard macOS title bar height */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  -webkit-app-region: drag; /* Allow window dragging */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid var(--titlebar-border);
}

/* Theme Variants - macOS System Colors */
.light {
  background: #f5f5f5; /* System Gray 6 */
  color: #1d1d1f; /* System Gray 1 */
  border-bottom-color: #d1d1d1; /* System Gray 4 */
}

.dark {
  background: #1e1e1e; /* System Gray 6 */
  color: #f5f5f7; /* System Gray 1 */
  border-bottom-color: #38383a; /* System Gray 4 */
}

/* Section Layout */
.leftSection {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  /* Empty for perfect centering */
}

.centerSection {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  position: relative;
}

.rightSection {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  min-width: 0;
}

/* Centered Content */
.centeredContent {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  -webkit-app-region: drag;
}

/* GAIA Branding - Centered */
.appTitle {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--titlebar-text-primary);
  transition: all 0.3s ease;
}

.appTitle:hover {
  transform: scale(1.02);
}

.projectIndicator {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
  transition: opacity 0.2s ease;
  color: var(--titlebar-text-secondary);
}

.projectIndicator:hover {
  opacity: 1;
}

/* Settings Button - Optimized */
.settingsButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color 0.2s ease;
  -webkit-app-region: no-drag; /* Prevent dragging on button */
  color: inherit;
}

.settingsButton:hover {
  color: #3b82f6; /* Accent color */
  background: transparent;
  transform: none;
  box-shadow: none;
}

.settingsButton:active {
  transform: scale(0.95);
}

.settingsButton:focus {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}

.settingsIcon {
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;
}

.settingsButton:hover .settingsIcon {
  color: #3b82f6;
  transform: rotate(15deg);
}

/* CSS Variables for Theme Support */
:root {
  --titlebar-text-primary: #1d1d1f;
  --titlebar-text-secondary: #6e6e73;
  --titlebar-border: #d1d1d1;
}

[data-theme="dark"] {
  --titlebar-text-primary: #f5f5f7;
  --titlebar-text-secondary: #8e8e93;
  --titlebar-border: #38383a;
}

/* Responsive Design */
@media (max-width: 768px) {
  .overlay {
    padding: 0 12px;
  }
  
  .centeredContent {
    gap: 4px;
  }
  
  .appTitle {
    font-size: 13px;
  }
  
  .projectIndicator {
    max-width: 120px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .overlay {
    padding: 0 8px;
  }
  
  .projectIndicator {
    display: none;
  }
  
  .appTitle {
    font-size: 12px;
  }
  
  .settingsButton {
    width: 24px;
    height: 24px;
  }
  
  .settingsIcon {
    width: 18px;
    height: 18px;
  }
}

/* Animation Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.overlay {
  animation: fadeIn 0.5s ease-out;
}

/* Focus States for Accessibility */
.settingsButton:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  .overlay {
    border-bottom-width: 2px;
  }
  
  .settingsButton:hover {
    background: transparent;
    color: var(--titlebar-text-primary);
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .overlay,
  .appTitle,
  .settingsButton,
  .settingsIcon {
    transition: none;
  }
  
  .overlay {
    animation: none;
  }
  
  .settingsButton:hover .settingsIcon {
    transform: none;
  }
}
```

### Step 3: Update Theme Hook (Optional)

**File**: `src/hooks/useTitleBarTheme.ts`

**Enhanced Implementation**:
```typescript
import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useTitleBarTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check initial theme preference
    const checkTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    };

    // Set initial theme
    checkTheme();

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Add event listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return theme;
};
```

## Implementation Checklist

### Phase 1: Layout Updates
- [ ] Move GAIA branding to center section
- [ ] Create centered content wrapper
- [ ] Update JSX structure
- [ ] Test basic layout

### Phase 2: Color Updates
- [ ] Research macOS system colors
- [ ] Update CSS variables
- [ ] Test light mode appearance
- [ ] Test dark mode appearance
- [ ] Verify color accuracy

### Phase 3: Icon Optimization
- [ ] Increase settings icon size to 20px
- [ ] Remove background hover effects
- [ ] Simplify button styling
- [ ] Test hover states
- [ ] Verify accessibility

### Phase 4: Responsive Design
- [ ] Test on desktop (1200px+)
- [ ] Test on tablet (768px-1199px)
- [ ] Test on mobile (480px-767px)
- [ ] Test on small mobile (<480px)
- [ ] Verify all breakpoints

### Phase 5: Testing and Polish
- [ ] Test window dragging
- [ ] Test settings button functionality
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Performance testing

## Testing Commands

### Development Testing
```bash
# Start development server
npm run tauri dev

# Check for linting errors
npm run lint

# Build for testing
npm run build
```

### Visual Testing Checklist
- [ ] GAIA title appears perfectly centered
- [ ] Background color matches macOS system
- [ ] Settings icon is 20px with no background
- [ ] Hover effects work correctly
- [ ] Theme switching works
- [ ] Responsive design works on all sizes

### Functional Testing Checklist
- [ ] Window dragging works
- [ ] Settings button opens modal
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] No console errors
- [ ] Performance is smooth

## Troubleshooting

### Common Issues

**Issue**: GAIA title not perfectly centered
**Solution**: Check flex properties and ensure left section is empty

**Issue**: Colors don't match macOS
**Solution**: Verify system color values and test on actual macOS

**Issue**: Settings icon too small
**Solution**: Check icon size in CSS and ensure no conflicting styles

**Issue**: Hover effects not working
**Solution**: Verify transition properties and hover selectors

### Debug Commands

**Check CSS Variables**:
```css
/* Add to browser dev tools */
console.log(getComputedStyle(document.documentElement).getPropertyValue('--titlebar-bg-light'));
```

**Test Theme Detection**:
```javascript
// Add to browser console
console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
```

## Performance Considerations

### Optimizations Applied
- **Efficient CSS**: Minimal selectors and properties
- **Hardware Acceleration**: Transform-based animations
- **Reduced Reflows**: Minimal layout changes
- **Clean Transitions**: Smooth 60fps animations

### Monitoring
- **Rendering Performance**: Check for layout thrashing
- **Memory Usage**: Monitor for memory leaks
- **Animation Performance**: Ensure smooth 60fps
- **Accessibility**: Verify screen reader compatibility

## Future Enhancements

### Potential Improvements
1. **Dynamic Color Detection**: Real-time system color updates
2. **Custom Themes**: User-defined color schemes
3. **Advanced Animations**: More sophisticated transitions
4. **Status Indicators**: App state indicators
5. **Customization Options**: User-configurable layout

### Advanced Features
1. **System Integration**: Deeper macOS integration
2. **Accessibility**: Enhanced accessibility features
3. **Performance**: Further optimization
4. **Theming**: Advanced theming system
5. **Customization**: User-configurable appearance

---

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Status**: Ready for Implementation  
**Compatibility**: Tauri v2, macOS 10.15+
