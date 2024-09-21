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
  handleScroll: ()=>void,
  isLoading:boolean,
  containerRef:React.RefObject<HTMLDivElement>
}

const ContentGrid: React.FC<ContentGridProps> = ({ data ,handleScroll,isLoading,containerRef}) => {
  console.log(data)


  return (
    <GridContainer ref={containerRef} onScroll={handleScroll}>
      {data.map((item, index) => (
        <Suspense fallback={<LoadingMessage>Loading...</LoadingMessage>} key={index}>
          <ContentItem item={item} />
        </Suspense>
      ))}
      {isLoading && <LoadingMessage>Loading more...</LoadingMessage>}
    </GridContainer>
  );
};

export default ContentGrid;


