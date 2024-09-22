// context/AppContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Define the type for the context state
interface AppState {
  filteredData: any[];
  fetchedData: any[];
  page: number;
  title: string;
  isLoading: boolean;
  totalPages: number;
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchData: (page: number) => Promise<void>;
}

// Create the context with an initial empty state
const AppContext = createContext<AppState | undefined>(undefined);

// Create a provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const totalPages = 3; // Assuming a known total number of pages

  // Fetch data function
  const fetchData = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      setTitle(response.data.page['title']);
      const newItems = response.data.page['content-items'].content;
      setFetchedData(newItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData(page); // Fetch data when the page changes
  }, [page, fetchData]);

  return (
    <AppContext.Provider
      value={{ filteredData, fetchedData, page, title, isLoading, totalPages, setFilteredData, setPage, fetchData }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
