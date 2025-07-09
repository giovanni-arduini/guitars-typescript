import { createContext, useContext } from "react";
import useGuitars from "../Hooks/useGuitars";
import type { Guitar, Product } from "../types";

type GlobalContextType = {
  products: Product[] | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>;
  getProduct: (id: number) => Promise<Guitar>;
  categories: string[];
};

const GlobalContext = createContext<GlobalContextType | null>(null);

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }: GlobalContextProviderProps) {
  const { products, setProducts, getProduct } = useGuitars();

  const categories = products!.reduce<string[]>((prev, prod) => {
    if (prev.includes(prod.category)) {
      return prev;
    }
    return [...prev, prod.category];
  }, []);
  // console.log(categories);

  return (
    <GlobalContext.Provider
      value={{
        products,
        setProducts,
        getProduct,
        categories,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
