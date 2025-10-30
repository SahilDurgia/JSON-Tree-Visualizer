import type{ Node, Edge } from 'reactflow';

export interface CustomNodeData {
  label: string;
  value: any;
  path: string;
  type: 'object' | 'array' | 'primitive';
}

export type FlowNode = Node<CustomNodeData>;
export type FlowEdge = Edge;
