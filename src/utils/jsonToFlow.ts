import { FlowNode, FlowEdge, CustomNodeData } from '../types';
import { Node, Edge } from 'reactflow';

let nodeIdCounter = 0;

const generateFlowElements = (
  json: any,
  parentId: string | null = null,
  parentPath: string = '$'
): { nodes: FlowNode[]; edges: FlowEdge[] } => {
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];

  const processNode = (
    key: string | number,
    value: any,
    currentParentId: string | null,
    currentParentPath: string
  ) => {
    nodeIdCounter++;
    const nodeId = `node-${nodeIdCounter}`;
    const label = String(key);
    const path = Array.isArray(json) ? `${currentParentPath}[${key}]` : `${currentParentPath}.${key}`;

    let nodeType: CustomNodeData['type'];
    if (typeof value === 'object' && value !== null) {
      nodeType = Array.isArray(value) ? 'array' : 'object';
    } else {
      nodeType = 'primitive';
    }

    const nodeData: CustomNodeData = {
      label,
      value,
      path,
      type: nodeType,
    };

    const node: FlowNode = {
      id: nodeId,
      type: `${nodeType}Node`, // e.g., 'objectNode', 'arrayNode', 'primitiveNode'
      data: nodeData,
      position: { x: 0, y: 0 }, // Position will be calculated by layout algorithm
    };
    nodes.push(node);

    if (currentParentId) {
      const edge: FlowEdge = {
        id: `edge-${currentParentId}-${nodeId}`,
        source: currentParentId,
        target: nodeId,
        animated: true,
      };
      edges.push(edge);
    }

    if (nodeType === 'object' || nodeType === 'array') {
      const childElements = generateFlowElements(value, nodeId, path);
      nodes.push(...childElements.nodes);
      edges.push(...childElements.edges);
    }
  };

  if (typeof json === 'object' && json !== null) {
    if (Array.isArray(json)) {
      json.forEach((item, index) => {
        processNode(index, item, parentId, parentPath);
      });
    } else {
      Object.entries(json).forEach(([key, value]) => {
        processNode(key, value, parentId, parentPath);
      });
    }
  } else {
    // Handle the root primitive case if the entire JSON is a primitive
    if (!parentId) {
      nodeIdCounter++;
      const nodeId = `node-${nodeIdCounter}`;
      const nodeData: CustomNodeData = {
        label: 'root',
        value: json,
        path: '$',
        type: 'primitive',
      };
      const node: FlowNode = {
        id: nodeId,
        type: 'primitiveNode',
        data: nodeData,
        position: { x: 0, y: 0 },
      };
      nodes.push(node);
    }
  }

  return { nodes, edges };
};

export default generateFlowElements;
