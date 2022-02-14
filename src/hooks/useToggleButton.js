import { useState, useCallback } from 'react';

export default function useToggleButton(initialState = false) {
  // Initialize the state
  const [isActive, setIsActive] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback(() => setIsActive(isActive => !isActive), []);

  return [isActive, toggle];
}
