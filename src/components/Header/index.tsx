type HeaderProps = {
  onAddBoard: () => void;
};

export default function Header({ onAddBoard }: HeaderProps) {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
      <input
        type="text"
        placeholder="Search tasks..."
        className="px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md cursor-pointer"
        onClick={onAddBoard}
      >
        Create Board
      </button>
    </div>
  );
}
