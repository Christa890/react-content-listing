import React, { useCallback, useEffect, useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import ContentGrid from './components/ContentGrid';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const TOTAL_PAGES = 3; // Assuming we know the total number of pages available

const App = () => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [page, setPage] = useState(1); // State to track the current page
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [title,setTitle]=useState("")
  // Fetch data from API
  const fetchData = useCallback(async (page: number) => {
    setIsLoading(true); // Start isLoading

    try {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      console.log(response)
      setTitle(response.data.page['title']) //set page title
      const newItems = response.data.page['content-items'].content;
      setFetchedData(newItems); // Set current page data
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false); // Stop isLoading
  }, []);

  // Load data for the current page
  useEffect(() => {
    fetchData(page); // Load data whenever the page changes
  }, [page]);

  // Handle next and previous page navigation
  const handleNextPage = () => {
    if (page < TOTAL_PAGES) {
      setPage((prevPage) => prevPage + 1);
    }
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <GlobalStyle />
      <div style={{ padding: '10px' }}>
        <SearchBar data={fetchedData} setFilteredData={setFilteredData} title={title} />
        <ContentGrid
          data={filteredData.length ? filteredData : fetchedData}
          isLoading={isLoading}/>
        
        {/* Pagination Controls */}
        <div style={{ display: 'flex',alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <button 
            onClick={handlePreviousPage}
            disabled={page === 1}
            style={{ padding: '10px', marginRight: '10px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
          >
            Prev
          </button>
          
          <span>Page {page} of {TOTAL_PAGES}</span>
          
          <button 
            onClick={handleNextPage}
            disabled={page === TOTAL_PAGES}
            style={{ padding: '10px', marginLeft: '10px', cursor: page === TOTAL_PAGES ? 'not-allowed' : 'pointer' }}
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
