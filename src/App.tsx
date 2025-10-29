import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ViewPanel from './components/ViewPanel';

function App() {
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // State for dark mode

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleVisualize = (data: any) => {
    setJsonData(data);
    setSearchQuery(''); // Clear search query on new visualization
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Header onSearch={handleSearch} onToggleTheme={handleToggleTheme} isDarkMode={isDarkMode} />
      <div className="flex flex-1">
        <InputPanel onVisualize={handleVisualize} />
        <ViewPanel jsonData={jsonData} searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default App;