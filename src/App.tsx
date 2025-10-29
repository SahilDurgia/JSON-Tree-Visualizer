import React, { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ViewPanel from './components/ViewPanel';

function App() {
  const [jsonData, setJsonData] = useState<any | null>(null);

  const handleVisualize = (data: any) => {
    setJsonData(data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <InputPanel onVisualize={handleVisualize} />
        <ViewPanel jsonData={jsonData} /> {/* Pass jsonData to ViewPanel */}
      </div>
    </div>
  );
}

export default App;