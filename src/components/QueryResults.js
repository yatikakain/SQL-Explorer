import React, { useState } from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  overflow-x: auto;
  padding: 1rem;
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid var(--border-color);
    padding: 0.75rem;
    text-align: left;
    white-space: nowrap;
  }

  th {
    background-color: var(--bg-primary);
    font-weight: bold;
    position: sticky;
    top: 0;
  }

  tr:nth-child(even) {
    background-color: var(--bg-primary);
  }

  tr:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background-color: var(--bg-primary);
    cursor: pointer;
    transition: background 0.3s;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

const QueryResults = ({ results }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!results || results.length === 0) {
    return (
      <EmptyState>
        No results to display. Run a query to see results.
      </EmptyState>
    );
  }

  // Get column headers
  const columns = Object.keys(results[0]);

  // Pagination logic
  const totalPages = Math.ceil(results.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + rowsPerPage);

  return (
    <ResultsContainer>
      <ResultsTable>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedResults.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </ResultsTable>

      <PaginationControls>
        <button style={{"color":"var(--text-primary)"}} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button style={{"color":"var(--text-primary)"}} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </PaginationControls>
    </ResultsContainer>
  );
};

export default QueryResults;
