import { useFavoritesContext } from "../Contexts/FavoritesContext";
import SideTab from "./SideTab";
import { useNavigate } from "react-router-dom";

function FavoritesTab() {
  const { favorites, showFavorites, setShowFavorites, removeFromFavorites } =
    useFavoritesContext();

  const navigate = useNavigate();

  function toDetail(id: number) {
    navigate(`/guitars/${id}`);
  }

  return (
    <SideTab
      title={"Favorites"}
      content={
        favorites.length > 0 ? (
          favorites.map((item, i) => (
            <div
              className="bg-slate-500 p-3 flex flex-col gap-2 overflow-auto cursor-pointer"
              key={i}
            >
              <div
                className="text-center p-3
              "
                onClick={() => toDetail(item.id)}
              >
                {item.title}
              </div>
              <button
                className="cursor-pointer py-1 px-3  mx-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-800"
                onClick={() => removeFromFavorites(item)}
              >
                Remove from favorites
              </button>
            </div>
          ))
        ) : (
          <>
            <p className="text-center">No added favorites</p>
            <p className="italic">Add your favorite guitars!</p>
          </>
        )
      }
      onClose={() => setShowFavorites(false)}
      show={showFavorites}
    />
  );
}

export default FavoritesTab;
