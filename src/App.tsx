import React, { useCallback, useEffect, useRef, useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import ContentGrid from './components/ContentGrid';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const App = () => {

  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [page, setPage] = useState(1);  // State to track the current page
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasMore, setHasMore] = useState(true); // If more data is available to load

  // Fetch data from API
  const fetchData = useCallback(async (page: number) => {
    if (!hasMore || isLoading) return; // Prevent multiple requests
    setIsLoading(true); // Start isLoading

    try {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      const newItems = response.data.page['content-items'].content;

      if (newItems.length > 0) {
        setFetchedData((prevData) => [...prevData, ...newItems]); // Append new data to current data
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false); // Stop isLoading
  }, [hasMore, isLoading]);

  // Load initial page (page 1)
  useEffect(() => {
    fetchData(1); // Load first page on component mount
  }, [fetchData]);

  // Load more data when scrolling reaches the bottom of the page
  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return; // Prevent load if already isLoading or no more data

    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight - 100; // Add some offset for better detection

    if (scrollPosition >= bottomPosition) {
      setPage((prevPage) => prevPage + 1); // Load next page
    }
  }, [isLoading, hasMore]);

  // Fetch next page of data when `page` changes
  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page, fetchData]);

  // Attach scroll event listener
  useEffect(() => {
    const throttledHandleScroll = () => {
      handleScroll();
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll); // Clean up event listener on unmount
  }, [handleScroll]);

  return (
    <>
      <GlobalStyle />
      <div style={{ padding: '10px' }}>
        <SearchBar data={fetchedData} setFilteredData={setFilteredData} />
        <ContentGrid data={filteredData.length ? filteredData : fetchedData} 
        handleScroll={handleScroll}
        isLoading={isLoading}
        containerRef={containerRef}/>
      </div>
    </>
  );
};

export default App;
