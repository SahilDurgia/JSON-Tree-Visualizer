import React, { useState } from 'react';

interface InputPanelProps {
  onVisualize: (jsonData: any) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ onVisualize }) => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
    setError(null); // Clear error on input change
  };

  const handleVisualizeClick = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      onVisualize(parsedJson);
      setError(null);
    } catch (e: any) {
      setError('Invalid JSON format: ' + e.message);
    }
  };

  return (
    <div className="w-1/3 p-4 bg-gray-100 border-r border-gray-300">
      <h2 className="text-lg font-semibold mb-4">JSON Input</h2>
      {/* JSON input textarea will go here */}
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste your JSON here..."
        value={jsonInput}
        onChange={handleInputChange}
      ></textarea>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleVisualizeClick}
      >
        Visualize
      </button>
    </div>
  );
};

export default InputPanel;
