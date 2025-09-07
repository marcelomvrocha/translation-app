# TopBar Developer Guide

**Project:** TopBar Redesign - Numbers-Style Layout  
**Version:** 1.0  
**Date:** January 7, 2025

## 🛠️ Technical Overview

The TopBar is a React component built with TypeScript, CSS Modules, and Zustand state management. It implements a Numbers-style 3-section layout with responsive design and accessibility features.

## 📁 File Structure

```
src/components/
├── TopBar.tsx                 # Main component
├── TopBar.module.css          # Component-specific styles
└── ...

src/styles/
├── variables.css              # CSS custom properties
├── utilities.css              # Utility classes
└── reset.css                  # CSS reset

src/store/
└── useStore.ts                # Zustand state management
```

## 🧩 Component Architecture

### **TopBar Component**

```tsx
interface TopBarProps {
  onSearch?: (query: string) => void;
  projectName?: string;
  projectDescription?: string;
}

export default function TopBar({ 
  onSearch, 
  projectName = "Untitled Project", 
  projectDescription 
}: TopBarProps)
```

### **Props Interface**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onSearch` | `(query: string) => void` | No | - | Search callback function |
| `projectName` | `string` | No | "Untitled Project" | Current project name |
| `projectDescription` | `string` | No | - | Current project description |

### **State Management**

The component uses both local state and global Zustand store:

```tsx
// Local state
const [searchQuery, setSearchQuery] = useState('');

// Global state from Zustand store
const { 
  sidebarOpen, 
  chatPanelOpen, 
  lowerPaneOpen,
  settingsOpen,
  setSidebarOpen, 
  setChatPanelOpen,
  setLowerPaneOpen,
  setSettingsOpen
} = useStore();
```

## 🎨 CSS Architecture

### **CSS Modules Structure**

The TopBar uses CSS Modules for scoped styling:

```css
/* TopBar.module.css */
.container {
  display: grid;
  grid-template-columns: var(--topbar-left-section-width) 
                        var(--topbar-center-section-width) 
                        var(--topbar-right-section-width);
  /* ... */
}
```

### **CSS Variables**

Design system variables are defined in `variables.css`:

```css
:root {
  /* TopBar Specific */
  --topbar-height: 48px;
  --topbar-section-padding: var(--spacing-lg);
  --topbar-group-gap: var(--spacing-md);
  
  /* Typography Hierarchy */
  --topbar-title-font-size: var(--text-lg);
  --topbar-title-font-weight: var(--font-semibold);
  --topbar-subtitle-font-size: var(--text-sm);
  --topbar-label-font-size: var(--text-xs);
  
  /* Section Layout */
  --topbar-left-section-width: 1fr;
  --topbar-center-section-width: 2fr;
  --topbar-right-section-width: 1fr;
}
```

### **Responsive Design**

Media queries handle different screen sizes:

```css
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr 2fr 1fr;
    gap: var(--spacing-sm);
  }
  .groupLabel {
    display: none;
  }
}

@media (max-width: 480px) {
  .container {
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--spacing-xs);
  }
  .documentSubtitle {
    display: none;
  }
}
```

## 🔧 Implementation Details

### **Layout Structure**

The TopBar uses CSS Grid for the 3-section layout:

```tsx
<div className={styles.container}>
  {/* Left Section: Window Controls + View Controls */}
  <div className={styles.leftSection}>
    <div className={styles.trafficLights}>...</div>
    <div className={styles.viewControls}>...</div>
  </div>

  {/* Center Section: Document Title */}
  <div className={styles.centerSection}>
    <h1 className={styles.documentTitle}>{projectName}</h1>
    {projectDescription && (
      <p className={styles.documentSubtitle}>{projectDescription}</p>
    )}
  </div>

  {/* Right Section: Button Groups */}
  <div className={styles.rightSection}>
    <div className={styles.buttonGroup}>...</div>
  </div>
</div>
```

### **Search Implementation**

```tsx
const [searchQuery, setSearchQuery] = useState('');

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  onSearch?.(searchQuery);
};

const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchQuery(e.target.value);
};
```

### **Button Groups**

Buttons are organized into logical groups:

```tsx
{/* Navigation Group */}
<div className={styles.buttonGroup}>
  <span className={styles.groupLabel}>View</span>
  <div className={styles.groupButtons}>
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className={`${styles.button} ${sidebarOpen ? styles.active : ''}`}
      title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
    >
      <PanelLeft className={styles.icon} />
    </button>
    {/* ... */}
  </div>
</div>
```

## 🎯 Integration Guide

### **App.tsx Integration**

```tsx
import TopBar from './components/TopBar.tsx';

function App() {
  const { currentProject, searchTranslations } = useStore();

  const handleSearch = (query: string) => {
    searchTranslations(query);
  };

  return (
    <div className="h-screen flex flex-col bg-background-primary dark">
      <TopBar 
        onSearch={handleSearch}
        projectName={currentProject?.name}
        projectDescription={currentProject?.description}
      />
      {/* ... */}
    </div>
  );
}
```

