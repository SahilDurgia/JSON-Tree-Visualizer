# JSON Tree Visualizer

An interactive web application that renders JSON data into a hierarchical tree structure using React Flow.

## Features

- JSON Input & Parsing
- Tree Visualization with custom nodes (Object, Array, Primitive)
- Search & Highlight nodes by JSON path
- Interactive controls (Zoom, Pan)
- Dark/Light Mode Toggle
- Clear/Reset functionality
- Copy JSON path to clipboard on node click
- Hover tooltips for nodes displaying path and value

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Flow

## Setup and Run Locally

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd json-tree-visualizer
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Deployment

This application can be deployed to platforms like Netlify, Vercel, or GitHub Pages. The build command is `npm run build`.