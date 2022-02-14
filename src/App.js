import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import Searchbar from './Searchbar';
import ShoppingList from './ShoppingList';

export default function App() {
  const [items, updateItems] = useImmer([]);
  const [hasError, setHasError] = useState(false);

  const [activeItems, updateActiveItems] = useImmer(
    loadFromLocal('activeItems') ?? []
  );

  useEffect(() => {
    saveToLocal('activeItems', activeItems);
  }, [activeItems]);

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
      console.log(hasError);
    }
  }
  return (
    <AppContainer>
      <header>SHOPPING LIST</header>
      <ShoppingList
        activeItems={activeItems}
        updateActiveItems={updateActiveItems}
      />
      <Searchbar
        activeItems={activeItems}
        updateActiveItems={updateActiveItems}
        items={items}
      />
    </AppContainer>
  );

  function loadFromLocal(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      console.log(error);
    }
  }

  function saveToLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

const AppContainer = styled.main`
  display: grid;
  gap: 20px;
  padding: 10px;
  justify-content: center;

  header {
    font-size: 1.5rem;
    text-align: center;
  }
`;
