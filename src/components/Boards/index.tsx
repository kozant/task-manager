import Board from "./Board";
import type { Board as BoardType } from "../../types/board";

type BoardListProps = {
  boards: BoardType[];
};

export default function BoardList({ boards }: BoardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {boards.length === 0 ? (
        <p className="text-gray-600">
          No boards available. Create a new board to get started!
        </p>
      ) : (
        <div key={boards?.[0].id}>
          <Board board={boards?.[0]} />
        </div>
      )}
    </div>
  );
}
