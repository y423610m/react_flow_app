import { Node } from '@xyflow/react';
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react'
import { Handle, Position, NodeProps } from '@xyflow/react';

type NodeType = 'fire' | 'water' | 'grass';

interface CustomNodeData {
  label: string;
  type: NodeType;
}

const initialNodes: Node<CustomNodeData>[] = [
  { id: '1', type: 'customNode', position: { x: 100, y: 100 }, data: { label: 'Fire', type: 'fire' } },
  { id: '2', type: 'customNode', position: { x: 300, y: 100 }, data: { label: 'Water', type: 'water' } },
];


const typeStyles: Record<NodeType, React.CSSProperties> = {
  fire: { backgroundColor: 'red', borderRadius: '50%' },
  water: { backgroundColor: 'blue', borderRadius: '10%' },
  grass: { backgroundColor: 'green', borderRadius: '30%' },
};

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  return (
    <div style={{ 
      padding: 10, 
      color: 'white', 
      width: 80, 
      height: 50, 
      textAlign: 'center',
      ...typeStyles[data.type] 
    }}>
      {data.label}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomNode;

import React, { useState } from 'react';
import ReactFlow, { addEdge, Background, Controls, Edge, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';

const nodeTypes = { customNode: CustomNode };

const Flow: React.FC = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onConnect={onConnect}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default Flow;
