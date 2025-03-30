import React, { useState, useCallback, useEffect, useMemo, lazy, Suspense } from 'react';
import styled from 'styled-components';
import QueryEditor from './components/QueryEditor';
import QueryResults from './components/QueryResults';
import SavedQueries from './components/SavedQueries';
import ThemeToggle from './components/ThemeToggle';
import QueryActions from './components/QueryActions';
import { sampleQueries } from './data/sampleQueries';
import { sampleDatasets } from './data/sampleDatasets';
import { Database } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { debounce } from 'lodash';

// Lazy Load QueryHistory
const QueryHistory = lazy(() => import('./components/QueryHistory'));

const AppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  background-color: var(--bg-primary);
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.header`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--text-primary);
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function App() {
  const [queries, setQueries] = useState(sampleQueries);
  const [activeQuery, setActiveQuery] = useState(sampleQueries[0]);
  const [queryResults, setQueryResults] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { isDarkMode } = useTheme();

  // Memoized filtered results to prevent unnecessary recalculations
  const filteredResults = useMemo(() => queryResults, [queryResults]);

  // Optimized query execution with debouncing
  const handleExecuteQuery = useCallback(
    debounce((query) => {
      const dataset = sampleDatasets[activeQuery.dataset];
      setQueryResults(dataset);

      setQueryHistory((prev) => 
        [{ id: Date.now(), query, timestamp: new Date().toLocaleString(), results: dataset }, ...prev].slice(0, 10)
      );
    }, 300),
    [activeQuery.dataset]
  );

  // Prevents unnecessary re-renders when selecting the same query
  const handleSelectQuery = useCallback((query) => {
    setActiveQuery((prev) => (prev.id === query.id ? prev : query));
  }, []);

  const handleDeleteQuery = useCallback((queryId) => {
    setQueries((prev) => prev.filter(q => q.id !== queryId));
  }, []);

  const handleClearHistory = useCallback(() => {
    setQueryHistory([]);
  }, []);

  const handleRestoreHistoryQuery = useCallback((historyEntry) => {
    setActiveQuery(prev => ({ ...prev, query: historyEntry.query }));
    setIsHistoryModalOpen(false);
  }, []);

  const handleAddQuery = useCallback((newQuery) => {
    setQueries((prev) => [...prev, newQuery]);
  }, []);

  return (
    <AppContainer>
      <Header>
        <Title>
          <Database size={32} />
          <h1>SQL Query Editor</h1>
        </Title>
        <ThemeToggle />
      </Header>
      
      <SavedQueries 
        queries={queries}
        activeQueryId={activeQuery.id}
        onSelectQuery={handleSelectQuery}
        onDeleteQuery={handleDeleteQuery}
        onAddQuery={handleAddQuery}
      />
      
      <MainContent>
        <QueryEditor 
          key={activeQuery.id}
          initialQuery={activeQuery.query}
          onExecute={handleExecuteQuery}
          onShowHistory={() => setIsHistoryModalOpen(true)}
        />

        {queryResults.length > 0 && (
          <QueryActions
            results={queryResults}
            onShowHistory={() => setIsHistoryModalOpen(true)}
            onFilterResults={setQueryResults}
          />
        )}
        
        <QueryResults results={filteredResults} />

        {isHistoryModalOpen && (
          <Suspense fallback={<div>Loading...</div>}>
            <QueryHistory 
              history={queryHistory}
              onClose={() => setIsHistoryModalOpen(false)}
              onClear={handleClearHistory}
              onRestoreQuery={handleRestoreHistoryQuery}
            />
          </Suspense>
        )}
      </MainContent>
    </AppContainer>
  );
}

export default React.memo(App);
