import { useState, useEffect } from "react";
import type { Product } from "../types";

function useFavorites() {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const storedFavorites = localStorage.getItem("storedFavorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("storedFavorites", JSON.stringify(favorites));
  }, [favorites]);

  return {
    favorites,
    setFavorites,
    showFavorites,
    setShowFavorites,
  };
}

export default useFavorites;
