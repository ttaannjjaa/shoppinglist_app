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
      itemNames
        .filter(item => item.toLowerCase().includes(input))
        .filter(item => !activeItems.includes(item))
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

const Excuse = styled.p`
  color: yellowgreen;

  .hidden {
    display: none;
  }
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

//updateActiveItems(delete activeItems[activeItems.IndexOf(toremoveitem)]);

// updateActiveItems([...activeItems]);
// console.log(activeItems);
//console.log(activeItems.includes(toremoveItem));
//console.log(!activeItems.includes(toremoveItem));
// setRooms([
//   ...rooms.slice(0, index),
//   { ...rooms[index], isClean: !isClean },
//   ...rooms.slice(index + 1),
// ]);

// updateActiveItems(
//   activeItems.filter(activeItem => !indexOfToRemoveItem && activeItem)
// );
// updateActiveItems([...activeItems]);

// updateActiveItems(
//   activeItems.filter(toremoveItem => !activeItems.includes(toremoveItem))

// updateSearchResults(
//   itemNames
//     .filter(item => item.toLowerCase().includes(input))
//     .filter(item => !activeItems.includes(item))
// updateActiveItems(
//   activeItems.filter(activeItem => activeItem.value != toremoveItem)
// updateActiveItems(
//   activeItems.filter(activeItem => activeItem.value != toremoveItem)
// );
// console.log(activeItems);

// updateActiveItems(activeItems.filter(activeItem => activeItem.value !== toremoveItem));
// console.log(activeItems);

// function excludeAssistant() {
//   if (activeitem.value !== toremoveitem) {
//     return true;
//   } else {
//     return false;
//   }
// }

//hidden={
// userInput.length > 0 && searchResults.length > 0 ? 'hidden' : ''
// }
//
//
/*{<ShowExcuse searchResults={false}></ShowExcuse>
function ShowExcuse(
  updateSearchResults,
  userInput,
  setUserInput,
  searchResults
) {
  const nothingFound = searchResults;
  console.log(nothingFound);
  if (userInput && !nothingFound) {
    setUserInput('');
    updateSearchResults([]);
    return (
      <p>
        We could not find what you are looking for. For that we are truly
        sorry
      </p>
    );
  }
}} */
