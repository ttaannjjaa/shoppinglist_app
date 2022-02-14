import styled from 'styled-components';

export default function ShoppingList({ activeItems, updateActiveItems }) {
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

  return (
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
  );
}

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
