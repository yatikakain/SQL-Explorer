// import React from 'react';
// import styled from 'styled-components';
// import { Download, FileSpreadsheet } from 'lucide-react';


// const ResultsContainer = styled.div`
//   background-color: #2d2d2d;
//   border-radius: 8px;
//   padding: 1rem;
//   max-height: 400px;
//   overflow-y: auto;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   color: #e0e0e0;
// `;

// const TableHeader = styled.thead`
//   background-color: #3d3d3d;
// `;

// const TableRow = styled.tr`
//   &:nth-child(even) {
//     background-color: #383838;
//   }
// `;

// const TableCell = styled.td`
//   padding: 0.5rem;
//   border: 1px solid #4d4d4d;
// `;

// const ActionBar = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 1rem;
//   gap: 1rem;
// `;

// const Button = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   background-color: #4a90e2;
//   color: white;
//   border: none;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const QueryResults = ({ 
//   results = [], 
//   loading = false, 
//   error = null 
// }) => {
//   const handleExportCSV = () => {
//     // Simple CSV export logic
//     const csvContent = results.map(row => 
//       Object.values(row).join(',')
//     ).join('\n');
    
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'query_results.csv');
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (results.length === 0) return <div>No results</div>;

//   const headers = Object.keys(results[0]);

//   return (
//     <ResultsContainer>
//       <Table>
//         <TableHeader>
//           <tr>
//             {headers.map(header => (
//               <TableCell as="th" key={header}>{header}</TableCell>
//             ))}
//           </tr>
//         </TableHeader>
//         <tbody>
//           {results.map((row, index) => (
//             <TableRow key={index}>
//               {headers.map(header => (
//                 <TableCell key={`${index}-${header}`}>
//                   {row[header]}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </tbody>
//       </Table>
//       <ActionBar>
//         <Button onClick={handleExportCSV}>
//           <FileSpreadsheet size={16} /> Export CSV
//         </Button>
//       </ActionBar>
//     </ResultsContainer>
//   );
// };

// export default QueryResults;

import React from 'react';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  overflow-x: auto;
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

const QueryResults = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <EmptyState>
        No results to display. Run a query to see results.
      </EmptyState>
    );
  }

  // Get column headers
  const columns = Object.keys(results[0]);

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
          {results.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </ResultsTable>
    </ResultsContainer>
  );
};

export default QueryResults;
