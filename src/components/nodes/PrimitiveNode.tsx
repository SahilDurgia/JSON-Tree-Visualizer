import React from 'react';
import { Handle, Position } from 'reactflow';

interface PrimitiveNodeProps {
  data: { label: string; value: any; path: string };
}

const PrimitiveNode: React.FC<PrimitiveNodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-full bg-orange-500 text-white border-2 border-orange-600">
      <div className="flex items-center">
        <div className="text-lg font-bold">{data.label}: {String(data.value)}</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default PrimitiveNode;
