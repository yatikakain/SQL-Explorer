import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Star, Trash2, Plus } from "lucide-react";

const SidebarContainer = styled.div`
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 1rem;
`;

const QueryItem = React.memo(({ query, active, onSelect, onToggleStar, onDelete, isStarred }) => (
  <QueryRow active={active} onClick={() => onSelect(query)}>
    <QueryName>{query.name}</QueryName>
    <IconGroup>
      <IconButton onClick={(e) => { e.stopPropagation(); onToggleStar(query.id); }} aria-label="Star Query">
        <Star size={16} fill={isStarred ? "yellow" : "none"} />
      </IconButton>
      <IconButton onClick={(e) => { e.stopPropagation(); onDelete(query.id); }} aria-label="Delete Query">
        <Trash2 size={16} />
      </IconButton>
    </IconGroup>
  </QueryRow>
));

const QueryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ active }) => (active ? "var(--accent-color)" : "var(--bg-secondary)")};
  color: var(--text-primary);
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#357abd" : "var(--border-color)")};
  }
`;

const QueryName = styled.span`
  font-size: 0.9rem;
  flex-grow: 1;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  opacity: 0.7;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;

  &:hover {
    opacity: 1;
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.3s;

  &:hover {
    background-color: #357abd;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  width: 100%;
  height: 100px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background-color: var(--accent-color);
  color: white;

  &:hover {
    background-color: #357abd;
  }
`;

const CancelButton = styled(Button)`
  background-color: var(--border-color);
  color: var(--text-primary);
`;

const SavedQueries = ({ queries = [], activeQueryId, onSelectQuery, onDeleteQuery, onAddQuery }) => {
  const [starred, setStarred] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuery, setNewQuery] = useState({ name: "", text: "" });

  const toggleStar = useCallback((queryId) => {
    setStarred((prev) => {
      const newStarred = new Set(prev);
      newStarred.has(queryId) ? newStarred.delete(queryId) : newStarred.add(queryId);
      return newStarred;
    });
  }, []);

  const handleAddQuery = useCallback(() => {
    if (newQuery.name.trim() && newQuery.text.trim()) {
      onAddQuery({ id: Date.now(), name: newQuery.name, query: newQuery.text, dataset: "employees" });
      setNewQuery({ name: "", text: "" });
      setIsModalOpen(false);
    }
  }, [newQuery, onAddQuery]);

  const modalContent = useMemo(
    () =>
      isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Add New Query</h3>
            <Input
              type="text"
              placeholder="Query Name"
              value={newQuery.name}
              onChange={(e) => setNewQuery((prev) => ({ ...prev, name: e.target.value }))}
            />
            <TextArea
              placeholder="Enter SQL Query"
              value={newQuery.text}
              onChange={(e) => setNewQuery((prev) => ({ ...prev, text: e.target.value }))}
            />
            <ButtonGroup>
              <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
              <SaveButton onClick={handleAddQuery}>Save</SaveButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      ),
    [isModalOpen, newQuery, handleAddQuery]
  );

  return (
    <>
      <SidebarContainer>
        {queries.map((query) => (
          <QueryItem
            key={query.id}
            query={query}
            active={query.id === activeQueryId}
            onSelect={onSelectQuery}
            onToggleStar={toggleStar}
            onDelete={onDeleteQuery}
            isStarred={starred.has(query.id)}
          />
        ))}
        <AddButton onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Add Query
        </AddButton>
      </SidebarContainer>
      {modalContent}
    </>
  );
};

export default SavedQueries;
