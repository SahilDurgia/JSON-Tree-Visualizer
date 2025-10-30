import React from 'react';
import { Handle, Position } from 'reactflow';

interface PrimitiveNodeProps {
  data: { label: string; value: any; path: string };
  isHighlighted?: boolean;

}

const PrimitiveNode: React.FC<PrimitiveNodeProps> = ({ data, isHighlighted }) => {
  const handleNodeClick = () => {
    navigator.clipboard.writeText(data.path);
    // Optionally, provide some visual feedback to the user
    alert(`Copied path: ${data.path}`);
  };

  const tooltipContent = `Path: ${data.path}\nValue: ${String(data.value)}`;

  const nodeClasses = isHighlighted
    ? 'bg-destructive border-destructive text-destructive-foreground'
    : 'bg-secondary border-secondary text-secondary-foreground';

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md border-2 cursor-pointer ${nodeClasses}`}
      onClick={handleNodeClick}
      title={tooltipContent} // Add title attribute for tooltip
    >
      <div className="flex items-center">
        <div className="text-lg font-bold">{data.label}: {String(data.value)}</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default PrimitiveNode;
