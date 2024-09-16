import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
`;

const SearchBar = ({ data, setFilteredData }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
  };

  useMemo(() => {
    const filtered = data.filter((item: any) => item.name.toLowerCase().includes(searchQuery));
    setFilteredData(filtered);
  }, [searchQuery, data, setFilteredData]);

  return <SearchInput type="text" placeholder="Search..." value={searchQuery} onChange={handleSearch} />;
};

export default SearchBar;
