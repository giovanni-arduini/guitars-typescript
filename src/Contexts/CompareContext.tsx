import { createContext, useContext, useEffect } from "react";
import { useGlobalContext } from "./GlobalContext";
import useCompare from "../Hooks/useCompare";
import { useFavoritesContext } from "./FavoritesContext";
import type { Guitar } from "../types";

type CompareContextType = {
  showCompare: boolean;
  itemsToCompare: Guitar[];
  compareItem: (id: number) => Promise<void>;
  closeCompare: () => void;
  toggleCompare: () => void;
  setShowCompare: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompareContext = createContext<CompareContextType | null>(null);

export function useCompareContext() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a CompareProvider"
    );
  }
  return context;
}

type CompareContextProviderProps = {
  children: React.ReactNode;
};

export function CompareProvider({ children }: CompareContextProviderProps) {
  const globalContext = useGlobalContext();
  const getProduct = globalContext?.getProduct;

  const favoritesContext = useFavoritesContext();
  // const setShowFavorites = favoritesContext?.setShowFavorites;

  const { showCompare, setShowCompare, itemsToCompare, setItemsToCompare } =
    useCompare<Guitar>();

  async function getItem(id: number): Promise<Guitar> {
    if (!getProduct) {
      throw new Error("getProduct is undefined");
    }
    const data = await getProduct(id);
    return data;
  }

  const compareItem = async (id: number): Promise<void> => {
    if (!itemsToCompare.some((item) => item.id === id))
      if (itemsToCompare.length < 3) {
        const item = await getItem(id);
        setItemsToCompare((prevItems) => [...prevItems, item]);
      } else {
        const item = await getItem(id);
        setItemsToCompare((prevItems) => [prevItems[1], item]);
      }
    else {
      setItemsToCompare((prevItems) => prevItems.filter((p) => p.id !== id));
    }
  };

  // Used in Header, CompareTab
  function closeCompare() {
    setShowCompare(false);
  }

  // Used in Header
  function toggleCompare() {
    showCompare ? setShowCompare(false) : setShowCompare(true);
  }

  useEffect(() => {
    if (favoritesContext?.setShowFavorites && showCompare) {
      favoritesContext.setShowFavorites(false);
    }
  }, [showCompare]);

  useEffect(() => {
    itemsToCompare.length < 1 ? setShowCompare(false) : setShowCompare(true);
  }, [itemsToCompare]);

  return (
    <CompareContext.Provider
      value={{
        showCompare,
        itemsToCompare,
        compareItem,
        closeCompare,
        toggleCompare,
        setShowCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
