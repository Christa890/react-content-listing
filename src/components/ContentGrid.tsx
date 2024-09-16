import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Lazy load the ContentItem component
const ContentItem = React.lazy(() => import('./ContentItem'));

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  overflow-y: auto;
  scrollbar-width: none; // No visible scrollbars
`;

const LoadingMessage = styled.div`
  color: white;
  text-align: center;
`;

interface ContentGridProps {
  data: any[];  // Ensure you accept the data prop as an array of items
}

const ContentGrid: React.FC<ContentGridProps> = ({ data }) => {
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [page, setPage] = useState(1);  // State to track the current page
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to fetch data from the API
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);  // Start loading
      const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      const newContent = response.data.page['content-items']['content'];
      setFetchedData((prevData) => [...prevData, ...newContent]);  // Append new data to existing data
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setIsLoading(false);  // Stop loading
    }
  }, [page]);

  // Fetch data when the component mounts or page changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle scroll event to trigger fetching more data
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
        setPage((prevPage) => prevPage + 1);  // Increase page number to load more data
      }
    }
  }, [isLoading]);

  return (
    <GridContainer ref={containerRef} onScroll={handleScroll}>
      {fetchedData.map((item, index) => (
        <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>} key={index}>
          <ContentItem item={item} />
        </Suspense>
      ))}
      {isLoading && <LoadingMessage>Loading more...</LoadingMessage>}
    </GridContainer>
  );
};

export default ContentGrid;


