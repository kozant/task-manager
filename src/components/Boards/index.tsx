import Board from "./Board";
import type { Board as BoardType } from "../../types/board";

type BoardListProps = {
  boards: BoardType[];
};

export default function BoardList({ boards }: BoardListProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Task Board</h2>
      <div className="grid grid-cols-1 gap-4">
        {boards.length === 0 ? (
          <p className="text-gray-600">
            No boards available. Create a new board to get started!
          </p>
        ) : (
          boards.map((board) => (
            <div key={board.id}>
              <Board board={board} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
