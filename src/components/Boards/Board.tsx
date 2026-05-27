import { useCallback, useState } from "react";
import type {
  Board as BoardType,
  Column as ColumnType,
} from "../../types/board";
import ColumnList from "../Columns";
import AddColumn from "./AddColumn";

export default function Board({
  board,
  onUpdateBoard,
}: {
  board: BoardType;
  onUpdateBoard: (board: BoardType) => void;
}) {
  const { columns } = board;

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenAddForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleCloseAddForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleUpdateColumn = useCallback(
    (updatedColumn: ColumnType) => {
      const updatedColumns = columns.map((col) =>
        col.id === updatedColumn.id ? updatedColumn : col,
      );
      onUpdateBoard({ ...board, columns: updatedColumns });
    },
    [board, onUpdateBoard],
  );

  return (
    <div
      className="p-4 bg-blue-100 rounded-md shadow-md"
      style={{ height: "calc(100vh - 144px)" }}
    >
      <h2 className="text-2xl font-bold mb-4">{board.title}</h2>
      <div className="grid grid-cols-5 gap-4">
        <ColumnList columns={columns} onUpdateColumn={handleUpdateColumn} />
        {isFormOpen ? (
          <AddColumn
            board={board}
            onUpdateBoard={onUpdateBoard}
            onClose={handleCloseAddForm}
          />
        ) : (
          <div
            className="p-2 rounded-md hover:bg-blue-200 cursor-pointer h-fit"
            onClick={handleOpenAddForm}
          >
            + Add Column
          </div>
        )}
      </div>
    </div>
  );
}
