import { useState, useEffect } from "react";
import type { Product, Guitar } from "../types";

function useGuitars() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    const response = await fetch(URL);
    const data: Product[] = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProduct = async (id: number) => {
    const response = await fetch(URL + id);
    const data: Guitar = await response.json();
    return data;
  };

  return { products, setProducts, getProduct };
}

export default useGuitars;
