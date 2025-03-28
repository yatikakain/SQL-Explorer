// import React, { useState } from 'react';
// import { Controlled as CodeMirror } from 'react-codemirror2';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/mode/sql/sql';


// const QueryEditor = ({ initialQuery, onExecute }) => {
//   const [query, setQuery] = useState(initialQuery);

//   const handleExecute = () => {
//     onExecute(query);
//   };

//   return (
//     <div className="query-editor">
//       <CodeMirror
//         value={query}
//         options={{
//           mode: 'sql',
//           theme: 'material',
//           lineNumbers: true
//         }}
//         onBeforeChange={(editor, data, value) => {
//           setQuery(value);
//         }}
//       />
//       <button 
//         onClick={handleExecute} 
//         className="execute-button"
//       >
//         Execute Query
//       </button>
//     </div>
//   );
// };

// export default QueryEditor;

// import React, { useState } from 'react';
// import CodeMirror from '@uiw/react-codemirror';
// import { sql } from '@codemirror/lang-sql';
// import { oneDark } from '@codemirror/theme-one-dark';

// const QueryEditor = ({ initialQuery, onExecute }) => {
//   const [query, setQuery] = useState(initialQuery || '');

//   const handleExecute = () => {
//     onExecute(query);
//   };
//   const handleCopyQuery = () => {
//     navigator.clipboard.writeText(query)
//       .then(() => {
//         alert('Query copied to clipboard');
//       })
//       .catch(err => {
//         console.error('Failed to copy query: ', err);
//       });
//   };

//   const handleDownloadQuery = () => {
//     const blob = new Blob([query], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'query.sql';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="query-editor">
//       <CodeMirror
//         value={query}
//         height="200px"
//         theme={oneDark}
//         extensions={[sql()]}
//         onChange={(value) => {
//           setQuery(value);
//         }}
//       />
//       <button 
//         onClick={handleExecute} 
//         className="execute-button"
//       >
//         Execute Query
//       </button>
//     </div>
//   );
// };

// export default QueryEditor;

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import QueryActions from './QueryActions';

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SqlTextarea = styled.textarea`
  width: 100%;
  min-height: ${props => props.expanded ? '500px' : '200px'};
  max-height: ${props => props.expanded ? '800px' : '200px'};
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  padding: 1rem;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  resize: ${props => props.expanded ? 'vertical' : 'none'};
  transition: min-height 0.3s ease, max-height 0.3s ease;
  line-height: 1.5;
`;

const RunQueryButton = styled.button`
  background-color: var(--button-bg);
  color: var(--text-primary);
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--button-hover);
  }
`;

const QueryEditor = ({ 
  initialQuery, 
  onExecute, 
  results = [], 
  onShowHistory 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [expanded, setExpanded] = useState(false);
  const textareaRef = useRef(null);

  const handleExecute = () => {
    onExecute(query);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <EditorContainer>
      <SqlTextarea
        ref={textareaRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        expanded={expanded}
        placeholder="Enter your SQL query here..."
      />
      <QueryActions 
        results={results}
        onExpand={toggleExpand}
        onShowHistory={onShowHistory}
      />
      <RunQueryButton onClick={handleExecute}>
        Run Query
      </RunQueryButton>
    </EditorContainer>
  );
};

export default QueryEditor;