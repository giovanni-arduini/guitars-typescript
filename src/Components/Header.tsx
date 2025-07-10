import { NavLink } from "react-router-dom";
import { useFavoritesContext } from "../Contexts/FavoritesContext";
import { useCompareContext } from "../Contexts/CompareContext";
import FavoritesTab from "./FavoritesTab";

export default function Header() {
  const { favorites, toggleFavorites } = useFavoritesContext();
  const { toggleCompare, showCompare } = useCompareContext();

  const handleCompareClick = () => {
    toggleCompare();
  };

  return (
    <header className="flex justify-between items-center px-10 p-3 ">
      <FavoritesTab />
      <div>
        <NavLink
          to={"/"}
          className={`nav hover:text-indigo-100 text-l font-semibold mr-5 `}
        >
          Home
        </NavLink>
        <button
          id="compareBtn "
          onClick={handleCompareClick}
          className={`hover:text-indigo-100 nav ${showCompare ? "active" : ""}`}
        >
          Compare products
        </button>
      </div>

      <div>
        <div
          className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center relative hover:cursor-pointer"
          id="favIcon"
          onClick={() => toggleFavorites()}
        >
          <img className="w-7" src="/images/save.png" alt="Favorites list" />
          <div className="check text-yellow-500 absolute top-2 left-8 z-10 invisible">
            ★
          </div>
          <span
            id="favCounter"
            className="absolute p-2 top-1/2 left-1/2 bg-slate-500 text-white text-sm w-3 h-3 rounded-full flex justify-center items-center"
          >
            {favorites.length}
          </span>
        </div>
      </div>
    </header>
  );
}
