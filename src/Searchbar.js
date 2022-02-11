import styled from 'styled-components';

export default function Searchbar({ showSearchResults }) {
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
        onChange={showSearchResults}
      ></input>
    </SearchContainer>
  );
}

const SearchContainer = styled.form`
  display: grid;
  gap: 10px;

  input {
    padding: 2px;
    text-align: center;
  }
`;
