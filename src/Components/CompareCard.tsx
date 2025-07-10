import { useAvailability } from "../Hooks/useAvailability";
import { useCompareContext } from "../Contexts/CompareContext";
import type { Guitar } from "../types";

type CompareCardProps = {
  item: Guitar;
};

export default function CompareCard({ item }: CompareCardProps) {
  const { title, price, image, category, available, rating, id } = item;

  if (!item) {
    return <p>Loading...</p>;
  }

  const { compareItem } = useCompareContext();

  const itemSpecs = Object.entries(item).filter(
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

  const availability = useAvailability(available);
  const stars = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="bg-slate-400 p-10">
        <div className="flex flex-col">
          <button
            className="cursor-pointer mb-3 bg-slate-300 border-2 rounded-md m-auto px-2 hover:bg-slate-500 hover:text-white"
            onClick={() => compareItem(id)}
          >
            Remove from compare
          </button>
          <h3 className="text-3xl font-bold text-center line-clamp-1 mb-3">
            {title}
          </h3>
          <div className="flex flex-col justify-around bg-white xl:flex-row">
            <img
              className="h-48 w-96 object-contain mt-3 mb-3"
              src={image}
              alt=""
            />
            <div className="flex flex-col justify-around xl:items-end p-4 items-center">
              {/* <p className="text-orange-300">
                {stars.map((e) => {
                  if (e <= Math.round(rating ?? 0)) {
                    return "★";
                  }
                  return "☆";
                })}
              </p> */}
              {rating !== undefined && (
                <p className="text-orange-300">
                  {stars.map((e) => (e <= Math.round(rating) ? "★" : "☆"))}
                </p>
              )}
              <p>
                Category:
                {category}
              </p>
              <p className="">{available}</p>
              <p>Price: {price}€</p>
              {<p className={availability.style}>{availability.message}</p>}
            </div>
          </div>
          <table className="table-auto border-separate w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-200">
            <thead></thead>
            <tbody>
              {itemSpecs.map(([key, value], index) => (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-700 border-b dark:border-gray-600 border-gray-200"
                  key={index}
                >
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {sanitizeSpec(key)}:
                  </th>
                  <td className="px-6 py-4">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
