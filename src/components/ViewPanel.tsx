import React, { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  useReactFlow, // Import useReactFlow
} from 'reactflow';

import 'reactflow/dist/style.css';

import ObjectNode from './nodes/ObjectNode';
import ArrayNode from './nodes/ArrayNode';
import PrimitiveNode from './nodes/PrimitiveNode';

import generateFlowElements from '../utils/jsonToFlow';
import { getLayoutedElements } from '../utils/layout';
import { findNodeByPath } from '../utils/jsonPath'; // Import findNodeByPath
import { FlowNode, FlowEdge } from '../types';

const nodeTypes = {
  objectNode: ObjectNode,
  arrayNode: ArrayNode,
  primitiveNode: PrimitiveNode,
};

interface ViewPanelProps {
  jsonData: any | null;
  searchQuery: string; // Add searchQuery to props
}

const ViewPanel: React.FC<ViewPanelProps> = ({ jsonData, searchQuery }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);
  const { fitView, setCenter } = useReactFlow(); // Use useReactFlow hook
  const [searchStatus, setSearchStatus] = useState<string | null>(null); // State for search status

  useEffect(() => {
    if (jsonData) {
      const { nodes: initialNodes, edges: initialEdges } = generateFlowElements(jsonData);
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setSearchStatus(null); // Clear search status on new JSON
      fitView(); // Fit view to new graph
    } else {
      setNodes([]);
      setEdges([]);
      setSearchStatus(null);
    }
  }, [jsonData, setNodes, setEdges, fitView]);

  useEffect(() => {
    if (searchQuery && nodes.length > 0) {
      const foundNode = findNodeByPath(nodes, searchQuery);
      if (foundNode) {
        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            data: {
              ...node.data,
              // Add a property to data to indicate if it's highlighted
              isHighlighted: node.id === foundNode.id,
            },
          }))
        );
        setSearchStatus('Match found');
        // Auto-pan to the found node
        setCenter(foundNode.position.x + foundNode.width! / 2, foundNode.position.y + foundNode.height! / 2, { zoom: 1.5, duration: 800 });
      } else {
        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            data: {
              ...node.data,
              isHighlighted: false,
            },
          }))
        );
        setSearchStatus('No match found');
      }
    } else {
      // Clear highlighting if search query is empty
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: {
            ...node.data,
            isHighlighted: false,
          },
        }))
      );
      setSearchStatus(null);
    }
  }, [searchQuery, nodes, setNodes, setCenter]);


  const onConnect = useCallback((connection: any) => {
    setEdges((eds) => applyEdgeChanges([connection], eds));
  }, [setEdges]);

  return (
    <div className="flex-1 p-4 bg-gray-50">
      <h2 className="text-lg font-semibold mb-4">JSON Tree Visualization</h2>
      {searchStatus && (
        <p className={`mb-2 text-sm ${searchStatus === 'Match found' ? 'text-green-600' : 'text-red-600'}`}>
          {searchStatus}
        </p>
      )}
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
