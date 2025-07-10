type SideTabProps = {
  title: string;
  content?: undefined;
  onClose: () => void;
  show: boolean;
  position?: string;
};

export default function SideTab({
  title,
  content,
  onClose,
  show,
  position,
}: SideTabProps) {
  return (
    <div
      className={`${
        position !== "bottom"
          ? `overflow-auto z-1 fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr] transition duration-300 ease-in-out"
          ${show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`
          : ` overflow-auto fixed bottom-0 left-0 right-0 bg-gray-700 shadow-2xl h-100 w-full transition-transform transition-opacity duration-300 ease-in-out"
      ${
        show
          ? "translate-y-0 opacity-100"
          : "translate-y-[calc(100%-0px)] opacity-50"
      }`
      } `}
    >
      <div className="grid gap-5 p-4">
        <button
          className="cursor-pointer bg-black text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div>
        <h2 className="p-5 text-white text-2xl">{title}</h2>
        <div className="p-5">
          <div
            className={`${
              position !== "bottom"
                ? "flex flex-col gap-10 justify-between  text-white p-2 border-b-2 border-slate-700 round"
                : "grid auto-cols-auto p-5"
            }`}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
