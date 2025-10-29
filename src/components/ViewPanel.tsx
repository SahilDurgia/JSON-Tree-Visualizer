import React, { useEffect, useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';

import 'reactflow/dist/style.css';

import ObjectNode from './nodes/ObjectNode';
import ArrayNode from './nodes/ArrayNode';
import PrimitiveNode from './nodes/PrimitiveNode';

import generateFlowElements from '../utils/jsonToFlow';
import { getLayoutedElements } from '../utils/layout';
import { FlowNode, FlowEdge } from '../types';

const nodeTypes = {
  objectNode: ObjectNode,
  arrayNode: ArrayNode,
  primitiveNode: PrimitiveNode,
};

interface ViewPanelProps {
  jsonData: any | null;
}

const ViewPanel: React.FC<ViewPanelProps> = ({ jsonData }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);

  useEffect(() => {
    if (jsonData) {
      const { nodes: initialNodes, edges: initialEdges } = generateFlowElements(jsonData);
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [jsonData, setNodes, setEdges]);

  const onConnect = useCallback((connection: any) => {
    setEdges((eds) => applyEdgeChanges([connection], eds));
  }, [setEdges]);

  return (
    <div className="flex-1 p-4 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">JSON Tree Visualization</h2>
      <div className="w-full h-full border border-gray-300 rounded-md">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ViewPanel;

