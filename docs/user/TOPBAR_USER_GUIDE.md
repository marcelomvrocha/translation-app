# TopBar User Guide

**Project:** TopBar Redesign - Numbers-Style Layout  
**Version:** 1.0  
**Date:** January 7, 2025

## 📖 Overview

The TopBar is the main navigation and control interface for the translation application. It features a Numbers-style design with three main sections: window controls and search on the left, project information in the center, and grouped action buttons on the right.

## 🎯 Features

### **Left Section: Window Controls & Search**
- **macOS Traffic Lights**: Standard window controls (close, minimize, maximize)
- **Search Functionality**: Search through translations with labeled input field

### **Center Section: Project Information**
- **Project Title**: Displays the current project name prominently
- **Project Description**: Shows project description when available

### **Right Section: Action Buttons**
- **View Group**: Toggle sidebar and lower pane visibility
- **Chat Group**: Toggle AI chat panel
- **Settings Group**: Access application settings

## 🖱️ How to Use

### **Searching Translations**

1. **Locate the Search Field**
   - Look for the "Search" label in the left section
   - The search input shows "translations..." as placeholder text

2. **Enter Your Search Query**
   - Click in the search field or use Tab to navigate to it
   - Type your search terms
   - Press Enter to search or wait for automatic search

3. **Clear Your Search**
   - Delete the text in the search field
   - The search will automatically update

### **Managing Panels**

#### **Sidebar Toggle**
- **Button**: First button in the "View" group (panel icon)
- **Function**: Shows/hides the left sidebar
- **Visual Feedback**: Button appears active when sidebar is open
- **Tooltip**: "Show Sidebar" or "Hide Sidebar"

#### **Lower Pane Toggle**
- **Button**: Second button in the "View" group (bottom panel icon)
- **Function**: Shows/hides the bottom panel
- **Visual Feedback**: Button appears active when pane is open
- **Tooltip**: "Show Lower Pane" or "Hide Lower Pane"

#### **Chat Panel Toggle**
- **Button**: Button in the "Chat" group (message icon)
- **Function**: Shows/hides the AI chat panel
- **Visual Feedback**: Button appears active when panel is open
- **Tooltip**: "Show AI Chat" or "Hide AI Chat"

### **Accessing Settings**

- **Button**: Button in the "Settings" group (gear icon)
- **Function**: Opens the settings modal
- **Tooltip**: "Settings"

### **Viewing Project Information**

- **Project Name**: Displayed prominently in the center of the TopBar
- **Project Description**: Shown below the project name when available
- **Fallback**: Shows "Untitled Project" when no project is selected

## ⌨️ Keyboard Shortcuts

### **Navigation**
- **Tab**: Move between interactive elements
- **Shift + Tab**: Move backwards through elements
- **Enter**: Submit search form or activate focused button
- **Escape**: Close modals or clear focus

### **Search**
- **Ctrl/Cmd + F**: Focus search field (if implemented)
- **Enter**: Submit search query
- **Escape**: Clear search field

## 📱 Responsive Design

### **Desktop (>768px)**
- Full 3-section layout with all features visible
- All button group labels displayed
- Optimal spacing and proportions

### **Tablet (≤768px)**
- Adjusted layout proportions
- Group labels hidden to save space
- Maintained functionality with touch-friendly interface

### **Mobile (≤480px)**
- Simplified layout for small screens
- Project description hidden to save space
- Compact button groups
- Smaller search input

## 🎨 Visual Design

### **Design Language**
- **Style**: Numbers app-inspired design
- **Colors**: macOS-style dark theme
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing throughout

### **Interactive Elements**
- **Hover Effects**: Subtle background changes on hover
- **Active States**: Clear visual indication of active panels
- **Transitions**: Smooth 0.15s transitions for all interactions
- **Focus Indicators**: Clear focus rings for keyboard navigation

### **Button Groups**
- **Visual Grouping**: Buttons are grouped with subtle backgrounds
- **Labels**: Each group has a descriptive label
- **Spacing**: Consistent spacing within and between groups

## 🔧 Troubleshooting

### **Common Issues**

#### **Search Not Working**
- **Check**: Ensure you're typing in the correct search field
- **Try**: Press Enter to submit the search
- **Verify**: Check if there are any error messages

#### **Buttons Not Responding**
- **Check**: Ensure the button is not disabled
- **Try**: Click directly on the button icon
- **Verify**: Check if the application is responsive

#### **Project Name Not Displaying**
- **Check**: Ensure a project is selected
- **Verify**: The project has a valid name
- **Fallback**: Should show "Untitled Project" if no project is selected

#### **Layout Issues on Mobile**
- **Check**: Ensure you're using a supported browser
- **Try**: Refresh the page
- **Verify**: Check if responsive design is working

### **Getting Help**

If you encounter issues not covered in this guide:

1. **Check the application logs** for error messages
2. **Try refreshing the page** to reset the interface
3. **Contact support** with specific details about the issue
4. **Report bugs** with steps to reproduce the problem

## 🚀 Tips and Best Practices

### **Efficient Usage**
- **Use keyboard navigation** for faster interaction
- **Learn the button locations** for quick access
- **Use search frequently** to find specific translations
- **Organize your panels** based on your workflow

### **Accessibility**
- **Use keyboard navigation** if you prefer not to use a mouse
- **Enable screen reader** if you use assistive technology
- **Use high contrast mode** if you have visual difficulties
- **Adjust browser zoom** if you need larger text

### **Performance**
- **Close unused panels** to improve performance
- **Use search efficiently** to avoid unnecessary queries
- **Keep the application updated** for best performance

## 📋 Feature Summary

| Feature | Location | Function | Keyboard |
|---------|----------|----------|----------|
| Search | Left section | Search translations | Tab, Enter |
| Project Name | Center section | Display current project | N/A |
| Sidebar Toggle | View group | Show/hide sidebar | Tab, Enter |
| Lower Pane Toggle | View group | Show/hide bottom pane | Tab, Enter |
| Chat Toggle | Chat group | Show/hide AI chat | Tab, Enter |
| Settings | Settings group | Open settings | Tab, Enter |

## 🎉 Conclusion

The TopBar provides an intuitive, Numbers-style interface for managing your translation workflow. With its clean design, responsive layout, and comprehensive functionality, it makes working with translations efficient and enjoyable.

For technical details about the TopBar implementation, see the [Developer Documentation](./TOPBAR_DEVELOPER_GUIDE.md).

---

**Last Updated:** January 7, 2025  
**Version:** 1.0  
**Status:** Complete
