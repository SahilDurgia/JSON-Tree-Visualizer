import React, { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ViewPanel from './components/ViewPanel';

function App() {
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleVisualize = (data: any) => {
    setJsonData(data);
    setSearchQuery(''); // Clear search query on new visualization
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onSearch={handleSearch} />
      <div className="flex flex-1">
        <InputPanel onVisualize={handleVisualize} />
        <ViewPanel jsonData={jsonData} searchQuery={searchQuery} /> {/* Pass searchQuery to ViewPanel */}
      </div>
    </div>
  );
}

export default App;