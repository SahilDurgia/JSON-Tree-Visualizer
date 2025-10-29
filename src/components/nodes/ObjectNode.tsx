import React from 'react';
import { Handle, Position } from 'reactflow';

interface ObjectNodeProps {
  data: { label: string; value: any; path: string };
}

const ObjectNode: React.FC<ObjectNodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-full bg-blue-500 text-white border-2 border-blue-600">
      <div className="flex items-center">
        <div className="text-lg font-bold">{data.label} (Object)</div>
      </div>
      <Handle type="target" position={Position.Top} className="w-16 !bg-teal-500" />
      <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
    </div>
  );
};

export default ObjectNode;
