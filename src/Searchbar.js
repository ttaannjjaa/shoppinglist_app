import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useState } from 'react';

export default function Searchbar({ items }) {
  const [searchResults, updateSearchResults] = useImmer([]);
  const [userInput, setUserInput] = useState('');
  const [activeItems, updateActiveItems] = useImmer([]);

  const itemNames = items.map(item => item.name.de);

  return (
    <SearchContainer>
      <ShoppingListContainer>
        {activeItems.map((activeItem, index) => (
          <ShoppingItem key={index}>{activeItem}</ShoppingItem>
        ))}
      </ShoppingListContainer>
      <label htmlFor="searchfield" name="searchfield">
        What do you want to buy?
      </label>
      <input
        id="searchfield"
        name="searchfield"
        type="search"
        placeholder="Search..."
        onChange={getSearchResults}
        value={userInput}
      ></input>
      <ListContainer>
        {searchResults.map((searchResult, index) => (
          <ListItem
            onClick={addToActiveItems}
            key={index}
            searchResult={searchResult}
            value={searchResult}
          >
            {searchResult}
          </ListItem>
        ))}
      </ListContainer>
    </SearchContainer>
  );

  function getSearchResults(event) {
    const input = event.target.value.trim().toLowerCase();
    setUserInput(input);
    updateSearchResults(
      itemNames.filter(item => item.toLowerCase().includes(input))
    );
  }

  function addToActiveItems(event) {
    event.stopPropagation();
    event.preventDefault();
    const item = event.target.value;
    updateActiveItems([...activeItems, item]);
  }
}

const SearchContainer = styled.form`
  display: grid;
  gap: 10px;

  input {
    padding: 2px;
    text-align: center;
  }
`;

const ListContainer = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
`;

const ListItem = styled.button`
  border: 1px solid black;
  padding: 4px;
  margin: 2px;
  width: max-content;
  border-radius: 10px;
  background-color: papayawhip;
`;

const ShoppingListContainer = styled.ul`
  display: flex;
  list-style: none;
  flex-wrap: wrap;
`;

const ShoppingItem = styled.li`
  border: 1px solid black;
  padding: 4px;
  margin: 2px;
  width: max-content;
  border-radius: 10px;
  background-color: papayawhip;
`;

// function getSearchResults(event) {
//   const userInput = event.target.value.trim().toLowerCase();
//   const rawResults = items.filter(item =>
//     item.name.de.toLowerCase().includes(userInput)
//   );
//   updateSearchResults(
//     !event.target.value && rawResults === []
//       ? { name: { de: 'We could not find what you are looking for.' } }
//       : rawResults
//   );

//onClick={removeFromActiveItems}
