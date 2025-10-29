import React from 'react';
import { Handle, Position } from 'reactflow';

interface PrimitiveNodeProps {
  data: { label: string; value: any; path: string; isHighlighted?: boolean };
}

const PrimitiveNode: React.FC<PrimitiveNodeProps> = ({ data }) => {
  const borderColorClass = data.isHighlighted ? 'border-red-500' : 'border-orange-600';
  const bgColorClass = data.isHighlighted ? 'bg-red-400' : 'bg-orange-500';

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-full text-white border-2 ${bgColorClass} ${borderColorClass} cursor-pointer`}
      onClick={handleNodeClick}
    >
      <div className="flex items-center">
        <div className="text-lg font-bold">{data.label}: {String(data.value)}</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default PrimitiveNode;
