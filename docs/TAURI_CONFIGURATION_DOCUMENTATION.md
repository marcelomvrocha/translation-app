# Tauri Configuration Documentation

## Overview

This document provides comprehensive documentation for the Tauri configuration file that controls the native macOS title bar and window behavior.

## File Location

**Path**: `src-tauri/tauri.conf.json`

## Configuration Structure

### Basic App Information

```json
{
  "$schema": "https://schema.tauri.app/config/2",  // JSON schema for validation
  "productName": "gaia",                           // App name for distribution
  "version": "0.1.0",                             // App version
  "identifier": "com.marcelomartinsvieirarocha.gaia" // Unique app identifier
}
```

### Build Configuration

```json
"build": {
  "beforeDevCommand": "npm run dev",              // Command to run before dev
  "devUrl": "http://localhost:1420",              // Development server URL
  "beforeBuildCommand": "npm run build",          // Command to run before build
  "frontendDist": "../dist"                       // Frontend distribution directory
}
```

### Window Configuration

```json
"app": {
  "windows": [
    {
      "label": "main",                            // Window identifier
      "title": "GAIA",                            // Native title bar text
      "width": 1200,                              // Initial window width
      "height": 800,                              // Initial window height
      "minWidth": 800,                            // Minimum window width
      "minHeight": 600,                           // Minimum window height
      "decorations": true,                        // Enable native title bar
      "resizable": true,                          // Allow window resizing
      "maximizable": true,                        // Allow window maximizing
      "minimizable": true,                        // Allow window minimizing
      "closable": true,                           // Allow window closing
      "center": true,                             // Center window on screen
      "transparent": false                        // Window background transparency
    }
  ]
}
```

## Native Title Bar Elements

### Traffic Light Buttons

The native macOS title bar provides three traffic light buttons:

1. **Red Button (Close)**
   - **Function**: Closes the application window
   - **Position**: Far left of title bar
   - **Styling**: Native macOS red color
   - **Behavior**: Handled by Tauri framework

2. **Yellow Button (Minimize)**
   - **Function**: Minimizes window to dock
   - **Position**: Center of traffic lights
   - **Styling**: Native macOS yellow color
   - **Behavior**: Handled by Tauri framework

3. **Green Button (Maximize)**
   - **Function**: Maximizes window or enters fullscreen
   - **Position**: Right of traffic lights
   - **Styling**: Native macOS green color
   - **Behavior**: Handled by Tauri framework

### Window Title

- **Text**: "GAIA" (as configured in `title` field)
- **Position**: Center of native title bar
- **Styling**: Native macOS title styling
- **Function**: Displayed by system, not customizable

### Window Controls

- **Resize Handles**: Native resize functionality
- **Drag Area**: Native window dragging
- **Focus Indicators**: Native focus behavior
- **Menu Bar Integration**: Native menu bar behavior

## Configuration Options

### Window Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | - | Unique identifier for the window |
| `title` | string | - | Text displayed in native title bar |
| `width` | number | - | Initial window width in pixels |
| `height` | number | - | Initial window height in pixels |
| `minWidth` | number | - | Minimum window width in pixels |
| `minHeight` | number | - | Minimum window height in pixels |
| `decorations` | boolean | true | Enable native title bar and window decorations |
| `resizable` | boolean | true | Allow window resizing |
| `maximizable` | boolean | true | Allow window maximizing |
| `minimizable` | boolean | true | Allow window minimizing |
| `closable` | boolean | true | Allow window closing |
| `center` | boolean | true | Center window on screen |
| `transparent` | boolean | false | Enable window transparency |

### Security Configuration

```json
"security": {
  "csp": null  // Content Security Policy (disabled for development)
}
```

### Bundle Configuration

```json
"bundle": {
  "active": true,           // Enable app bundling
  "targets": "all",         // Target all platforms
  "icon": [                 // App icons for different platforms
    "icons/32x32.png",      // 32x32 PNG icon
    "icons/128x128.png",    // 128x128 PNG icon
    "icons/128x128@2x.png", // 128x128@2x PNG icon (Retina)
    "icons/icon.icns",      // macOS icon file
    "icons/icon.ico"        // Windows icon file
  ]
}
```

## Customization Options

### Title Bar Customization

The native title bar can be customized through Tauri configuration:

```json
{
  "decorations": true,        // Enable/disable native decorations
  "transparent": false,       // Enable/disable window transparency
  "title": "Custom Title"     // Change title bar text
}
```

### Window Behavior

```json
{
  "resizable": true,          // Allow/disable resizing
  "maximizable": true,        // Allow/disable maximizing
  "minimizable": true,        // Allow/disable minimizing
  "closable": true,           // Allow/disable closing
  "center": true              // Center/disable centering
}
```

### Size Constraints

```json
{
  "width": 1200,              // Initial width
  "height": 800,              // Initial height
  "minWidth": 800,            // Minimum width
  "minHeight": 600,           // Minimum height
  "maxWidth": 1920,           // Maximum width (optional)
  "maxHeight": 1080           // Maximum height (optional)
}
```

## Integration with Custom Overlay

### Dual-Layer Architecture

The title bar system uses a dual-layer approach:

1. **Native Layer**: Tauri configuration provides native macOS title bar
2. **Custom Layer**: React component provides additional functionality

### Coordination

- **Native title bar**: Handles window controls and system integration
- **Custom overlay**: Provides branding, project info, and additional controls
- **Z-index management**: Custom overlay appears above native title bar
- **Drag regions**: Native title bar handles window dragging

## Platform-Specific Behavior

### macOS

- **Traffic Lights**: Red, yellow, green buttons on left
- **Title**: Centered text in title bar
- **Drag**: Entire title bar is draggable
- **Focus**: Native focus indicators
- **Menu Bar**: Integrates with macOS menu bar

### Windows

- **Window Controls**: Minimize, maximize, close buttons on right
- **Title**: Left-aligned text
- **Drag**: Title bar area is draggable
- **Focus**: Native focus indicators

### Linux

- **Window Controls**: Varies by desktop environment
- **Title**: Centered or left-aligned text
- **Drag**: Title bar area is draggable
- **Focus**: Native focus indicators

## Troubleshooting

### Common Issues

1. **Title not showing**: Check `title` field in configuration
2. **Window not resizable**: Verify `resizable` is set to `true`
3. **Window not centered**: Check `center` field
4. **Icons not loading**: Verify icon file paths

### Debug Tips

1. **Check console**: Look for Tauri configuration errors
2. **Verify paths**: Ensure icon files exist
3. **Test builds**: Test with `tauri build` command
4. **Check logs**: Review Tauri development logs

## Best Practices

### Configuration

1. **Use descriptive labels**: Choose meaningful window labels
2. **Set appropriate sizes**: Consider different screen sizes
3. **Enable accessibility**: Ensure proper window behavior
4. **Test thoroughly**: Verify on target platforms

### Performance

1. **Minimize transparency**: Use sparingly for performance
2. **Optimize icons**: Use appropriate icon sizes
3. **Limit windows**: Avoid too many windows
4. **Monitor resources**: Check memory usage

## Future Enhancements

### Potential Improvements

1. **Dynamic titles**: Change title based on app state
2. **Custom decorations**: More control over native elements
3. **Multi-window support**: Multiple window configurations
4. **Advanced theming**: Platform-specific theming

### Advanced Features

1. **Window state persistence**: Remember window size/position
2. **Custom window controls**: Additional native controls
3. **Menu integration**: Native menu bar integration
4. **Accessibility**: Enhanced accessibility features

---

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Status**: Complete  
**Maintainer**: Development Team
