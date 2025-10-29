import React from 'react';

const ViewPanel: React.FC = () => {
  return (
    <div className="flex-1 p-4 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">JSON Tree Visualization</h2>
      {/* React Flow visualization will go here */}
      <div classNameName="w-full h-full border border-gray-300 rounded-md flex items-center justify-center text-gray-400">
        Tree visualization will appear here
      </div>
    </div>
  );
};

export default ViewPanel;
