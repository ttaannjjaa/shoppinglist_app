import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useState, useEffect } from 'react';

export default function Searchbar({ items }) {
  const [searchResults, updateSearchResults] = useImmer([]);
  const [userInput, setUserInput] = useState('');

  const itemNames = items.map(item => item.name.de);
  const { Searcher } = require('fast-fuzzy');
  const searcher = new Searcher(itemNames, { ignoreCase: true });

  const [activeItems, updateActiveItems] = useImmer(
    loadFromLocal('activeItems') ?? []
  );

  useEffect(() => {
    saveToLocal('activeItems', activeItems);
  }, [activeItems]);

  return (
    <SearchContainer>
      <ShoppingListContainer>
        {activeItems.map((activeItem, toremoveItem) => (
          <ShoppingItem
            key={activeItem}
            activeItem={activeItem}
            toremoveItem={toremoveItem}
            onClick={removeFromActiveItems}
          >
            {activeItem}
          </ShoppingItem>
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
        {userInput.length > 0 &&
          searchResults.map((searchResult, index) => (
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
      {userInput.length > 0 && searchResults.length === 0 && (
        <p>
          We could not find what you are looking for. For that we are truly
          sorry
        </p>
      )}
    </SearchContainer>
  );

  function getSearchResults(event) {
    const input = event.target.value.trim().toLowerCase();
    setUserInput(input);
    updateSearchResults(
      searcher.search(userInput).filter(item => !activeItems.includes(item))
    );
  }

  function addToActiveItems(event) {
    event.stopPropagation();
    event.preventDefault();
    const item = event.target.value;
    updateActiveItems([...activeItems, item]);
    setUserInput('');
    updateSearchResults([]);
  }

  function removeFromActiveItems(event) {
    event.stopPropagation();
    event.preventDefault();
    const toremoveItem = event.target.innerText;
    const indexOfToRemoveItem = activeItems.indexOf(toremoveItem);
    updateActiveItems([
      ...activeItems.slice(0, indexOfToRemoveItem),
      ...activeItems.slice(indexOfToRemoveItem + 1),
    ]);
  }

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

const ShoppingItem = styled.button`
  border: 1px solid black;
  padding: 4px;
  margin: 2px;
  width: max-content;
  border-radius: 10px;
  background-color: lightblue;
`;
