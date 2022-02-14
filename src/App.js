import styled from 'styled-components';
import useFetch from './hooks/useFetch.js';
import Searchbar from './Searchbar';
import Shoppinglist from './Shoppinglist';
import useLocalStorage from './hooks/useLocalStorage.js';

export default function App() {
  const [items] = useFetch();

  const [activeItems, updateActiveItems] = useLocalStorage('activeItems', []);

  return (
    <AppContainer>
      <header>SHOPPING LIST</header>
      <Shoppinglist
        updateActiveItems={updateActiveItems}
        activeItems={activeItems}
      />
      <Searchbar
        items={items}
        activeItems={activeItems}
        updateActiveItems={updateActiveItems}
      />
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
    text-align: center;
  }
`;
