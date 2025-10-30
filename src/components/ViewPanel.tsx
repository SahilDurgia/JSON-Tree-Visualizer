import React, { useEffect, useCallback, useState, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyEdgeChanges,
  useReactFlow,
  BackgroundVariant,
  getNodesBounds,
  getViewportForBounds,
} from 'reactflow';
import { toPng } from 'html-to-image';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

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
  onDownloadRef?: React.MutableRefObject<(() => void) | null>;
}

const ViewPanel: React.FC<ViewPanelProps> = ({ jsonData, searchQuery, onDownloadRef }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge>([]);
  const { fitView, setCenter } = useReactFlow();
  const [searchStatus, setSearchStatus] = useState<string | null>(null);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (jsonData) {
      const { nodes: initialNodes, edges: initialEdges } = generateFlowElements(jsonData);
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
      setNodes(layoutedNodes as any);
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
    // Only process search if we have valid data
    if (!searchQuery || nodes.length === 0) {
      setHighlightedNodeId(null);
      setSearchStatus(null);
      return;
    }

    try {
      console.log('Searching for:', searchQuery);
      console.log('Available paths:', nodes.map(n => (n.data as any).path));
      
      const foundNode = findNodeByPath(nodes as any, searchQuery);
      
      if (foundNode) {
        console.log('Found node:', foundNode);
        setHighlightedNodeId(foundNode.id);
        setSearchStatus('Match found');
        // Safely center on the node
        if (foundNode.position && foundNode.width && foundNode.height) {
          setCenter(
            foundNode.position.x + foundNode.width / 2, 
            foundNode.position.y + foundNode.height / 2, 
            { zoom: 1.5, duration: 800 }
          );
        }
      } else {
        console.log('No match found for:', searchQuery);
        setHighlightedNodeId(null);
        setSearchStatus('No match found');
      }
    } catch (error) {
      console.error('Search error:', error);
      setHighlightedNodeId(null);
      setSearchStatus('Search error');
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

  // Download handler
  const handleDownloadImage = useCallback(() => {
    if (!flowRef.current || nodes.length === 0) {
      toast.error('No tree to download');
      return;
    }

    const effectiveTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;

    const nodesBounds = getNodesBounds(nodes);
    const imageWidth = 1920;
    const imageHeight = 1080;
    const padding = 100;

    // Calculate viewport for proper node positioning (future use)
    getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      padding
    );

    toast.info('Generating image...');

    toPng(flowRef.current, {
      backgroundColor: effectiveTheme === 'dark' ? '#1a1a1a' : '#ffffff',
      width: imageWidth,
      height: imageHeight,
      pixelRatio: 2,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
      },
      filter: (node) => {
        // Exclude controls and background from capture
        if (
          node.classList?.contains('react-flow__controls') ||
          node.classList?.contains('react-flow__background')
        ) {
          return false;
        }
        return true;
      },
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `json-tree-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        toast.success('Tree downloaded successfully!');
      })
      .catch((error) => {
        console.error('Download error:', error);
        toast.error('Failed to download tree');
      });
  }, [nodes, theme]);

  // Expose download handler to parent via ref
  useEffect(() => {
    if (onDownloadRef) {
      onDownloadRef.current = handleDownloadImage;
    }
  }, [handleDownloadImage, onDownloadRef]);


  // Render empty state if no data
  if (!jsonData) {
    return (
      <div className="flex-1 bg-card flex flex-col items-center justify-center min-h-0 overflow-hidden relative rounded-xl border border-border shadow-lg">
        <div className="text-center p-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-foreground mb-2">No JSON Visualized</h3>
          <p className="text-sm text-muted-foreground">Paste your JSON in the left panel and click "Visualize"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-card flex flex-col min-h-0 overflow-hidden relative rounded-xl border border-border shadow-lg">
      {searchStatus && (
        <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm"
             style={{
               backgroundColor: searchStatus === 'Match found' 
                 ? 'hsl(var(--success) / 0.9)' 
                 : 'hsl(var(--destructive) / 0.9)',
               color: 'hsl(var(--primary-foreground))'
             }}>
          {searchStatus}
        </div>
      )}
      <div ref={flowRef} className="w-full h-full">
        {nodes.length > 0 ? (
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
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <div className="animate-pulse text-muted-foreground">Loading visualization...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPanel;