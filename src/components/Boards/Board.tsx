import { useCallback, useState } from "react";
import type {
  Board as BoardType,
  Column as ColumnType,
} from "../../types/board";
import type { SubmitHandler } from "react-hook-form";
import ColumnList from "../Columns";
import ColumnForm from "../ColumnForm";

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

  const handleAddColumn: SubmitHandler<ColumnType> = useCallback(
    (data) => {
      const newColumn: ColumnType = {
        id: Date.now(),
        title: data.title,
        cards: [],
      };
      onUpdateBoard({ ...board, columns: [...columns, newColumn] });
      handleCloseAddForm();
    },
    [board, onUpdateBoard],
  );

  const handleDeleteColumn = useCallback(
    (columnId: number) => {
      const updatedColumns = columns.filter((col) => col.id !== columnId);
      onUpdateBoard({ ...board, columns: updatedColumns });
    },
    [board, columns, onUpdateBoard],
  );

  return (
    <div
      className="p-4 bg-blue-100 rounded-md shadow-md"
      style={{ height: "calc(100vh - 144px)" }}
    >
      <h2 className="text-2xl font-bold mb-4">{board.title}</h2>
      <div className="grid grid-cols-5 gap-4">
        <ColumnList
          columns={columns}
          onUpdateColumn={handleUpdateColumn}
          onDeleteColumn={handleDeleteColumn}
        />
        {isFormOpen ? (
          <ColumnForm onSubmit={handleAddColumn} onClose={handleCloseAddForm} />
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
