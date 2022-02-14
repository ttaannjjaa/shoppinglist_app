import { useEffect, useState } from 'react';

export default function useFetch() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadItems() {
      try {
        const response = await fetch(
          'https://fetch-me.vercel.app/api/shopping/items'
        );
        const results = await response.json();
        setItems(results.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadItems();
  }, []);
  return [items];
}
