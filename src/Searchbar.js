import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useState } from 'react';

export default function Searchbar({ items }) {
  const [searchResults, updateSearchResults] = useImmer([]);
  const [userInput, setUserInput] = useState('');

  return (
    <SearchContainer>
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
        {!searchResults && userInput.length > 0 ? (
          <p>We could not find what you are looking for.</p>
        ) : (
          searchResults.map(searchResult => (
            <ListItem key={searchResult.id}>{searchResult.name.de}</ListItem>
          ))
        )}
      </ListContainer>
    </SearchContainer>
  );

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

  function getSearchResults(event) {
    const input = event.target.value.trim().toLowerCase();
    setUserInput(input);
    updateSearchResults(
      items.filter(item => item.name.de.toLowerCase().includes(input))
    );
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

const ListItem = styled.li`
  border: 1px solid black;
  padding: 4px;
  margin: 2px;
  width: max-content;
  border-radius: 10px;
  background-color: papayawhip;
`;
