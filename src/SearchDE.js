import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useState } from 'react';

export default function SearchDE({ items, updateActiveItems, activeItems }) {
  const [searchResults, updateSearchResults] = useImmer([]);
  const [userInput, setUserInput] = useState('');

  const itemNamesDE = items.map(item => item.name.de);
  const { Searcher } = require('fast-fuzzy');
  const searcher = new Searcher(itemNamesDE, { ignoreCase: true });

  return (
    <SearchContainer>
      <label htmlFor="searchfield" name="searchfield">
        Was möchtest Du heute an Obst und Gemüse einkaufen?
      </label>
      <input
        id="searchfield"
        name="searchfield"
        type="search"
        placeholder="Suche..."
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
          Gerade findet die Suchfunktion nicht das Gewünschte, tut uns sehr
          leid.
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
}

const SearchContainer = styled.form`
  display: grid;
  gap: 10px;

  input {
    padding: 2px;
    text-align: center;
  }
`;

const ListContainer = styled.section`
  display: flex;
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
