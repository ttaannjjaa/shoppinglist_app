import styled from 'styled-components';
import useFetch from './hooks/useFetch.js';
import Shoppinglist from './Shoppinglist';
import useLocalStorage from './hooks/useLocalStorage.js';
import useToggleButton from './hooks/useToggleButton.js';
import SearchDE from './SearchDE.js';
import SearchEN from './SearchEN.js';

export default function App() {
  const [items] = useFetch();
  const [activeLanguage, setActiveLanguage] = useToggleButton();
  const [activeItems, updateActiveItems] = useLocalStorage('activeItems', []);

  return (
    <AppContainer>
      <header> {activeLanguage ? 'Einkaufsliste' : 'ShoppingList'}</header>
      <button onClick={setActiveLanguage}>
        {activeLanguage ? 'Deutsch' : 'English'}
      </button>
      <Shoppinglist
        updateActiveItems={updateActiveItems}
        activeItems={activeItems}
      />
      <section>
        {activeLanguage ? (
          <SearchDE
            items={items}
            activeItems={activeItems}
            updateActiveItems={updateActiveItems}
          />
        ) : (
          <SearchEN
            items={items}
            activeItems={activeItems}
            updateActiveItems={updateActiveItems}
          />
        )}
      </section>
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
