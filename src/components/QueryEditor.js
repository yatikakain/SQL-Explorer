import React, { useState } from 'react';
import styled from 'styled-components';
import { FaExpand, FaCompress, FaCopy } from 'react-icons/fa';
import { MdCheck } from 'react-icons/md';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorView } from '@codemirror/view';

const EditorContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-bottom: none;
`;

const RunQueryButton = styled.button`
  background-color: var(--accent-color);
  color: var(--text-primary);
  border: none;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  opacity: 0.7;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.3rem;
  margin-left: 0.5rem;
  
  &:hover {
    color: var(--button-hover);
  }
`;

const QueryEditor = ({ initialQuery, onExecute }) => {
  const [query, setQuery] = useState(initialQuery || '');
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleExecute = () => {
    onExecute(query);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(query).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => console.error('Failed to copy query:', err));
  };

  const customTheme = EditorView.theme({
    '&': {
      backgroundColor: 'var(--bg-primary) !important',
      color: 'var(--text-primary) !important',
      border: '1px solid var(--border-color)',
    },
    '.cm-content': {
      caretColor: 'var(--text-primary)',
    },
    '.cm-gutters': {
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      borderRight: '1px solid var(--border-color)',
    },
    '.cm-activeLine': {
      backgroundColor: 'var(--bg-secondary)',
    },
    '.cm-activeLineGutter': {
      backgroundColor: 'var(--bg-secondary) !important',
      color: 'var(--accent-color) !important',
    },
    '.cm-line': {
      color: 'var(--text-primary)',
    },
  });

  return (
    <EditorContainer>
      <Toolbar>
        <span>SQL Editor</span>
        <div>
          <IconButton onClick={handleCopyQuery}>
            {copied ? <MdCheck /> : <FaCopy />}
          </IconButton>
          <IconButton onClick={toggleExpand}>
            {expanded ? <FaCompress /> : <FaExpand />}
          </IconButton>
        </div>
      </Toolbar>
      <CodeMirror
        value={query}
        height={expanded ? '500px' : '200px'}
        extensions={[sql(), customTheme]}
        onChange={(value) => setQuery(value)}
      />
      <RunQueryButton onClick={handleExecute}>Run Query</RunQueryButton>
    </EditorContainer>
  );
};

export default QueryEditor;
