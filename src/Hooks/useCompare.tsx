import { useState } from "react";

function useCompare<T>() {
  // utilizzo dei generics per convertibilità dell'hook di comparazione
  const [itemsToCompare, setItemsToCompare] = useState<T[]>([]);
  const [showCompare, setShowCompare] = useState<boolean>(false);

  return { showCompare, setShowCompare, itemsToCompare, setItemsToCompare };
}

export default useCompare;
