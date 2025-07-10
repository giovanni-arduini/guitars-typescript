import CompareCard from "./CompareCard";
import SideTab from "./SideTab";
import { useCompareContext } from "../Contexts/CompareContext";
import { useRef } from "react";

export default function CompareTab() {
  const { showCompare, itemsToCompare, closeCompare } = useCompareContext();

  const topRef = useRef<HTMLDivElement>(null);

  function toTop() {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <SideTab
        position={"bottom"}
        title={"Compare products"}
        content={
          <>
            {itemsToCompare.length < 1 ? (
              <div className=" items-center flex flex-col gap-5">
                <p className="text-xl italic text-white">
                  Compare up to 3 guitars!
                </p>
                <h2 className="text-white">No selected items to compare</h2>
              </div>
            ) : (
              <>
                <div
                  ref={topRef}
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${
                      itemsToCompare.length === 1 ? 2 : itemsToCompare.length
                    }, 1fr)`,
                  }}
                >
                  {itemsToCompare.map((item) => (
                    <CompareCard key={item.id} item={item} />
                  ))}
                  {itemsToCompare.length < 2 && (
                    <div className="text-white text-xl text-center">
                      Select another item to compare
                    </div>
                  )}
                </div>
                <button
                  className="mt-5 bg-slate-300 m-auto px-2 rounded-sm hover:bg-slate-400 cursor-pointer"
                  onClick={() => toTop()}
                >
                  Scroll to top
                </button>
              </>
            )}
          </>
        }
        show={showCompare}
        onClose={closeCompare}
      />
    </>
  );
}
