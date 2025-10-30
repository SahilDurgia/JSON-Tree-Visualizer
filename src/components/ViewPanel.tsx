import React, { useEffect, useCallback, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from 'reactflow';

import 'reactflow/dist/style.css';

import ObjectNode from './nodes/ObjectNode';
import ArrayNode from './nodes/ArrayNode';
import PrimitiveNode from './nodes/PrimitiveNode';

import generateFlowElements from '../utils/jsonToFlow';
import { getLayoutedElements } from '../utils/layout';
import { findNodeByPath } from '../utils/jsonPath';
import type { FlowNode, FlowEdge } from '../types';

interface ViewPanelProps {
  jsonData: any | null;
  searchQuery: string;
}

const nodeTypes = {
  objectNode: ObjectNode,
  arrayNode: ArrayNode,
  primitiveNode: PrimitiveNode,
};

const ViewPanel: React.FC<ViewPanelProps> = ({ jsonData, searchQuery }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);
  const { fitView, setCenter } = useReactFlow();
  const [searchStatus, setSearchStatus] = useState<string | null>(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);

  useEffect(() => {
    if (jsonData) {
      const { nodes: initialNodes, edges: initialEdges } = generateFlowElements(jsonData);
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setSearchStatus(null);
      setHighlightedNodeId(null);
      fitView();
    } else {
      setNodes([]);
      setEdges([]);
      setSearchStatus(null);
      setHighlightedNodeId(null);
    }
  }, [jsonData, setNodes, setEdges, fitView]);

  useEffect(() => {
    if (searchQuery && nodes.length > 0) {
      const foundNode = findNodeByPath(nodes, searchQuery);
      if (foundNode) {
        setHighlightedNodeId(foundNode.id);
        setSearchStatus('Match found');
        setCenter(foundNode.position.x + foundNode.width! / 2, foundNode.position.y + foundNode.height! / 2, { zoom: 1.5, duration: 800 });
      } else {
        setHighlightedNodeId(null);
        setSearchStatus('No match found');
      }
    } else {
      setHighlightedNodeId(null);
      setSearchStatus(null);
    }
  }, [searchQuery, nodes, setCenter]);

  const onConnect = useCallback((connection: any) => {
    setEdges((eds) => applyEdgeChanges([connection], eds));
  }, [setEdges]);

  const customNodeTypes = React.useMemo(() => {
    return {
      objectNode: (props: any) => <ObjectNode {...props} isHighlighted={props.id === highlightedNodeId} />,
      arrayNode: (props: any) => <ArrayNode {...props} isHighlighted={props.id === highlightedNodeId} />,
      primitiveNode: (props: any) => <PrimitiveNode {...props} isHighlighted={props.id === highlightedNodeId} />,
    };
  }, [highlightedNodeId]);

  return (
    <div className="flex-1 p-4 bg-background flex flex-col">
      <h2 className="text-lg font-semibold mb-4 text-foreground">JSON Tree Visualization</h2>
      {searchStatus && (
        <p className={`mb-2 text-sm ${searchStatus === 'Match found' ? 'text-success' : 'text-destructive'}`}>
          {searchStatus}
        </p>
      )}
      <div className="w-full flex-1 border-t border-border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={customNodeTypes}
          fitView
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ViewPanel;