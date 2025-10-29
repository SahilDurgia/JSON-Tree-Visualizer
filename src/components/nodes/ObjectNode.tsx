import React from 'react';
import { Handle, Position } from 'reactflow';

interface ObjectNodeProps {
  data: { label: string; value: any; path: string; isHighlighted?: boolean };
}

const ObjectNode: React.FC<ObjectNodeProps> = ({ data }) => {
  const borderColorClass = data.isHighlighted ? 'border-red-500' : 'border-blue-600';
  const bgColorClass = data.isHighlighted ? 'bg-red-400' : 'bg-blue-500';

  const handleNodeClick = () => {
    navigator.clipboard.writeText(data.path);
    // Optionally, provide some visual feedback to the user
    alert(`Copied path: ${data.path}`);
  };

  const tooltipContent = `Path: ${data.path}\nValue: ${JSON.stringify(data.value, null, 2)}`;

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-full text-white border-2 ${bgColorClass} ${borderColorClass} cursor-pointer`}
      onClick={handleNodeClick}
      title={tooltipContent} // Add title attribute for tooltip
    >
      <div className="flex items-center">
        <div className="text-lg font-bold">{data.label} (Object)</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default ObjectNode;
