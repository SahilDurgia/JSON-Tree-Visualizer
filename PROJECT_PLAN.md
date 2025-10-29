### **Section 1: PRD (Product Requirements Document)**

**1. Introduction**
*   **Purpose:** To create a "JSON Tree Visualizer," an interactive web application that renders JSON data into a hierarchical tree structure. This tool will help developers and data analysts to easily visualize, search, and understand complex JSON structures.
*   **Target Audience:** Frontend/Backend Developers, QA Engineers, Data Analysts, and students learning about data structures.
*   **Goals:**
    *   Provide a user-friendly interface for JSON input and visualization.
    *   Deliver a high-performance, interactive tree using React Flow.
    *   Implement robust search and highlighting functionality.
    *   Ensure the codebase is clean, modular, and maintainable.

**2. Functional Requirements**
*   **FR1: JSON Input & Parsing (Mandatory)**
    *   **User Story:** As a user, I want to paste or type JSON data into a text area so I can visualize it.
    *   **Acceptance Criteria:**
        *   A multi-line text area is available for JSON input.
        *   The system validates the input on submission.
        *   A clear error message (e.g., "Invalid JSON format") is shown for invalid syntax.
        *   A "Visualize" button triggers the tree generation process.
        *   A sample JSON is pre-loaded as a placeholder.
*   **FR2: Tree Visualization (Mandatory)**
    *   **User Story:** As a user, I want to see the JSON data rendered as a hierarchical tree so I can understand its structure.
    *   **Acceptance Criteria:**
        *   The visualization is built exclusively with the **React Flow** library.
        *   JSON objects are represented as "Object" nodes, arrays as "Array" nodes, and primitives (string, number, boolean, null) as "Primitive" nodes.
        *   Parent-child relationships are indicated with clear connecting lines (edges).
        *   Node types are color-coded for clarity (e.g., Objects: blue, Arrays: green, Primitives: orange).
*   **FR3: Search & Highlight (Mandatory)**
    *   **User Story:** As a user, I want to search for a specific key or path so I can quickly locate a node in a large JSON tree.
    *   **Acceptance Criteria:**
        *   A search bar accepts a JSON path string (e.g., `$.user.address.city`, `items[0].name`).
        *   Upon search, the matching node is highlighted with a distinct color (e.g., red).
        *   The React Flow viewport automatically pans to center the highlighted node.
        *   A status message ("Match found" or "No match found") is displayed.
*   **FR4: Interactive Controls (Optional)**
    *   **User Story:** As a user, I want basic controls to navigate the tree easily.
    *   **Acceptance Criteria:**
        *   Buttons for "Zoom In," "Zoom Out," and "Fit View" are functional.
        *   The canvas can be panned via mouse drag.
        *   Hovering over a node displays a tooltip with its full JSON path and value.
*   **FR5: Bonus Features (Optional)**
    *   **Dark/Light Mode:** A toggle to switch between themes.
    *   **Clear/Reset:** A button to clear the JSON input and the rendered tree.
    *   **Copy Path:** Clicking a node copies its JSON path to the clipboard.
    *   **Download Image:** A button to download the current tree view as a PNG/SVG image.

**3. Non-Functional Requirements**
*   **NFR1: Tech Stack:** React, TypeScript, Vite, Tailwind CSS, React Flow.
*   **NFR2: Code Quality:** Code must be modular, readable, and follow standard React best practices. Use of ESLint and Prettier is recommended.
*   **NFR3: UI/UX:** The application must be responsive, intuitive, and visually appealing. While no Figma is provided, the design should be clean and modern.
*   **NFR4: Deployment:** The final application must be deployed on a public URL (Netlify, Vercel, GitHub Pages).

---

### **Section 2: Task List with Complexity & Estimates**

| ID  | Module          | Task Title                                      | Complexity | Est. Time | Dependencies |
| --- | --------------- | ----------------------------------------------- | ---------- | --------- | ------------ |
| 1   | **Setup**       | Setup Vite + React + TS + Tailwind project      | Easy       | 1 Hour    | -            |
| 2   | **Setup**       | Install & configure React Flow & dependencies   | Easy       | 0.5 Hours | 1            |
| 3   | **UI Components** | Create main layout (Header, Input Panel, View Panel) | Easy       | 2 Hours   | 1            |
| 4   | **UI Components** | Design custom nodes for Object, Array, Primitives | Medium     | 3 Hours   | 2            |
| 5   | **Core Logic**  | Implement JSON parsing and validation logic     | Medium     | 2 Hours   | 3            |
| 6   | **Core Logic**  | **(Hard)** Convert parsed JSON to React Flow nodes/edges | Hard       | 6 Hours   | 4, 5         |
| 7   | **Search**      | Implement search input and state management     | Easy       | 1 Hour    | 3            |
| 8   | **Search**      | **(Hard)** Implement JSON path search algorithm | Hard       | 5 Hours   | 6, 7         |
| 9   | **Search**      | Implement node highlighting & auto-pan feature  | Medium     | 3 Hours   | 8            |
| 10  | **Controls**    | Add React Flow UI controls (Zoom, FitView)      | Easy       | 1 Hour    | 2            |
| 11  | **Bonus**       | Implement Dark/Light mode toggle                | Medium     | 2 Hours   | 3            |
| 12  | **Bonus**       | Implement Clear/Reset functionality             | Easy       | 1 Hour    | 5            |
| 13  | **Bonus**       | Implement "Copy Path on Click" feature          | Medium     | 2 Hours   | 6            |
| 14  | **Polish**      | Add hover tooltips for nodes                    | Medium     | 2 Hours   | 6            |
| 15  | **Polish**      | Final styling, responsiveness, and bug fixes    | Medium     | 4 Hours   | All          |
| 16  | **Deployment**  | Create README and deploy to Netlify/Vercel      | Easy       | 1 Hour    | 15           |

