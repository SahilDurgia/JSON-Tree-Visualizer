import React from 'react';
import { Handle, Position } from 'reactflow';

interface ArrayNodeProps {
  data: { label: string; value: any; path: string };
  isHighlighted?: boolean;

}

const ArrayNode: React.FC<ArrayNodeProps> = ({ data, isHighlighted }) => {
  const handleNodeClick = () => {
    navigator.clipboard.writeText(data.path);
    // Optionally, provide some visual feedback to the user
    alert(`Copied path: ${data.path}`);
  };

  const tooltipContent = `Path: ${data.path}\nValue: ${JSON.stringify(data.value, null, 2)}`;

  const nodeClasses = isHighlighted
    ? 'bg-destructive border-destructive text-destructive-foreground'
    : 'bg-accent border-accent text-accent-foreground';

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md border-2 cursor-pointer ${nodeClasses}`}
      onClick={handleNodeClick}
      title={tooltipContent} // Add title attribute for tooltip
    >
      <div className="flex items-center">
        <div className="text-lg font-bold">{data.label} (Array)</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default ArrayNode;
