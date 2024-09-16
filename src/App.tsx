import React, { useState } from 'react';
import GlobalStyle from './styles/GlobalStyle';
import ContentGrid from './components/ContentGrid';
import SearchBar from './components/SearchBar';

const App = () => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  return (
    <>
      <GlobalStyle />
      <div style={{ padding: '10px' }}>
        <SearchBar data={data} setFilteredData={setFilteredData} />
        <ContentGrid data={filteredData.length ? filteredData : data} />
      </div>
    </>
  );
};

export default App;
