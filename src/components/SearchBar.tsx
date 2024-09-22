// SearchBar.tsx
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/context';

const SearchContainer = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #171717;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #222;
  color: white;
  margin-right: 10px;
  outline: none;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const SearchBar = ({ data, title }: any) => {
  const { setFilteredData } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
  };

  useMemo(() => {
    const filtered = data.filter((item: any) => item.name.toLowerCase().includes(searchQuery));
    setFilteredData(filtered);
  }, [searchQuery, data, setFilteredData]);

  const handleBack = () => {
    setSearchQuery('');
    setFilteredData([]);
  };

  return (
    <SearchContainer>
      <Button onClick={handleBack}>
        <img src="https://test.create.diagnal.com/images/Back.png" alt="Back" style={{ width: '30px', height: '30px' }} />
      </Button>

      <SearchInput type="text" placeholder={title} value={searchQuery} onChange={handleSearch} />

      <Button>
        <img src="https://test.create.diagnal.com/images/search.png" alt="Search" style={{ width: '30px', height: '30px' }} />
      </Button>
    </SearchContainer>
  );
};

export default SearchBar;
