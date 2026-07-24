import { useCallback } from "react";
import type { Board as BoardType } from "../../types/board";

export default function BoardCell({
  board,
  isActive,
  onChange,
  onClose,
}: {
  board: BoardType;
  isActive: boolean;
  onChange: (boardId: number) => void;
  onClose: () => void;
}) {
  const handleBoardChange = useCallback(() => {
    onChange(board.id);
    onClose();
  }, [board.id, onChange]);

  return (
    <div
      key={board.id}
      className={`w-30 relative rounded-md shadow-sm h-25 bg-gray-300 
        hover:shadow-md transition-shadow duration-200 cursor-pointer 
        ${isActive ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
      onClick={handleBoardChange}
    >
      <div
        className="absolute rounded-bl-md rounded-br-md 
      bottom-0 w-full p-2 bg-white font-semibold text-sm 
      overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {board.title}
      </div>
    </div>
  );
}
