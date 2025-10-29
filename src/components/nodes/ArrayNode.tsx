import React from 'react';
import { Handle, Position } from 'reactflow';

interface ArrayNodeProps {
  data: { label: string; value: any; path: string; isHighlighted?: boolean };
}

const ArrayNode: React.FC<ArrayNodeProps> = ({ data }) => {
  const borderColorClass = data.isHighlighted ? 'border-red-500' : 'border-green-600';
  const bgColorClass = data.isHighlighted ? 'bg-red-400' : 'bg-green-500';

  return (
    <div className={`px-4 py-2 shadow-md rounded-full text-white border-2 ${bgColorClass} ${borderColorClass}`}>
      <div className="flex items-center">
        <div className="text-lg font-bold">{data.label} (Array)</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default ArrayNode;
