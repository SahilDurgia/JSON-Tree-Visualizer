import React from 'react';

const InputPanel: React.FC = () => {
  return (
    <div className="w-1/3 p-4 bg-gray-100 border-r border-gray-300">
      <h2 className="text-lg font-semibold mb-4">JSON Input</h2>
      {/* JSON input textarea will go here */}
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste your JSON here..."
      ></textarea>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Visualize
      </button>
    </div>
  );
};

export default InputPanel;
