import Board from "./Board";
import type { Board as BoardType } from "../../types/board";
import { useBoardStore } from "../../store/useBoardStore";

type BoardListProps = {
  boards: BoardType[];
};

export default function BoardList({ boards }: BoardListProps) {
  const activeBoardId = useBoardStore((state) => state.activeBoardId);
  const activeBoard = boards.find((board) => board.id === activeBoardId);

  return (
    <div className="grid grid-cols-1 gap-4">
      {boards.length === 0 || !activeBoard ? (
        <p className="text-gray-600">
          No boards available. Create a new board to get started!
        </p>
      ) : (
        <div key={activeBoard?.id}>
          <Board board={activeBoard} />
        </div>
      )}
    </div>
  );
}
