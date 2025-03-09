"use client"

import React, { useCallback, useState } from 'react';
import {ReactFlow, ReactFlowProvider, useNodesState, useEdgesState, addEdge, Background, Controls, Edge, MarkerType, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {CustomNode, NodeType} from './CustomNode';
import NodeEditor from './NodeEditor';
import { BottomBar } from './BottomBar';

const nodeTypes = { customNode: CustomNode };

import { Node } from '@xyflow/react';

const initialNodes = [
  { id: '1', type: 'customNode', position: { x: 100, y: 100 }, data: { label: 'Attack Boost', type: 'fire' } },
  { id: '2', type: 'customNode', position: { x: 300, y: 100 }, data: { label: 'Healing', type: 'water' } },
  { id: '3', type: 'customNode', position: { x: 200, y: 250 }, data: { label: 'Regeneration', type: 'grass' } },
];

const initialEdges = [
  {
    "style": {"strokeWidth": 3},
    "source": '1',
    "sourceHandle": "sourceTop",
    "target": '2',
    "targetHandle": "target",
    "markerEnd": {"type": "arrowclosed"},
    "id": `xy-edge__1sourceTop-2target`
  }
];

const NodeCreator: React.FC<{ addNode: (type: string) => void }> = ({ addNode }) => {
  const nodeTypes = [
    'fire', 'water', 'grass', 'thunder', 'land', 'rock',
  ]; // ノードのタイプ

  return (
    <div style={{
      position: 'absolute', 
      left: 10, 
      top: '10%', 
      padding: '10px', 
      backgroundColor: '#f0f0f0', 
      border: '2px solid #ccc', 
      borderRadius: '8px', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
    }}>
      <div style={{ marginBottom: '15px', fontSize: '16px', fontWeight: 'bold' }}>
        Node Types
      </div>
      {/* Fire, Water, Grass ボタン */}
      {nodeTypes.map((type) => (
        <button 
          key={type} 
          onClick={() => addNode(type)} 
          style={{
            margin: '10px 0', 
            padding: '10px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            borderRadius: '5px',
            width: '120px',
          }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} Node
        </button>
      ))}
    </div>
  );
};

const Flow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const typeOptions: NodeType[] = ['fire', 'water', 'grass'];
  const sourceEdgeMap = new Map<string, string>();
  const [nodeCnt, setNodeCnt] = useState<number>(0); 
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);  // 現在選択されているノード

  // const onNodeClick = (_: React.MouseEvent, node: Node<CustomNodeData>) => {
  //   const newType = prompt('Enter type (fire, water, grass):') as NodeType;
  //   if (newType && ['fire', 'water', 'grass'].includes(newType)) {
  //     changeNodeType(node.id, newType);
  //   }
  // };
  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node); // ノードを選択
  };

  const deleteNode = () => {
    if (selectedNode) {
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== selectedNode.id));
      setSelectedNode(null); // 削除後に選択解除
    }
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNode) {
      const updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          label: event.target.value,
        },
      };

      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: event.target.value } }
            : node
        )
      );

      setSelectedNode(updatedNode);
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedNode) {
      const updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          type: event.target.value
        },
      };

      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, type: event.target.value } }
            : node
        )
      );

      setSelectedNode(updatedNode);
    }
  };

  const handleParamChange = (paramName:string, paramValue:number|string) => {
    if (selectedNode) {
      const updatedNode = {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          [paramName]: paramValue,
        },
      };

      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, [paramName]: paramValue } }
            : node
        )
      );

      setSelectedNode(updatedNode);
    }
  };

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const sourceId = `${params.source}-${params.sourceHandle}`;

      setEdges((eds) => {
        // 同じ `sourceHandle` からの古いエッジを削除
        const filteredEdges = eds.filter((e) => e.source !== params.source || e.sourceHandle !== params.sourceHandle);
        const newEdge = {...params, markerEnd: {type: MarkerType.ArrowClosed}};
        return addEdge(newEdge, filteredEdges);
      });
    },
    [setEdges]
  );

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));

      // source のエッジカウントを減らす
      const sourceId = `${edge.source}-${edge.sourceHandle}`;
      sourceEdgeCount.set(sourceId, 0);
    },
    [setEdges]
  );

  const defaultEdgeOptions = {
    style: { strokeWidth: 3 }, // 太さを3pxに設定
  };

  const addNode = (type: string) => {
    console.log(type);
  // { id: '1', type: 'customNode', position: { x: 100, y: 100 }, data: { label: 'Attack Boost', type: 'fire' } },

    const newNode = {
      id: `node-${Date.now()}`, // 新しいノードのID
      type: 'customNode',
      data: { label: `node-${nodeCnt}`, type:type }, // ラベルとタイプ
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // ランダムな位置
    };
    setNodeCnt(nodeCnt+1);
    setNodes((prevNodes) => [...prevNodes, newNode]); // 新しいノードを追加
  };

  const saveNodesAndEdges = () => {
    const formattedData = {
      nodes: nodes.map(node => ({ _meta_: node })),
    };

    let newNodes = nodes.map(node => ({ ...node })); // 元の nodes をコピー

    for (const edge of edges) {
      const targetKey = edge.sourceHandle === "sourceTop" ? "targetTop" : "targetBottom";
      const targetIndex = nodes.findIndex(n => n.id === edge.target);
      newNodes = newNodes.map(node =>
        node.id === edge.source ? { ...node, data: {...node.data, [targetKey]: targetIndex} } : node
      );
    }

    newNodes = newNodes.map(node => {
      const { data, ...__meta__ } = node;
      return { ...data, __meta__: __meta__ };
    });

    const data = JSON.stringify({newNodes:newNodes, edges}, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(111111111)
      console.log(e.target.result)
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        console.log(jsonData)
        // jsonData の形式が nodes と edges を含んでいることを確認して復元
        if (jsonData.newNodes) {
          let newNodes = jsonData.newNodes;
          let newEdges = [];
          newNodes = newNodes.map(node => {
            const { __meta__, ...data } = node;
            return { ...__meta__, data: data };
          });
          console.log(newNodes);
          // TODO assign unique id
          newNodes = newNodes.map(node => {
            if(node.data.targetTop) {
              newEdges.push(
                {
                  "style": {
                    "strokeWidth": 3
                  },
                  "source": node.id,
                  "sourceHandle": "sourceTop",
                  "target": newNodes[node.data.targetTop].id,
                  "targetHandle": "target",
                  "markerEnd": {
                    "type": "arrowclosed"
                  },
                  "id": `xy-edge__${node.id}sourceTop-${node.targetTop}target`
                }
              )
            }
            if(node.data.targetBottom) {
              newEdges.push(
                {
                  "style": {
                    "strokeWidth": 3
                  },
                  "source": node.id,
                  "sourceHandle": "sourceBottom",
                  "target": newNodes[node.data.targetBottom].id,
                  "targetHandle": "target",
                  "markerEnd": {
                    "type": "arrowclosed"
                  },
                  "id": `xy-edge__${node.id}sourceTop-${node.targetBottom}target`
                }
              )
            }
            return node;
          });
          console.log(newNodes);
          console.log(newEdges);
          setNodes(newNodes);
          setEdges(newEdges);
        } else {
          alert('Invalid JSON format');
        }
      } catch (error) {
        alert('Error reading JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          // onEdgeContextMenu={onEdgeContextMenu}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
        >
        <Background />
        <Controls />
        </ReactFlow>

        <NodeCreator addNode={addNode} />

        {selectedNode && (
          <NodeEditor 
            selectedNode={selectedNode}
            handleLabelChange={handleLabelChange}
            handleTypeChange={handleTypeChange}
            handleParamChange={handleParamChange}
            deleteNode={deleteNode}
          />
        )}

        <BottomBar onSave={saveNodesAndEdges} onUpload={handleUpload} />

      </div>
    </ReactFlowProvider>
  );
};

export default Flow;
