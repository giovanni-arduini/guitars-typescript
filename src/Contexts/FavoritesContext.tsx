import { createContext, useContext } from "react";
import useFavorites from "../Hooks/useFavorites";
import { useGlobalContext } from "./GlobalContext";
import type { Product } from "../types";

type FavoritesContextType = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
  showFavorites: boolean;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  handleFavorite: (id: number) => void;
  toggleFavorites: () => void;
  removeFromFavorites: (item: Product) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
}

type FavoritesContextProviderProps = {
  children: React.ReactNode;
};

export function FavoritesProvider({ children }: FavoritesContextProviderProps) {
  // check if products is null or an array
  const globalContext = useGlobalContext();
  const products = globalContext?.products ?? [];

  const { favorites, setFavorites, showFavorites, setShowFavorites } =
    useFavorites();

  // used in Header to toggle FavBar
  const toggleFavorites = (): void => {
    setShowFavorites((prev) => !prev);
  };

  // used in FavoritesTab to remove item
  const removeFromFavorites = (item: Product): void => {
    setFavorites((curr: Product[]) => curr.filter((p) => p.id !== item.id));
  };

  // used in ProductCard and ProductDetail to add and remove favorite
  const handleFavorite = (id: number): void => {
    const newFavorite = products.find((p) => p.id === id);
    if (newFavorite && !favorites.some((fav) => fav.id === id)) {
      // Animation effets on favorites icon
      const favIcon = document.getElementById("favIcon");
      if (favIcon) {
        favIcon.classList.add("add-animation");
        setTimeout(() => {
          favIcon.classList.remove("add-animation");
        }, 1000);
      }

      setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
    } else {
      const favCounter = document.getElementById("favCounter");
      if (favCounter) {
        favCounter.classList.add("delete-animation");
        setTimeout(() => {
          favCounter.classList.remove("delete-animation");
        }, 1000);
      }
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        showFavorites,
        setShowFavorites,
        handleFavorite,
        toggleFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
