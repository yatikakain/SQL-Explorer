import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: var(--bg-secondary);
  border-radius: 8px;
  width: 600px;
  max-height: 500px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-primary);
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: var(--text-primary);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const HistoryList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: ${({ active }) => (active ? "var(--bg-primary)" : "inherit")};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--bg-primary);
  }
`;

const QueryText = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9rem;
  color: var(--text-primary);
`;

const ActionButton = styled.button`
  background-color: var(--button-bg);
  color: var(--text-primary);
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--button-hover);
  }
`;

const ClearButton = styled(ActionButton)`
  background-color: #ff4d4d;
  color: white;

  &:hover {
    background-color: #e04343;
  }
`;

const QueryHistory = ({ history, onClose, onClear, onRestoreQuery }) => {
  return (
    <ModalOverlay onClick={onClose} role="dialog" aria-modal="true">
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Query History</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close">&times;</CloseButton>
        </ModalHeader>
        
        <HistoryList>
          {history.length > 0 ? (
            history.map(({ id, query, timestamp }) => (
              <HistoryItem key={id}>
                <div>
                  <QueryText>{query}</QueryText>
                  <small>{timestamp}</small>
                </div>
                <ActionButton onClick={() => onRestoreQuery({ id, query, timestamp })}>
                  Restore
                </ActionButton>
              </HistoryItem>
            ))
          ) : (
            <HistoryItem>No recent queries</HistoryItem>
          )}
        </HistoryList>
        
        {history.length > 0 && (
          <ModalHeader>
            <ClearButton onClick={onClear}>Clear History</ClearButton>
          </ModalHeader>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

export default QueryHistory;
