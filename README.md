# JSON Tree Visualizer

An interactive web application that visualizes JSON data as a hierarchical tree structure with advanced search and highlighting functionality.

![JSON Tree Visualizer](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38B2AC?logo=tailwind-css)
![React Flow](https://img.shields.io/badge/React%20Flow-11.11.4-FF6B9D)

## 🌟 Features

### Core Features (Mandatory)
- ✅ **JSON Input & Parsing**: Paste or type JSON data with real-time validation
- ✅ **Tree Visualization**: Interactive hierarchical tree using React Flow
- ✅ **Color-Coded Nodes**:
  - 🔵 **Blue** - Object nodes
  - 🟢 **Green** - Array nodes  
  - 🟠 **Orange** - Primitive values (string, number, boolean, null)
- ✅ **Search Functionality**: Search by JSON path (e.g., `$.user.address.city`, `items[0].name`)
- ✅ **Highlight & Navigate**: Automatically highlights and pans to matching nodes
- ✅ **Interactive Controls**: Zoom in/out, pan, and fit view
- ✅ **Node Information**: Hover over nodes to see path and value

### Bonus Features (Optional)
- ⭐ **Dark/Light Mode Toggle**: Seamless theme switching with system preference detection
- ⭐ **Syntax Highlighting**: Beautiful color-coded JSON editor (like VS Code)
- ⭐ **Copy JSON Path**: Click any node to copy its path to clipboard (with toast notifications)
- ⭐ **Download as Image**: Export the tree visualization as PNG
- ⭐ **Clear/Reset**: Clear input and reset visualization
- ⭐ **Sample JSON**: Pre-loaded example to try immediately
- ⭐ **Fully Responsive**: Perfect layout on mobile, tablet, and desktop

## 🚀 Live Demo

**[View Live Application](#)** *(Add your deployment link here)*

## 📸 Screenshots

### Dark Mode
![Dark Mode Screenshot](./screenshots/dark-mode.png)

### Light Mode
![Light Mode Screenshot](./screenshots/light-mode.png)

### Mobile Responsive
![Mobile Screenshot](./screenshots/mobile.png)

## 🛠️ Tech Stack

- **Framework**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS 4.1.16
- **Visualization**: React Flow 11.11.4
- **Syntax Highlighting**: react-syntax-highlighter
- **Notifications**: react-toastify
- **Image Export**: html-to-image
- **Build Tool**: Vite 7.1.7

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/json-tree-visualizer.git
cd json-tree-visualizer
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🏗️ Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder, ready for deployment.

## 📖 Usage Guide

### 1. Input JSON Data
- Paste your JSON data in the left panel
- The editor has syntax highlighting (click to edit)
- A sample JSON is pre-loaded for quick testing

### 2. Visualize
- Click the **"Visualize"** button to generate the tree
- The tree appears on the right side with color-coded nodes

### 3. Navigate the Tree
- **Zoom**: Use mouse wheel or controls at bottom-left
- **Pan**: Click and drag the canvas
- **Fit View**: Click the fit icon to see the entire tree

### 4. Search
- Use the search bar in the header
- Enter JSON paths like:
  - `$.user.name`
  - `$.products[0].price`
  - `$.settings.theme`
- Matching nodes will be highlighted in red
- View auto-pans to the matched node

### 5. Copy Node Path
- Click any node to copy its JSON path
- A toast notification confirms the copy

### 6. Download Image
- Click the **"Download"** button in the top-right
- The tree visualization is exported as PNG

### 7. Theme Toggle
- Click the sun/moon icon in the header
- Switches between light and dark modes
- Respects system preferences

## 🎨 Node Color Scheme

| Node Type | Color | Description |
|-----------|-------|-------------|
| Object | 🔵 Blue | JSON objects with key-value pairs |
| Array | 🟢 Green | JSON arrays with indexed elements |
| Primitive | 🟠 Orange | Strings, numbers, booleans, null |
| Highlighted | 🔴 Red | Search result or selected node |

## 📁 Project Structure

```
json-tree-visualizer/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # App header with search & theme toggle
│   │   ├── InputPanel.tsx          # JSON input with syntax highlighting
│   │   ├── ViewPanel.tsx           # Tree visualization panel
│   │   └── nodes/
│   │       ├── ObjectNode.tsx      # Blue object nodes
│   │       ├── ArrayNode.tsx       # Green array nodes
│   │       └── PrimitiveNode.tsx   # Orange primitive nodes
│   ├── context/
│   │   └── ThemeContext.tsx        # Theme management
│   ├── utils/
│   │   ├── jsonToFlow.ts           # Converts JSON to React Flow nodes
│   │   ├── layout.ts               # Tree layout algorithm
│   │   └── jsonPath.ts             # JSON path search utilities
│   ├── types.ts                    # TypeScript type definitions
│   ├── App.tsx                     # Main application component
│   ├── index.css                   # Global styles & Tailwind
│   └── main.tsx                    # Application entry point
├── public/                         # Static assets
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
└── README.md                       # This file
```

## 🧪 Features Checklist

### Mandatory Requirements
- [x] JSON input text area with validation
- [x] Error messages for invalid JSON
- [x] "Visualize" button
- [x] React Flow tree visualization
- [x] Object nodes (blue)
- [x] Array nodes (green)
- [x] Primitive nodes (orange)
- [x] Parent-child connections
- [x] Search by JSON path
- [x] Highlight matching nodes
- [x] Pan to matched node
- [x] "Match found" / "No match found" message
- [x] Zoom controls
- [x] Pan functionality
- [x] Hover information (path & value)

### Bonus Features
- [x] Dark/Light mode toggle
- [x] Clear/Reset button
- [x] Copy JSON path on click
- [x] Download tree as image
- [x] Syntax-highlighted JSON input
- [x] Sample JSON placeholder
- [x] Fully responsive design
- [x] Toast notifications
- [x] Modern, professional UI

## 🎯 Assignment Compliance

This project was built for the **APIWIZ Frontend SDE Role Assignment** and meets all requirements:

✅ **All mandatory features implemented**  
✅ **All bonus features implemented**  
✅ **Clean, modular code structure**  
✅ **TypeScript with proper typing**  
✅ **React Flow for visualization (no other libraries)**  
✅ **Responsive design**  
✅ **No AI tools used for development**

## 🚀 Deployment

This project can be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` branch

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- **APIWIZ** for the assignment opportunity
- **React Flow** for the excellent visualization library
- **Tailwind CSS** for the utility-first CSS framework
- **React** team for the amazing framework

---

**Built with ❤️ for APIWIZ Frontend Assignment**
