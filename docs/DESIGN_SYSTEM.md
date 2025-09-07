# Design System Documentation

**Version:** 1.0  
**Last Updated:** January 7, 2025  
**Status:** Production Ready

## Overview

This design system provides a comprehensive set of CSS variables, utility classes, and component patterns for the Translation App. It ensures consistency, maintainability, and scalability across all components.

## Table of Contents

1. [CSS Variables](#css-variables)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Patterns](#component-patterns)
6. [Utility Classes](#utility-classes)
7. [CSS Modules](#css-modules)
8. [Best Practices](#best-practices)
9. [Examples](#examples)

---

## CSS Variables

All design tokens are defined in `src/styles/variables.css` and can be used throughout the application.

### Importing Variables

```css
/* In your CSS module or component styles */
.my-component {
  background-color: var(--background-primary);
  color: var(--text-primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
```

---

## Color System

### Background Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--background-primary` | `#1a1a1a` | Main background color |
| `--background-secondary` | `#161b22` | Secondary background (panels, cards) |
| `--background-tertiary` | `#21262d` | Tertiary background (disabled states) |
| `--background-hover` | `#2a2a2a` | Hover states |
| `--background-active` | `#1a1a1a` | Active/pressed states |

### Text Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--text-primary` | `#f0f6fc` | Primary text color |
| `--text-secondary` | `#8b949e` | Secondary text color |
| `--text-tertiary` | `#6b7280` | Tertiary text color |
| `--text-disabled` | `#484f58` | Disabled text color |

### Border Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--border-primary` | `#30363d` | Primary border color |
| `--border-secondary` | `#21262d` | Secondary border color |
| `--border-focus` | `#58a6ff` | Focus border color |
| `--border-error` | `#f85149` | Error border color |
| `--border-success` | `#3fb950` | Success border color |

### Accent Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--accent-primary` | `#58a6ff` | Primary accent color |
| `--accent-secondary` | `#ec4899` | Secondary accent color |
| `--accent-success` | `#3fb950` | Success color |
| `--accent-warning` | `#d29922` | Warning color |
| `--accent-error` | `#f85149` | Error color |

### Accent Blue Variants

| Variable | Value | Usage |
|----------|-------|-------|
| `--accent-blue` | `#58a6ff` | Primary blue |
| `--accent-blue-hover` | `#4a9eff` | Blue hover state |
| `--accent-blue-light` | `rgba(88, 166, 255, 0.1)` | Light blue background |
| `--accent-blue-border` | `rgba(88, 166, 255, 0.2)` | Light blue border |

### Status Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--status-draft` | `#d29922` | Draft status |
| `--status-draft-light` | `rgba(210, 153, 34, 0.2)` | Draft background |
| `--status-draft-border` | `rgba(210, 153, 34, 0.3)` | Draft border |
| `--status-validated` | `#3fb950` | Validated status |
| `--status-validated-light` | `rgba(63, 185, 80, 0.2)` | Validated background |
| `--status-validated-border` | `rgba(63, 185, 80, 0.3)` | Validated border |
| `--status-approved` | `#58a6ff` | Approved status |
| `--status-approved-light` | `rgba(88, 166, 255, 0.2)` | Approved background |
| `--status-approved-border` | `rgba(88, 166, 255, 0.3)` | Approved border |

### macOS Traffic Light Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--traffic-light-red` | `#ff5f57` | Close button |
| `--traffic-light-yellow` | `#ffbd2e` | Minimize button |
| `--traffic-light-green` | `#28ca42` | Maximize button |

---

## Typography

### Font Sizes

| Variable | Value | Usage |
|----------|-------|-------|
| `--text-xs` | `0.75rem` | Small text, captions |
| `--text-sm` | `0.875rem` | Body text, labels |
| `--text-base` | `1rem` | Default text size |
| `--text-lg` | `1.125rem` | Large text, headings |
| `--text-xl` | `1.25rem` | Extra large text |
| `--text-2xl` | `1.5rem` | Section headings |

### Font Weights

| Variable | Value | Usage |
|----------|-------|-------|
| `--font-normal` | `400` | Normal text |
| `--font-medium` | `500` | Medium weight |
| `--font-semibold` | `600` | Semibold |
| `--font-bold` | `700` | Bold text |

### Line Heights

| Variable | Value | Usage |
|----------|-------|-------|
| `--leading-tight` | `1.25` | Tight line height |
| `--leading-normal` | `1.5` | Normal line height |
| `--leading-relaxed` | `1.75` | Relaxed line height |

---

## Spacing System

### Spacing Scale

| Variable | Value | Usage |
|----------|-------|-------|
| `--spacing-xs` | `0.125rem` (2px) | Very small spacing |
| `--spacing-sm` | `0.25rem` (4px) | Small spacing |
| `--spacing-md` | `0.5rem` (8px) | Medium spacing |
| `--spacing-lg` | `1rem` (16px) | Large spacing |
| `--spacing-xl` | `1.5rem` (24px) | Extra large spacing |
| `--spacing-2xl` | `2rem` (32px) | 2x large spacing |
| `--spacing-3xl` | `3rem` (48px) | 3x large spacing |

---

## Component Patterns

### Button Patterns

#### Primary Button
```css
.primary-button {
  background-color: var(--accent-primary);
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
}

.primary-button:hover {
  background-color: var(--accent-blue-hover);
}
```

#### Secondary Button
```css
.secondary-button {
  background-color: var(--background-hover);
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-primary);
  cursor: pointer;
  transition: var(--transition-fast);
}

.secondary-button:hover {
  background-color: var(--background-active);
  border-color: var(--accent-primary);
}
```

### Input Patterns

#### Text Input
```css
.text-input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background-color: var(--background-primary);
  color: var(--text-primary);
  font-size: var(--text-sm);
  transition: var(--transition-fast);
}

.text-input:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px var(--accent-blue-light);
}
```

### Card Patterns

#### Basic Card
```css
.card {
  background-color: var(--background-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}
```

---

## Utility Classes

The utility system provides 200+ classes for common patterns. Import `utilities.css` to use them.

### Layout Utilities

```css
.flex-center     /* display: flex; align-items: center; justify-content: center; */
.flex-between    /* display: flex; align-items: center; justify-content: space-between; */
.flex-column     /* display: flex; flex-direction: column; */
.flex-1          /* flex: 1; */
```

### Spacing Utilities

```css
.gap-xs          /* gap: var(--spacing-xs); */
.gap-sm          /* gap: var(--spacing-sm); */
.gap-md          /* gap: var(--spacing-md); */
.gap-lg          /* gap: var(--spacing-lg); */
```

### Text Utilities

```css
.text-truncate   /* overflow: hidden; text-overflow: ellipsis; white-space: nowrap; */
.text-center     /* text-align: center; */
.text-uppercase  /* text-transform: uppercase; */
```

### Visibility Utilities

```css
.visually-hidden /* Screen reader only content */
.hidden          /* display: none; */
.invisible       /* visibility: hidden; */
```

### Animation Utilities

```css
.animate-fade-in /* Fade in animation */
.animate-slide-in /* Slide in animation */
.transition      /* Fast transition */
.transition-colors /* Color transitions only */
```

---

## CSS Modules

All components use CSS modules for scoped styling. Follow this pattern:

### File Structure
```
src/
  components/
    MyComponent/
      MyComponent.tsx
      MyComponent.module.css
```

### CSS Module Example
```css
/* MyComponent.module.css */
.container {
  background-color: var(--background-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
}

.title {
  color: var(--text-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
}

.button {
  background-color: var(--accent-primary);
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: var(--transition-fast);
}

.button:hover {
  background-color: var(--accent-blue-hover);
}
```

### React Component Example
```tsx
// MyComponent.tsx
import styles from './MyComponent.module.css';

export default function MyComponent() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Component</h2>
      <button className={styles.button}>Click me</button>
    </div>
  );
}
```

---

## Best Practices

### 1. Always Use CSS Variables
```css
/* ✅ Good */
.my-component {
  color: var(--text-primary);
  background: var(--background-secondary);
}

/* ❌ Bad */
.my-component {
  color: #f0f6fc;
  background: #161b22;
}
```

### 2. Use CSS Modules for Components
```tsx
// ✅ Good
import styles from './MyComponent.module.css';

// ❌ Bad
import './MyComponent.css';
```

### 3. Follow Naming Conventions
```css
/* ✅ Good - kebab-case */
.container { }
.header-content { }
.button-primary { }

/* ❌ Bad - camelCase or PascalCase */
.container { }
.headerContent { }
.ButtonPrimary { }
```

### 4. Use Utility Classes for Common Patterns
```tsx
// ✅ Good
<div className="flex-center gap-md">

// ❌ Bad
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
```

### 5. Keep Styles Scoped
```css
/* ✅ Good - Component-specific */
.sidebar {
  background: var(--background-secondary);
}

/* ❌ Bad - Global styles */
body {
  background: var(--background-secondary);
}
```

### 6. Use Semantic Color Variables
```css
/* ✅ Good */
.button {
  background: var(--accent-primary);
  border-color: var(--border-primary);
}

/* ❌ Bad */
.button {
  background: var(--accent-blue);
  border-color: var(--border-primary);
}
```

---

## Examples

### Complete Component Example

```tsx
// UserCard.tsx
import styles from './UserCard.module.css';

interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

export default function UserCard({ name, email, avatar }: UserCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {avatar && (
          <img src={avatar} alt={name} className={styles.avatar} />
        )}
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.email}>{email}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.button}>Edit</button>
        <button className={`${styles.button} ${styles.secondary}`}>Delete</button>
      </div>
    </div>
  );
}
```

```css
/* UserCard.module.css */
.card {
  background-color: var(--background-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-fast);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.avatar {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
  border-radius: var(--radius-full);
  object-fit: cover;
}

.info {
  flex: 1;
}

.name {
  color: var(--text-primary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  margin-bottom: var(--spacing-xs);
}

.email {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: flex-end;
}

.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: var(--transition-fast);
}

.button:not(.secondary) {
  background-color: var(--accent-primary);
  color: var(--text-primary);
}

.button:not(.secondary):hover {
  background-color: var(--accent-blue-hover);
}

.button.secondary {
  background-color: var(--background-hover);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.button.secondary:hover {
  background-color: var(--background-active);
  border-color: var(--accent-primary);
}
```

---

## Migration Guide

### From Tailwind to CSS Modules

1. **Identify Tailwind classes** in your component
2. **Create CSS module file** with equivalent styles using CSS variables
3. **Replace Tailwind classes** with CSS module classes
4. **Test thoroughly** to ensure visual consistency

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

## Support

For questions or issues with the design system:

1. Check this documentation first
2. Review existing component implementations
3. Follow the established patterns
4. Use CSS variables consistently
5. Test across different browsers

---

**Last Updated:** January 7, 2025  
**Version:** 1.0  
**Status:** Production Ready
