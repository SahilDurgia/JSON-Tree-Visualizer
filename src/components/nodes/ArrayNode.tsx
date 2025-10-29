import React from 'react';
import { Handle, Position } from 'reactflow';

interface ArrayNodeProps {
  data: { label: string; value: any; path: string };
}

const ArrayNode: React.FC<ArrayNodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-full bg-green-500 text-white border-2 border-green-600">
      <div className="flex items-center">
        <div className="text-lg font-bold">{data.label} (Array)</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default ArrayNode;
