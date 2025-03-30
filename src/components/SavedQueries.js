import React, { useState } from "react";
import styled from "styled-components";
import { Star, Trash2, Plus } from "lucide-react";

const SidebarContainer = styled.div`
  background-color: var(--bg-secondary);
  border-radius: 8px;
  padding: 1rem;
`;

const QueryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => (props.active ? "var(--accent-color)" : "var(--bg-secondary)")};
  color: var(--text-primary);
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#357abd" : "var(--border-color)")};
  }
`;

const QueryName = styled.span`
  font-size: 0.9rem;
  flex-grow: 1;
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
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  background-color:var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

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

const SavedQueries = ({ queries = [], activeQueryId = null, onSelectQuery, onDeleteQuery, onAddQuery }) => {
  const [starred, setStarred] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQueryName, setNewQueryName] = useState("");
  const [newQueryText, setNewQueryText] = useState("");

  const toggleStar = (queryId) => {
    setStarred((prev) => (prev.includes(queryId) ? prev.filter((id) => id !== queryId) : [...prev, queryId]));
  };

  const handleAddQuery = () => {
    if (newQueryName.trim() && newQueryText.trim()) {
      onAddQuery({ id: Date.now(), name: newQueryName, query: newQueryText, dataset: 'employees' });
      setNewQueryName("");
      setNewQueryText("");
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <SidebarContainer>
        {queries.map((query) => (
          <QueryItem key={query.id} active={query.id === activeQueryId} onClick={() => onSelectQuery(query)}>
            <QueryName>{query.name}</QueryName>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                active={starred.includes(query.id)}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(query.id);
                }}
              >
                <Star size={16} fill={starred.includes(query.id) ? "yellow" : "none"} />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteQuery(query.id);
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </div>
          </QueryItem>
        ))}
        <AddButton onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Add Query
        </AddButton>
      </SidebarContainer>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Add New Query</h3>
            <Input
              type="text"
              placeholder="Query Name"
              value={newQueryName}
              onChange={(e) => setNewQueryName(e.target.value)}
            />
            <TextArea
              placeholder="Enter SQL Query"
              value={newQueryText}
              onChange={(e) => setNewQueryText(e.target.value)}
            />
            <ButtonGroup>
              <CancelButton onClick={() => setIsModalOpen(false)}>Cancel</CancelButton>
              <SaveButton onClick={handleAddQuery}>Save</SaveButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default SavedQueries;