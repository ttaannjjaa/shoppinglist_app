import styled from 'styled-components';

export default function Shoppinglist({ activeItems, updateActiveItems }) {
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

const ShoppingListContainer = styled.section`
  display: flex;
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
