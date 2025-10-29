import React from 'react';
import Header from './components/Header';
import InputPanel from './components/InputPanel';
import ViewPanel from './components/ViewPanel';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <InputPanel />
        <ViewPanel />
      </div>
    </div>
  );
}

export default App;