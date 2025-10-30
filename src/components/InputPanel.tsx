import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../context/ThemeContext';

interface InputPanelProps {
  onVisualize: (jsonData: any) => void;
  onClear: () => void;
}

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zipCode": "10001"
    }
  },
  "products": [
    {
      "id": 101,
      "name": "Laptop",
      "price": 999.99,
      "inStock": true
    },
    {
      "id": 102,
      "name": "Mouse",
      "price": 29.99,
      "inStock": false
    }
  ],
  "settings": {
    "theme": "dark",
    "notifications": true,
    "language": "en"
  }
}`;

const InputPanel: React.FC<InputPanelProps> = ({ onVisualize, onClear }) => {
  const [jsonInput, setJsonInput] = useState<string>(SAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleInputChange = (value: string | undefined) => {
    setJsonInput(value || '');
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

  const effectiveTheme = theme === 'system' 
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  return (
    <div className="w-[30%] flex-shrink-0 p-4 bg-card rounded-xl border border-border flex flex-col min-h-0 overflow-hidden shadow-lg">
      <div className="flex-1 border border-border rounded-xl overflow-hidden flex flex-col min-h-[200px] md:min-h-0">
        <Editor
          height="100%"
          defaultLanguage="json"
          theme={effectiveTheme === 'dark' ? 'vs-dark' : 'vs'}
          value={jsonInput}
          onChange={handleInputChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
            wordWrap: 'on',
            tabSize: 2,
            insertSpaces: true,
            folding: true,
            renderLineHighlight: 'all',
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
            },
          }}
        />
      </div>
      {error && (
        <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-xs sm:text-sm">{error}</p>
        </div>
      )}
      <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
        <button
          className="flex-1 px-4 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          onClick={handleVisualizeClick}
        >
          Visualize
        </button>
        <button
          className="flex-1 px-4 py-2.5 sm:py-3 bg-secondary/80 text-secondary-foreground rounded-xl hover:bg-secondary active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          onClick={handleClearClick}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default InputPanel;
