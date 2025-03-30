import React, { useState } from 'react';
import styled from 'styled-components';

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--button-bg);
  color: var(--text-primary);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--button-hover);
  }

  i {
    margin-right: 0.3rem;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  width: 250px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  color: var(--text-primary);
`;

const QueryActions = ({ 
  results, 
  onCopy, 
  onDownload, 
  onExpand, 
  onShowHistory,
  onFilterResults 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState(results);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Basic search across all results
    const filtered = results.filter(row => 
      Object.values(row).some(
        value => String(value).toLowerCase().includes(term)
      )
    );
    onFilterResults(filtered);
  };

  const handleDownload = () => {
    // Create CSV file
    const csvContent = [
      Object.keys(results[0] || {}).join(','),
      ...results.map(row => 
        Object.values(row).map(val => 
          `"${String(val).replace(/"/g, '""')}"`
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'query_results.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ActionContainer>
      <ActionGroup>
        <ActionButton onClick={handleDownload}>
          <i className="fas fa-download"></i> Export CSV
        </ActionButton>
        <ActionButton onClick={onShowHistory}>
          <i className="fas fa-history"></i> History
        </ActionButton>

      </ActionGroup>
      <SearchInput 
        type="text" 
        placeholder="Search results..." 
        value={searchTerm}
        onChange={handleSearch}
      />
    </ActionContainer>
  );
};

export default QueryActions;