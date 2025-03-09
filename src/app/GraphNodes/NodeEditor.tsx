import React, { useCallback, useState } from 'react';
import {ReactFlow, ReactFlowProvider, useNodesState, useEdgesState, addEdge, Background, Controls, Edge, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {CustomNode, NodeType} from './CustomNode';

const nodeTypes = { customNode: CustomNode };

import { Node } from '@xyflow/react';


interface NodeEditorProps {
   selectedNode: Node;
   handleLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   handleTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
   handleParamChange: (paramName:string, paramValue:number|string) => void;
   deleteNode: () => void;
}

const getNodeEditorStyles = () => ({
   position: 'absolute',
   right: '1%',//10,
   top: '10%',//50,
   padding: '10px',
   backgroundColor: '#f9f9f9',
   border: '2px solid #ccc',
   borderRadius: '8px',
   boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
   width: '200px',
});

const getInputStyles = () => ({
   width: '100%',
   marginBottom: '10px',
   border: '2px solid black',
   padding: '5px',
   borderRadius: '4px'
});

const getButtonStyles = () => ({
   width: '100%',
   padding: '10px',
   backgroundColor: '#FF5733',
   color: 'white',
   border: 'none',
   cursor: 'pointer',
   borderRadius: '5px',
});

const NODE_PARAMS: Record<string, { paramName: string; type: string }[]> = {
   fire: [{ paramName: "Temperature", type: "number" }, { paramName: "Intensity", type: "number" }],
   water: [{ paramName: "Amount", type: "number" }, { paramName: "FlowRate", type: "number" }],
   grass: [{ paramName: "Growth", type: "number" }, { paramName: "Health", type: "number" }]
};

const NodeEditor: React.FC<NodeEditorProps> = ({ selectedNode, handleLabelChange, handleTypeChange, handleParamChange, deleteNode }) => {
   const renderParamInputs = () => {
      const params = NODE_PARAMS[selectedNode.data.type] || [];
      return params.map(({ paramName, type }) => (
         <div key={paramName}>
            <label>{paramName}: </label>
            <input
            type={type}
            value={selectedNode.data?.[paramName] || ""}
            onChange={(e) => handleParamChange(paramName, type === "number" ? Number(e.target.value) : e.target.value)}
            style={getInputStyles()}
            />
         </div>
      ));
   };

   return (
   <div style={getNodeEditorStyles()}>
      <div style={{ marginBottom: "15px", fontWeight: "bold" }}>Edit Node</div>

      {/* LABEL */}
      <div>
         <label>Label: </label>
         <input
         type="text"
         value={selectedNode.data.label}
         onChange={handleLabelChange}
         style={getInputStyles()}
         />
      </div>

      {/* TYPE */}
      <div>
         <label>Type: </label>
         <select value={selectedNode.data.type} onChange={handleTypeChange} style={getInputStyles()}>
         {Object.keys(NODE_PARAMS).map((type) => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
         ))}
         </select>
      </div>

      {/* PARAMETER (Typeごとに変化) */}
      {renderParamInputs()}

      {/* DELETE */}
      <button onClick={deleteNode} style={getButtonStyles()}>
         Delete Node
      </button>
   </div>
   );
};



export default NodeEditor;