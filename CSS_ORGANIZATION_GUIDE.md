# CSS Organization Guide

**Version:** 1.0  
**Last Updated:** January 7, 2025  
**Status:** Production Ready

## Overview

This guide provides comprehensive guidelines for organizing and structuring CSS in the Translation App. It ensures consistency, maintainability, and scalability across all stylesheets.

## Table of Contents

1. [File Structure](#file-structure)
2. [CSS Module Guidelines](#css-module-guidelines)
3. [Naming Conventions](#naming-conventions)
4. [Import Order](#import-order)
5. [Component Development](#component-development)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## File Structure

### Recommended Directory Structure

```
src/
├── styles/
│   ├── reset.css              # CSS reset/normalize
│   ├── variables.css          # Design system variables
│   └── utilities.css          # Utility classes
├── components/
│   ├── ComponentName/
│   │   ├── ComponentName.tsx
│   │   └── ComponentName.module.css
│   └── ...
└── App.css                    # Global styles and imports
```

### File Naming Conventions

- **CSS Modules**: `ComponentName.module.css`
- **Global Styles**: `filename.css` (e.g., `variables.css`, `utilities.css`)
- **Component Files**: `ComponentName.tsx`

---

## CSS Module Guidelines

### 1. Component Structure

Each component should have its own CSS module file following this structure:

```css
/* ComponentName.module.css */

/* ===== CONTAINER ===== */
.container {
  /* Main container styles */
}

/* ===== LAYOUT SECTIONS ===== */
.header {
  /* Header section styles */
}

.content {
  /* Content section styles */
}

.footer {
  /* Footer section styles */
}

/* ===== INTERACTIVE ELEMENTS ===== */
.button {
  /* Button base styles */
}

.button:hover {
  /* Button hover styles */
}

.button:active {
  /* Button active styles */
}

/* ===== STATES ===== */
.active {
  /* Active state styles */
}

.disabled {
  /* Disabled state styles */
}

/* ===== ANIMATIONS ===== */
@keyframes fadeIn {
  /* Animation keyframes */
}
```

### 2. Class Naming Patterns

Use descriptive, semantic class names:

```css
/* ✅ Good - Descriptive and semantic */
.container { }
.header { }
.title { }
.button { }
.buttonPrimary { }
.buttonSecondary { }
.formInput { }
.formLabel { }
.errorMessage { }

/* ❌ Bad - Non-descriptive or unclear */
.box { }
.item { }
.btn { }
.input { }
.text { }
```

### 3. CSS Variables Usage

Always use CSS variables from the design system:

```css
/* ✅ Good - Using design system variables */
.container {
  background-color: var(--background-secondary);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

/* ❌ Bad - Hardcoded values */
.container {
  background-color: #161b22;
  color: #f0f6fc;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

---

## Naming Conventions

### 1. CSS Class Names

- **Format**: `camelCase`
- **Prefix**: None (CSS modules provide scoping)
- **Suffix**: Use descriptive suffixes for variants

```css
/* Base classes */
.button { }
.input { }
.card { }

/* Variants */
.buttonPrimary { }
.buttonSecondary { }
.inputError { }
.cardHover { }

/* States */
.buttonActive { }
.inputFocused { }
.cardSelected { }
```

### 2. CSS Variables

- **Format**: `kebab-case`
- **Prefix**: Use semantic prefixes
- **Grouping**: Group related variables

```css
/* ✅ Good - Semantic and grouped */
:root {
  /* Colors */
  --background-primary: #1a1a1a;
  --background-secondary: #161b22;
  --text-primary: #f0f6fc;
  --text-secondary: #8b949e;
  
  /* Spacing */
  --spacing-xs: 0.125rem;
  --spacing-sm: 0.25rem;
  --spacing-md: 0.5rem;
  
  /* Components */
  --button-height: 2rem;
  --input-height: 2.5rem;
}
```

### 3. Animation Names

- **Format**: `camelCase`
- **Prefix**: Use descriptive prefixes

```css
/* ✅ Good - Descriptive animation names */
@keyframes fadeIn { }
@keyframes slideIn { }
@keyframes pulse { }
@keyframes spin { }

/* ❌ Bad - Generic names */
@keyframes animation1 { }
@keyframes move { }
@keyframes change { }
```

---

## Import Order

### 1. App.css Import Order

```css
/* 1. Tailwind CSS (if using) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 2. CSS Reset (foundation) */
@import './styles/reset.css';

/* 3. Design System Variables */
@import './styles/variables.css';

/* 4. Utility Classes */
@import './styles/utilities.css';

/* 5. Global Component Styles */
/* (Add global styles here) */
```

### 2. Component Import Order

```tsx
// ComponentName.tsx
import React from 'react';
import styles from './ComponentName.module.css';

// Other imports...
```

---

## Component Development

### 1. New Component Checklist

When creating a new component:

- [ ] Create `ComponentName.tsx` file
- [ ] Create `ComponentName.module.css` file
- [ ] Use CSS variables from design system
- [ ] Follow naming conventions
- [ ] Add proper TypeScript types
- [ ] Test component in isolation
- [ ] Document component usage

### 2. Component Template

```tsx
// ComponentName.tsx
import React from 'react';
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // Define props interface
}

export default function ComponentName({ }: ComponentNameProps) {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
}
```

```css
/* ComponentName.module.css */
.container {
  /* Use CSS variables */
  background-color: var(--background-secondary);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}

/* Add other styles following the structure guide */
```

### 3. Refactoring Existing Components

When refactoring from Tailwind to CSS modules:

1. **Identify Tailwind classes** in the component
2. **Create CSS module file** with equivalent styles
3. **Replace Tailwind classes** with CSS module classes
4. **Test thoroughly** to ensure visual consistency
5. **Remove unused Tailwind classes**

---

## Best Practices

### 1. CSS Organization

```css
/* ✅ Good - Well organized */
.container {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  padding: var(--spacing-md);
  gap: var(--spacing-sm);
  
  /* Colors */
  background-color: var(--background-secondary);
  color: var(--text-primary);
  
  /* Borders */
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  
  /* Effects */
  box-shadow: var(--shadow-sm);
  transition: var(--transition-fast);
}

/* ❌ Bad - Poorly organized */
.container {
  background-color: var(--background-secondary);
  display: flex;
  border: 1px solid var(--border-primary);
  padding: var(--spacing-md);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
  flex-direction: column;
  border-radius: var(--radius-lg);
  gap: var(--spacing-sm);
  transition: var(--transition-fast);
}
```

### 2. Responsive Design

```css
/* ✅ Good - Mobile-first approach */
.container {
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-lg);
  }
}
```

### 3. State Management

```css
/* ✅ Good - Clear state management */
.button {
  background-color: var(--background-hover);
  transition: var(--transition-fast);
}

.button:hover {
  background-color: var(--background-active);
}

.button:active {
  background-color: var(--background-primary);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### 4. Performance Considerations

```css
/* ✅ Good - Efficient selectors */
.container { }
.button { }
.input { }

/* ❌ Bad - Inefficient selectors */
div.container { }
button.button { }
input.input { }
```

---

## Troubleshooting

### Common Issues

#### 1. Styles Not Applying

**Problem**: CSS module styles not appearing

**Solution**: 
- Check import statement: `import styles from './Component.module.css'`
- Verify class name: `className={styles.className}`
- Ensure CSS module file exists and is properly named

#### 2. CSS Variables Not Working

**Problem**: CSS variables showing as invalid

**Solution**:
- Check variable name spelling
- Ensure variables are defined in `variables.css`
- Verify `variables.css` is imported in `App.css`

#### 3. Conflicting Styles

**Problem**: Global styles overriding component styles

**Solution**:
- Use CSS modules for component-specific styles
- Check CSS specificity
- Use `!important` sparingly and only when necessary

#### 4. Build Errors

**Problem**: CSS build errors

**Solution**:
- Run `npm run lint:css` to check for syntax errors
- Verify all imports are correct
- Check for missing semicolons or brackets

### Debugging Tips

1. **Use Browser DevTools** to inspect computed styles
2. **Check CSS module class names** in the generated HTML
3. **Verify CSS variables** are loaded in the browser
4. **Test components in isolation** to identify issues
5. **Use CSS linting** to catch common errors

---

## Migration Guide

### From Tailwind to CSS Modules

1. **Create CSS module file**
2. **Convert Tailwind classes to CSS**
3. **Use CSS variables for values**
4. **Update component imports**
5. **Test thoroughly**

### Example Migration

```tsx
// Before (Tailwind)
<div className="bg-background-secondary border border-border-primary rounded-lg p-4">
  <h2 className="text-lg font-medium text-text-primary mb-2">Title</h2>
  <p className="text-sm text-text-secondary">Description</p>
</div>

// After (CSS Modules)
<div className={styles.card}>
  <h2 className={styles.title}>Title</h2>
  <p className={styles.description}>Description</p>
</div>
```

```css
/* styles.module.css */
.card {
  background-color: var(--background-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
}

.title {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
```

---

## Tools and Scripts

### Available Scripts

```bash
# Lint CSS files
npm run lint:css

# Fix CSS linting issues
npm run lint:css:fix

# Run all linting
npm run lint
```

### IDE Integration

- **VS Code**: Install Stylelint extension
- **WebStorm**: Built-in CSS support
- **Sublime Text**: Install CSS linting packages

---

## Conclusion

Following these guidelines will ensure:

- ✅ **Consistent** CSS organization across the project
- ✅ **Maintainable** styles that are easy to update
- ✅ **Scalable** architecture that grows with the project
- ✅ **Performant** CSS that loads efficiently
- ✅ **Accessible** styles that work across browsers

For questions or issues, refer to the [Design System Documentation](./DESIGN_SYSTEM.md) or the [CSS Improvements Guide](./CSS_IMPROVEMENTS.md).

---

**Last Updated:** January 7, 2025  
**Version:** 1.0  
**Status:** Production Ready
