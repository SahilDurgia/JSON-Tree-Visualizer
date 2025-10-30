import React from 'react';
import { Handle, Position } from 'reactflow';
import { toast } from 'react-toastify';

interface PrimitiveNodeProps {
  data: { label: string; value: any; path: string };
  isHighlighted?: boolean;
}

const PrimitiveNode: React.FC<PrimitiveNodeProps> = ({ data, isHighlighted }) => {
  const handleNodeClick = () => {
    navigator.clipboard.writeText(data.path);
    toast.success(`Copied: ${data.path}`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const tooltipContent = `Path: ${data.path}\nValue: ${String(data.value)}`;

  const nodeClasses = isHighlighted
    ? 'bg-destructive border-destructive text-destructive-foreground shadow-destructive/50'
    : 'bg-orange-500 border-orange-500 text-white shadow-orange-500/30';

  return (
    <div
      className={`px-4 py-2 shadow-lg rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl ${nodeClasses}`}
      onClick={handleNodeClick}
      title={tooltipContent}
    >
      <div className="flex items-center">
        <div className="text-sm sm:text-base font-semibold">{data.label}: {String(data.value)}</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-orange-400" />
    </div>
  );
};

export default PrimitiveNode;
