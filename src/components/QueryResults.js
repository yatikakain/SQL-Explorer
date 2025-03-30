import React, { useState, useMemo } from "react";
import styled from "styled-components";

const ResultsContainer = styled.div`
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  overflow-x: auto;
  padding: 1rem;
  border-radius: 8px;
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
    z-index: 1;
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
    color: var(--text-primary);
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    
    &:hover:not(:disabled) {
      background-color: var(--button-hover);
      transform: scale(1.05);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

const QueryResults = ({ results = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Memoized data calculations
  const columns = useMemo(() => (results.length > 0 ? Object.keys(results[0]) : []), [results]);
  const totalPages = useMemo(() => Math.ceil(results.length / rowsPerPage), [results.length]);
  const paginatedResults = useMemo(
    () => results.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
    [results, currentPage, rowsPerPage]
  );

  if (results.length === 0) {
    return <EmptyState>No results to display. Run a query to see results.</EmptyState>;
  }

  return (
    <ResultsContainer>
      <ResultsTable role="table">
        <thead>
          <tr role="row">
            {columns.map((column) => (
              <th key={column} role="columnheader">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedResults.map((row, rowIndex) => (
            <tr key={rowIndex} role="row">
              {columns.map((column) => (
                <td key={column} role="cell">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </ResultsTable>

      {totalPages > 1 && (
        <PaginationControls>
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} aria-disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} aria-disabled={currentPage === totalPages}>
            Next
          </button>
        </PaginationControls>
      )}
    </ResultsContainer>
  );
};

export default QueryResults;
