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
        <div
          style={{ height: "calc(100vh - 64px)" }}
          className="relative bg-gray-200"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-gray-600">
            <div className="text-center">No boards available.</div>
            <div className="text-center">
              Create a new board to get started!
            </div>
          </div>
        </div>
      ) : (
        <div key={activeBoard?.id}>
          <Board board={activeBoard} />
        </div>
      )}
    </div>
  );
}
