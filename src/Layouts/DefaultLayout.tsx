import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import CompareTab from "../Components/CompareTab";
import { useCompareContext } from "../Contexts/CompareContext";

export default function DefaultLayout() {
  const { showCompare, setShowCompare } = useCompareContext();

  const handleClickOnMain = () => {
    showCompare ? setShowCompare(false) : "";
  };

  return (
    <div className="">
      <Header />
      <main className="w-[1200] max-w-full m-auto p-5">
        <div onClick={handleClickOnMain}>
          <Outlet />
        </div>
        <CompareTab />
      </main>
    </div>
  );
}
