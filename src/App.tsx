import { useState } from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ViewPanel from './components/ViewPanel';
import { ReactFlowProvider } from 'reactflow';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleVisualize = (data: any) => {
    setJsonData(data);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    // Validate before searching
    if (!jsonData) {
      console.warn('No JSON data to search');
      return;
    }
    if (!query || query.trim() === '') {
      console.warn('Empty search query');
      return;
    }
    console.log('Searching for:', query);
    setSearchQuery(query);
  };

  const handleClear = () => {
    setJsonData(null);
    setSearchQuery('');
  };

  const handleDownload = () => {
    // Call the download handler exposed by ViewPanel
    if ((window as any).__jsonTreeDownload) {
      (window as any).__jsonTreeDownload();
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen overflow-hidden bg-background">
        <Header onSearch={handleSearch} onDownload={handleDownload} hasData={jsonData !== null} />
        <div className="flex flex-row flex-1 overflow-hidden min-h-0 p-6 gap-6">
          <InputPanel onVisualize={handleVisualize} onClear={handleClear} />
          <ReactFlowProvider>
            <ViewPanel 
              jsonData={jsonData} 
              searchQuery={searchQuery}
              onDownload={handleDownload}
            />
          </ReactFlowProvider>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;