<!-- bb6b3f9d-1694-4756-9e8c-abbf59c82ce6 6d6907d6-277e-4050-8000-2a3d9ea68bde -->
# Enhance JSON Tree Visualizer Features

## Overview

Implement two major enhancements: (1) Replace current syntax highlighter with Monaco Editor for real-time syntax highlighting while typing, and (2) Re-implement the download-as-image feature using React Flow's `getNodesBounds` and `getViewportForBounds` for proper rendering.

## Changes Required

### 1. Install Monaco Editor

**File: `package.json`**

- Add `@monaco-editor/react` package (~4MB bundle, but provides VS Code-like editing experience)
- Add type definitions if needed

### 2. Replace Syntax Highlighter in InputPanel

**File: `src/components/InputPanel.tsx`**

- Remove `react-syntax-highlighter` and toggle-based editing approach
- Import and integrate `@monaco-editor/react`
- Configure Monaco with:
  - JSON language mode with validation
  - Theme switching (vs-dark / vs-light) based on app theme
  - Auto-formatting on paste
  - Error markers for invalid JSON
  - Minimap disabled for cleaner look
  - Line numbers enabled
  - Read-only mode: false (allow direct editing)
- Keep error state for validation feedback below editor
- Remove `isEditing` state (no longer needed)

**Key implementation:**

```typescript
import Editor from '@monaco-editor/react';

// In component:
<Editor
  height="100%"
  defaultLanguage="json"
  theme={effectiveTheme === 'dark' ? 'vs-dark' : 'vs-light'}
  value={jsonInput}
  onChange={(value) => setJsonInput(value || '')}
  options={{
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    formatOnPaste: true,
    formatOnType: true
  }}
/>
```

### 3. Re-implement Download Image Feature

**File: `src/components/Header.tsx`**

- Add download button back to header (next to theme toggle)
- Add `onDownload` prop to handle download trigger
- Style button with download icon
- Disable when `!hasData`

**File: `src/App.tsx`**

- Create `handleDownload` function
- Pass to `ViewPanel` via callback prop
- Pass to `Header` for button trigger

**File: `src/components/ViewPanel.tsx`**

- Import `getNodesBounds`, `getViewportForBounds` from reactflow
- Import `toPng` from html-to-image
- Add `onDownload` prop
- Implement proper download logic using React Flow's viewport transformation:
```typescript
const handleDownload = useCallback(() => {
  const nodesBounds = getNodesBounds(nodes);
  const viewport = getViewportForBounds(
    nodesBounds,
    imageWidth,
    imageHeight,
    0.5, // minZoom
    2,   // maxZoom
    padding
  );
  
  // Apply viewport transform, wait for render, capture, then restore
  toPng(flowRef.current, {
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    width: imageWidth,
    height: imageHeight,
    style: {
      width: `${imageWidth}px`,
      height: `${imageHeight}px`,
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
    }
  }).then(downloadImage);
}, [nodes, theme]);
```


This approach ensures both nodes and edges render correctly by using React Flow's native viewport calculations.

### 4. Update Tech Stack in README

**File: `README.md` (line 53)**

- Change from `react-syntax-highlighter` to `@monaco-editor/react`
- Verify all feature checkboxes match implementation

## Testing Checklist

- Monaco editor displays with correct theme
- Real-time syntax highlighting works while typing
- Invalid JSON shows error markers in editor
- Download button appears in header
- Download captures full tree with nodes and edges visible
- Downloaded image has proper background color for theme
- All existing functionality still works

### To-dos

- [ ] Update Header.tsx with responsive flex layout to prevent overlapping
- [ ] Apply modern design patterns including gradients, shadows, and transitions
- [ ] Verify header works correctly at mobile, tablet, and desktop sizes
- [ ] Install @monaco-editor/react package and type definitions
- [ ] Replace react-syntax-highlighter with Monaco Editor in InputPanel.tsx
- [ ] Add download button to Header.tsx with proper styling and props
- [ ] Implement download handler in ViewPanel.tsx using React Flow viewport methods
- [ ] Wire up download callback through App.tsx to connect Header and ViewPanel
- [ ] Update README tech stack to reflect Monaco Editor usage
- [ ] Test both features work correctly in light and dark modes