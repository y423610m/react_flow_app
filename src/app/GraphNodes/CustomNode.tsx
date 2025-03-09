import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FaFire, FaTint, FaLeaf } from 'react-icons/fa';

type NodeType = 'fire' | 'water' | 'grass';

interface CustomNodeData {
  label: string;
  type: NodeType;
}

const typeStyles: Record<NodeType, React.CSSProperties> = {
  fire:  { backgroundColor: '#ff5733' }, // 赤系の色
  water: { backgroundColor: '#3498db' }, // 青系の色
  grass: { backgroundColor: '#2ecc71' }, // 緑系の色
};

const typeIcons: Record<NodeType, JSX.Element> = {
  fire: <FaFire size={20} color="white" />,
  water: <FaTint size={20} color="white" />,
  grass: <FaLeaf size={20} color="white" />,
};

const typeNames: Record<NodeType, string> = {
  fire: 'Fire',
  water: 'Water',
  grass: 'Grass',
};

const DEFAULT_HANDLE_STYLE = {
  width: 10,
  height: 10,
  bottom: -5,
};

export const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  return (
    <div style={{
      padding: 10,
      color: 'white',
      width: 100,
      minHeight: 60,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      backgroundColor: 'gray',
      borderRadius: '10px',
      ...typeStyles[data.type]
    }}>
      <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: '6px' }}>
        {data.label}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {typeIcons[data.type]}
        <span style={{ fontSize: 12 }}>{typeNames[data.type]}</span>
      </div>

      <Handle type="target" position={Position.Left} id="target" style={{ ...DEFAULT_HANDLE_STYLE, top: '50%', background: 'gray' }} />

      <Handle type="source" position={Position.Right} id="sourceTop" style={{ ...DEFAULT_HANDLE_STYLE, top: '10%', background: 'green' }} />
      <Handle type="source" position={Position.Right} id="sourceBottom" style={{ ...DEFAULT_HANDLE_STYLE, top: '90%', background: 'red' }} />

    </div>
  );
};


export const NodeCreator: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);

  const addNode = (type: string) => {
    const newNode = {
      id: `node-${Date.now()}`, // 新しいノードのID
      data: { label: type.charAt(0).toUpperCase() + type.slice(1), type }, // ラベルとタイプ
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // ランダムな位置
    };
    setNodes((prevNodes) => [...prevNodes, newNode]); // 新しいノードを追加
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: 10, top: '50%' }}>
      {/* Fire, Water, Grass ボタン */}
      {nodeTypes.map((type) => (
        <button 
          key={type} 
          onClick={() => addNode(type)} 
          style={{ margin: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} Node
        </button>
      ))}
    </div>
  );
};
