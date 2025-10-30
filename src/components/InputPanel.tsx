import React, { useState } from 'react';

interface InputPanelProps {
  onVisualize: (jsonData: any) => void;
  onClear: () => void; // Add onClear to props
}

const InputPanel: React.FC<InputPanelProps> = ({ onVisualize, onClear }) => {
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

  const handleClearClick = () => {
    setJsonInput('');
    setError(null);
    onClear();
  };

  return (
    <div className="w-1/3 flex-shrink-0 p-4 bg-card border-r border-border flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-card-foreground">JSON Input</h2>
      <textarea
        className="w-full flex-1 p-2 bg-input text-foreground border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        placeholder="Paste your JSON here..."
        value={jsonInput}
        onChange={handleInputChange}
      ></textarea>
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={handleVisualizeClick}
        >
          Visualize
        </button>
        <button
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
