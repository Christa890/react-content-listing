// App.tsx
import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import ContentGrid from './components/ContentGrid';
import SearchBar from './components/SearchBar';
import { useAppContext } from './context/context';

const App = () => {
  const { filteredData, fetchedData, page, isLoading, title, totalPages, setPage } = useAppContext();

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <GlobalStyle />
      <div style={{ padding: '10px' }}>
        <SearchBar data={fetchedData} title={title} />
        <ContentGrid data={filteredData.length ? filteredData : fetchedData} isLoading={isLoading} />
        
        {/* Pagination Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <button 
            onClick={handlePreviousPage}
            disabled={page === 1}
            style={{ padding: '10px', marginRight: '10px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
          >
            Prev
          </button>
          
          <span>Page {page} of {totalPages}</span>
          
          <button 
            onClick={handleNextPage}
            disabled={page === totalPages}
            style={{ padding: '10px', marginLeft: '10px', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next
          </button>
        </div>
        
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default App;
