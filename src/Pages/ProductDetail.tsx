import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Contexts/GlobalContext";
import { useFavoritesContext } from "../Contexts/FavoritesContext";
import { useCompareContext } from "../Contexts/CompareContext";

import type { Guitar } from "../types";

export default function ProductsDetail() {
  const { getProduct } = useGlobalContext();
  const { handleFavorite, favorites } = useFavoritesContext();
  const { compareItem, itemsToCompare } = useCompareContext();
  const { id } = useParams();
  const [guitar, setGuitar] = useState<Guitar | undefined>(undefined);

  useEffect(() => {
    async function getGuitar() {
      if (!id) return;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) return;

      try {
        const data: Guitar = await getProduct(parsedId); // Assumi che ritorni un Guitar
        setGuitar(data);
      } catch (error) {
        console.error("Error getting guitar data", error);
      }
    }

    getGuitar();
  }, [id, getProduct]);

  if (!guitar) {
    return <p>Loading...</p>;
  }

  const { title, price, image, category, available, rating } = guitar;

  const itemSpecs = Object.entries(guitar).filter(
    ([key]) =>
      ![
        "title",
        "rating",
        "category",
        "available",
        "image",
        "price",
        "createdAt",
        "updatedAt",
        "id",
      ].includes(key)
  );

  function sanitizeSpec(key: string) {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .toLowerCase()
      .replace(/^./, (c) => c.toUpperCase());
  }

  const stars = [1, 2, 3, 4, 5];

  console.log(itemsToCompare);

  return (
    <>
      <h1 className="text-3xl font-bold ">{title}</h1>
      {rating !== undefined && (
        <p className="text-orange-300">
          {stars.map((e) => (e <= Math.round(rating) ? "★" : "☆"))}
        </p>
      )}
      <div className="flex flex-col sm:grid sm:grid-cols-5 bg-white rounded-lg">
        <div className="flex justify-center p-4 col-span-3 mb-4 sm:mb-0">
          <div className="w-72 h-100 flex items-center justify-center bg-white rounded-lg overflow-hidden">
            <img className="w-full h-full object-contain" src={image} alt="" />
          </div>
        </div>
        <div className="grid grid-row-5 grow items-center justify-center sm:justify-start mb-4 sm:mb-0 col-span-2 mx-2">
          <div className="row-span-3">
            <p>Price (VAT incuded):</p>
            <p className="font-bold ">
              <span className="text-5xl">{price}</span>
              <span className="text-md">,00</span> €
            </p>
            <h4>{category} Guitar</h4>
          </div>
          {
            <p
              className={`row-span-1 font-bold text-xl ${
                available ? "text-green-600 " : "text-red-600"
              }`}
            >
              {available ? "Available" : "Currently out of stock"}
            </p>
          }
          <div className="flex flex-col row-span-1 gap-2">
            <button
              className="bg-gray-100 border border-gray-300 rounded-md cursor-pointer"
              onClick={() => handleFavorite(guitar.id)}
            >
              {`${
                favorites.some((fav) => fav.id === guitar.id)
                  ? "Remove from "
                  : "Add to "
              }`}
              <span className="text-red-600">♥︎</span>
            </button>
            <button
              onClick={() => compareItem(guitar.id)}
              className={`
                bg-gray-100 border border-gray-300 rounded-md cursor-pointer
                ${
                  itemsToCompare.some((item) => item.id === guitar.id)
                    ? "bg-gray-300"
                    : "bg-gray-100"
                }
              `}
            >
              {itemsToCompare.some((item) => item.id === guitar.id)
                ? "Remove from compare"
                : "Compare product"}
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-200 mt-4 m-auto">
        {itemSpecs.map(([key, value], index) => (
          <p
            className="odd:bg-white  even:bg-gray-50  border-b  border-gray-200 flex justify-between"
            key={index}
          >
            <span className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {sanitizeSpec(key)}:
            </span>
            <span className="px-6 py-4">{value}</span>
          </p>
        ))}
      </div>
    </>
  );
}
