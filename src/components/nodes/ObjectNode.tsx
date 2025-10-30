import React from 'react';
import { Handle, Position } from 'reactflow';
import { toast } from 'react-toastify';

interface ObjectNodeProps {
  data: { label: string; value: any; path: string };
  isHighlighted?: boolean;
}

const ObjectNode: React.FC<ObjectNodeProps> = ({ data, isHighlighted }) => {
  const handleNodeClick = () => {
    navigator.clipboard.writeText(data.path);
    toast.success(`Copied: ${data.path}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const tooltipContent = `Path: ${data.path}\nValue: ${JSON.stringify(data.value, null, 2)}`;

  const nodeClasses = isHighlighted
    ? 'bg-destructive border-destructive text-destructive-foreground shadow-destructive/50'
    : 'bg-primary border-primary text-primary-foreground shadow-primary/30';

  return (
    <div
      className={`px-4 py-2 shadow-lg rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl ${nodeClasses}`}
      onClick={handleNodeClick}
      title={tooltipContent}
    >
      <div className="flex items-center">
        <div className="text-sm sm:text-base font-semibold">{data.label} (Object)</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-primary" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-primary" />
    </div>
  );
};

export default ObjectNode;
