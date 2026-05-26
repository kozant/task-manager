import Board from "../Board";

export default function Content({
  boards,
  onUpdateBoard,
}: {
  boards: any[];
  onUpdateBoard: (board: any) => void;
}) {
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
            <Board key={board.id} board={board} onUpdateBoard={onUpdateBoard} />
          ))
        )}
      </div>
    </div>
  );
}
