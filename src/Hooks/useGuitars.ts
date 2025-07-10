import { useState, useEffect } from "react";
import type { Product, Guitar } from "../types";

function useGuitars() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async (): Promise<void> => {
    const response = await fetch(URL);
    // throw di eventuali errori 400 e 500
    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }
    const data: unknown = await response.json();
    // controllo che data sia di tipo array
    if (Array.isArray(data)) {
      setProducts(data as Product[]);
    } else {
      // set come array vuoto in caso data non sia array
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProduct = async (id: number): Promise<Guitar> => {
    const response = await fetch(`${URL}${id}`);
    // throw di eventuali errori 400 e 500
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product with id ${id}: ${response.status}`
      );
    }
    const data: Guitar = await response.json();
    return data;
  };

  return { products, setProducts, getProduct };
}

export default useGuitars;