---

### **Section 3: Complex Task Breakdown**

**Task 6: Convert parsed JSON to React Flow nodes/edges (Hard)**
*   **Description:** This is the core of the application. It requires a recursive function that traverses the parsed JSON object and generates an array of nodes and an array of edges that React Flow can render.
*   **Subtasks:**
    1.  **Define Data Structures:** Create TypeScript interfaces for `CustomNodeData` (to store path, value, type) and `Node`, `Edge` from React Flow.
    2.  **Recursive Traversal Function:**
        *   Create a function `generateFlowElements(json, parentId, parentPath)` that takes the JSON data (or a subset), the ID of the parent node, and the.
        *   It should iterate over keys in an object or indices in an array.
        *   For each entry, it generates a unique `nodeId` (e.g., using the path `user-address-city`).
        *   It creates a `node` object with a position (to be calculated later), type (e.g., `'objectNode'`), and custom data.
        *   It creates an `edge` object connecting `parentId` to the new `nodeId`.
        *   If the entry is an object or array, it calls itself recursively: `generateFlowElements(value, nodeId, newPath)`.
    3.  **Layout Algorithm:**
        *   React Flow positions nodes at (0,0) by default. We need a simple tree layout algorithm (e.g., Breadth-First Search based) to calculate `x` and `y` positions for each node to prevent overlap. This ensures a clean, hierarchical layout.
        *   *Approach:* Maintain a map of `level -> count` to determine horizontal spacing and use the level for vertical spacing. `position: { x: level * 250, y: nodesAtThisLevel * 100 }`.

**Task 8: Implement JSON path search algorithm (Hard)**
*   **Description:** This task involves parsing the user's search query and finding the corresponding node in the generated React Flow nodes array.
*   **Subtasks:**
    1.  **Path Parser Function:**
        *   Create a function `parseJsonPath(pathString)` that takes a string like `$.user.address[0].city` and converts it into an array of keys/indices: `['user', 'address', '0', 'city']`. Use regex to handle both dot notation and bracket notation.
    2.  **Node Search Function:**
        *   Create a function `findNodeByPath(nodes, pathArray)` that iterates through the `nodes` state.
        *   The most efficient way is to find the node whose `data.path` property matches the search path. The path for each node would have been pre-calculated and stored in Task 6.
    3.  **State Management:**
        *   Use a React state (e.g., `useState` or `useReducer`) to store the ID of the highlighted node.
        *   When a node is found, update this state.
        *   Pass the `highlightedNodeId` to the custom node components. The custom node will conditionally apply a different style if its ID matches the highlighted one.

---

### **Section 4: Final Task Plan (Sprint-wise)**

**Sprint 1: Core Functionality (Estimated Time: 12.5 Hours)**
*   **Goal:** Get the basic visualization working.
*   **Tasks:**
    *   1. Setup Vite + React + TS + Tailwind project
    *   2. Install & configure React Flow
    *   3. Create main layout
    *   4. Design custom nodes for Object, Array, Primitives
    *   5. Implement JSON parsing and validation logic
    *   6. **(Hard)** Convert parsed JSON to React Flow nodes/edges

**Sprint 2: Search & Interactivity (Estimated Time: 11 Hours)**
*   **Goal:** Implement the mandatory search feature and basic controls.
*   **Tasks:**
    *   7. Implement search input and state management
    *   8. **(Hard)** Implement JSON path search algorithm
    *   9. Implement node highlighting & auto-pan feature
    *   10. Add React Flow UI controls (Zoom, FitView)

**Sprint 3: Bonus Features & Polish (Estimated Time: 10 Hours)**
*   **Goal:** Add impressive bonus features and prepare for deployment.
*   **Tasks:**
    *   11. Implement Dark/Light mode toggle
    *   12. Implement Clear/Reset functionality
    *   13. Implement "Copy Path on Click" feature
    *   14. Add hover tooltips for nodes
    *   15. Final styling, responsiveness, and bug fixes
    *   16. Create README and deploy to Netlify/Vercel

---

### **Section 5: Git Commit Log (Human-like progression)**

'''
chore: initial project setup with vite, react, and typescript
chore: install and configure tailwindcss
feat: add react-flow and basic layout components
feat: create main layout with header, input panel, and view panel
feat: implement json input textarea and visualize button
fix: add validation for invalid json input with error messages
feat: design custom nodes for object, array, and primitive types
refactor: create recursive function to traverse json data
feat: convert parsed json to react-flow nodes and edges
fix: implement basic tree layout algorithm to prevent node overlap
feat: add search bar component to header
feat: implement json path parsing logic
feat: add search functionality to find and highlight nodes
fix: handle "no match found" case in search
feat: implement auto-pan to center highlighted node on search
feat: add zoom and fit-view controls to the flow panel
feat: implement dark/light mode toggle
feat: add clear button to reset json input and tree
feat: implement copy-to-clipboard on node click to get json path
feat: add tooltips on node hover to display path and value
fix: improve responsiveness for mobile and tablet devices
refactor: optimize node generation logic for large json objects
style: final ui polish and animation tweaks
docs: create detailed readme with setup and usage instructions
chore: configure for deployment on vercel
'''
