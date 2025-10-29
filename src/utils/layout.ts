import { FlowNode, FlowEdge } from '../types';

const NODE_WIDTH = 250;
const NODE_HEIGHT = 100;
const HORIZONTAL_SPACING = 50;
const VERTICAL_SPACING = 100;

export const getLayoutedElements = (nodes: FlowNode[], edges: FlowEdge[]): { nodes: FlowNode[]; edges: FlowEdge[] } => {
  if (nodes.length === 0) {
    return { nodes: [], edges: [] };
  }

  const layoutedNodes = nodes.map(node => ({ ...node }));
  const nodeMap = new Map<string, FlowNode>(layoutedNodes.map(node => [node.id, node]));

  // Calculate levels for each node
  const levels = new Map<string, number>();
  const queue: { nodeId: string; level: number }[] = [];

  // Find root nodes (nodes with no incoming edges)
  const hasIncomingEdge = new Set<string>();
  edges.forEach(edge => hasIncomingEdge.add(edge.target));

  layoutedNodes.forEach(node => {
    if (!hasIncomingEdge.has(node.id)) {
      levels.set(node.id, 0);
      queue.push({ nodeId: node.id, level: 0 });
    }
  });

  let head = 0;
  while (head < queue.length) {
    const { nodeId, level } = queue[head++];
    edges.forEach(edge => {
      if (edge.source === nodeId) {
        const targetNode = nodeMap.get(edge.target);
        if (targetNode && (!levels.has(targetNode.id) || levels.get(targetNode.id)! < level + 1)) {
          levels.set(targetNode.id, level + 1);
          queue.push({ nodeId: targetNode.id, level: level + 1 });
        } 
      }
    });
  }

  // Group nodes by level
  const nodesByLevel = new Map<number, FlowNode[]>();
  layoutedNodes.forEach(node => {
    const level = levels.get(node.id) || 0; // Default to 0 for safety
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, []);
    }
    nodesByLevel.get(level)?.push(node);
  });

  // Calculate positions
  let maxLevelWidth = 0;
  nodesByLevel.forEach((nodesAtLevel, level) => {
    const levelWidth = nodesAtLevel.length * NODE_WIDTH + (nodesAtLevel.length - 1) * HORIZONTAL_SPACING;
    if (levelWidth > maxLevelWidth) {
      maxLevelWidth = levelWidth;
    }
  });

  nodesByLevel.forEach((nodesAtLevel, level) => {
    const levelWidth = nodesAtLevel.length * NODE_WIDTH + (nodesAtLevel.length - 1) * HORIZONTAL_SPACING;
    let xOffset = (maxLevelWidth - levelWidth) / 2; // Center nodes at each level

    nodesAtLevel.forEach((node, index) => {
      node.position = {
        x: xOffset + index * (NODE_WIDTH + HORIZONTAL_SPACING),
        y: level * (NODE_HEIGHT + VERTICAL_SPACING),
      };
    });
  });

  return { nodes: layoutedNodes, edges };
};
