import React from 'react';


export const BottomBar0: React.FC<{ onSave: () => void }> = ({ onSave }) => {
   return (
      <div style={{
         position: 'fixed',
         bottom: 0,
         left: 0,
         width: '100%',
         backgroundColor: '#333',
         color: 'white',
         padding: '10px',
         display: 'flex',
         justifyContent: 'flex-end',
         boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
         zIndex: 1000,
      }}>
         <button 
         onClick={onSave} 
         style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
         }}
         >
         Download JSON
         </button>
      </div>
   );
};


export const BottomBar: React.FC<{ onSave: () => void, onUpload: (file: File) => void }> = ({ onSave, onUpload }) => {
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
         const file = event.target.files[0];
         onUpload(file); // アップロードされたファイルを処理
      }
   };

   return (
      <div
         style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#333',
            color: 'white',
            padding: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
            boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
            zIndex: 1000,
         }}
      >
         {/* Upload JSON ボタン */}
         <label
            style={{
            backgroundColor: '#FF9800',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            display: 'inline-block',
            }}
         >
            Upload JSON
            <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }} // ボタン自体を非表示にし、ラベルを使ってファイル選択
            />
         </label>

         {/* Download JSON ボタン */}
         <button
            onClick={onSave}
            style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            marginRight: '10px',
            }}
         >
            Download JSON
         </button>
      </div>
   );
};
