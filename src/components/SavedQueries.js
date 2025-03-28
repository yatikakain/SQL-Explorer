import React, { useState } from 'react';
import styled from 'styled-components';
import { Star, Trash2 } from 'lucide-react';

const SidebarContainer = styled.div`
  background-color: #2d2d2d;
  border-radius: 8px;
  padding: 1rem;
`;

const QueryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.active ? '#4a90e2' : '#383838'};
  color: #e0e0e0;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.active ? '#357abd' : '#4d4d4d'};
  }
`;

const QueryName = styled.span`
  font-size: 0.9rem;
  flex-grow: 1;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? 'white' : '#9d9d9d'};
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;

const SavedQueries = ({ 
  queries = [], 
  activeQueryId = null, 
  onSelectQuery,
  onDeleteQuery 
}) => {
  const [starred, setStarred] = useState([]);

  const toggleStar = (queryId) => {
    setStarred(prev => 
      prev.includes(queryId) 
        ? prev.filter(id => id !== queryId)
        : [...prev, queryId]
    );
  };

  return (
    <SidebarContainer>
      {queries.map(query => (
        <QueryItem 
          key={query.id}
          active={query.id === activeQueryId}
          onClick={() => onSelectQuery(query)}
        >
          <QueryName>{query.name}</QueryName>
          <div>
            <IconButton
              active={starred.includes(query.id)}
              onClick={(e) => {
                e.stopPropagation();
                toggleStar(query.id);
              }}
            >
              <Star 
                size={16} 
                fill={starred.includes(query.id) ? 'yellow' : 'none'}
              />
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
    </SidebarContainer>
  );
};

export default SavedQueries;