### **Store Integration**

The TopBar integrates with the Zustand store for global state:

```tsx
// Store interface
interface AppState {
  // UI State
  sidebarOpen: boolean;
  chatPanelOpen: boolean;
  lowerPaneOpen: boolean;
  settingsOpen: boolean;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setChatPanelOpen: (open: boolean) => void;
  setLowerPaneOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
}
```

## 🧪 Testing

### **Component Testing**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TopBar from './TopBar';

describe('TopBar', () => {
  it('renders project name correctly', () => {
    render(<TopBar projectName="Test Project" />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<TopBar onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('translations...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.submit(searchInput.closest('form'));
    
    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });
});
```

### **CSS Testing**

```css
/* Test responsive breakpoints */
@media (max-width: 768px) {
  .container {
    /* Verify tablet layout */
  }
}

@media (max-width: 480px) {
  .container {
    /* Verify mobile layout */
  }
}
```

## 🚀 Performance Considerations

### **Optimization Techniques**

1. **CSS Modules**: Scoped styles prevent conflicts
2. **CSS Variables**: Efficient theming system
3. **Responsive Design**: Mobile-first approach
4. **State Management**: Efficient Zustand store
5. **Event Handling**: Proper event binding

### **Bundle Analysis**

- **CSS Bundle**: 42.85 kB (8.08 kB gzipped)
- **Component Size**: Minimal impact on bundle
- **Dependencies**: Only essential dependencies
- **Tree Shaking**: Unused code eliminated

## 🔒 Accessibility

### **ARIA Implementation**

```tsx
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className={`${styles.button} ${sidebarOpen ? styles.active : ''}`}
  title={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
  aria-label={sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
  aria-pressed={sidebarOpen}
>
  <PanelLeft className={styles.icon} />
</button>
```

### **Keyboard Navigation**

- **Tab Order**: Logical tab sequence
- **Focus Management**: Proper focus indicators
- **Keyboard Shortcuts**: Enter for form submission
- **Escape Handling**: Modal dismissal

### **Screen Reader Support**

- **Semantic HTML**: Proper HTML structure
- **ARIA Labels**: Descriptive labels
- **Live Regions**: Dynamic content updates
- **Heading Structure**: Logical heading hierarchy

## 🛠️ Development Workflow

### **Local Development**

```bash
# Install dependencies
npm install

# Start development server
npm run tauri:dev

# Run tests
npm test

# Build for production
npm run build
```

### **Code Quality**

```bash
# Run linters
npm run lint:css
npm run lint

# Fix linting issues
npm run lint:css:fix
```

### **Git Workflow**

```bash
# Create feature branch
git checkout -b feature/topbar-enhancement

# Make changes and commit
git add .
git commit -m "feat: enhance TopBar functionality"

# Push and create PR
git push origin feature/topbar-enhancement
```

## 📋 Best Practices

### **Component Development**

1. **Use TypeScript**: Strong typing for props and state
2. **CSS Modules**: Scoped styles for components
3. **CSS Variables**: Consistent design system
4. **Responsive Design**: Mobile-first approach
5. **Accessibility**: ARIA labels and keyboard navigation

### **State Management**

1. **Local State**: Use for component-specific state
2. **Global State**: Use Zustand for shared state
3. **Event Handling**: Proper event binding and cleanup
4. **Performance**: Minimize re-renders

### **Styling**

1. **CSS Variables**: Use design system variables
2. **Responsive Design**: Mobile-first media queries
3. **Performance**: GPU-accelerated animations
4. **Consistency**: Follow design system patterns

## 🐛 Troubleshooting

### **Common Issues**

#### **CSS Not Loading**
- Check CSS import order in App.css
- Verify CSS Modules are configured
- Ensure CSS variables are defined

#### **State Not Updating**
- Check Zustand store configuration
- Verify event handlers are bound correctly
- Check for state mutation issues

#### **Responsive Issues**
- Verify media query breakpoints
- Check CSS Grid configuration
- Test on actual devices

### **Debug Tools**

- **React DevTools**: Component state and props
- **Browser DevTools**: CSS and performance
- **Lighthouse**: Performance and accessibility
- **WAVE**: Accessibility testing

## 🚀 Future Enhancements

### **Planned Features**

1. **Customization**: User-configurable button groups
2. **Themes**: Light/dark theme support
3. **Shortcuts**: Keyboard shortcut system
4. **Animations**: Enhanced animation system
5. **Internationalization**: Multi-language support

### **Technical Improvements**

1. **Performance**: Further optimization
2. **Accessibility**: Enhanced ARIA support
3. **Testing**: Comprehensive test coverage
4. **Documentation**: API documentation
5. **TypeScript**: Enhanced type definitions

## 📚 Resources

### **Documentation**
- [React Documentation](https://react.dev/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)

### **Tools**
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tauri](https://tauri.app/)
- [Lucide React](https://lucide.dev/)

---

**Last Updated:** January 7, 2025  
**Version:** 1.0  
**Status:** Complete
