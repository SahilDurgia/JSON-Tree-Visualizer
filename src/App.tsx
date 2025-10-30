import React, { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ViewPanel from './components/ViewPanel';
import { ReactFlowProvider } from 'reactflow';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

function App() {
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  // isDarkMode state and useEffect for document.documentElement.classList are now managed by ThemeProvider

  const handleVisualize = (data: any) => {
    setJsonData(data);
    setSearchQuery(''); // Clear search query on new visualization
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // handleToggleTheme is now managed by ThemeProvider

  const handleClear = () => {
    setJsonData(null);
    setSearchQuery('');
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen">
        <Header onSearch={handleSearch} />
        <div className="flex flex-1 overflow-hidden">
          <InputPanel onVisualize={handleVisualize} onClear={handleClear} />
          <ReactFlowProvider>
            <ViewPanel jsonData={jsonData} searchQuery={searchQuery} />
          </ReactFlowProvider>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;