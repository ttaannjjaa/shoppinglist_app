//import './App.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

export default function App() {
  const [items, updateItems] = useImmer([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const response = await fetch(
        'https://fetch-me.vercel.app/api/shopping/items'
      );
      const results = await response.json();
      updateItems(results.data);
    } catch (error) {
      setHasError(true);
    }
  }
  return (
    <AppContainer>
      <header>SHOPPING LIST</header>
    </AppContainer>
  );
}

const AppContainer = styled.main`
  display: grid;
  gap: 20px;
  padding: 10px;
  justify-content: center;

  header {
    font-size: 1.5rem;
  }
`;
