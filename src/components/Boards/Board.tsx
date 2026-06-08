import { useCallback, useState, useRef } from "react";
import type {
  Board as BoardType,
  Column as ColumnType,
} from "../../types/board";
import type { SubmitHandler } from "react-hook-form";
import { useBoardStore } from "../../store/useBoardStore";
import ColumnList from "../Columns";
import ColumnForm from "../ColumnForm";
import { Plus } from "lucide-react";

type BoardProps = {
  board: BoardType;
};

export default function Board({ board }: BoardProps) {
  const { columns } = board;
  const boardContainerRef = useRef<HTMLDivElement>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenAddForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleCloseAddForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const updateBoard = useBoardStore((state) => state.updateBoard);

  const handleUpdateColumn = useCallback(
    (updatedColumn: ColumnType) => {
      const updatedColumns = columns.map((col) =>
        col.id === updatedColumn.id ? updatedColumn : col,
      );
      updateBoard({ ...board, columns: updatedColumns });
    },
    [board, columns, updateBoard],
  );

  const handleAddColumn: SubmitHandler<ColumnType> = useCallback(
    (data) => {
      const newColumn: ColumnType = {
        id: Date.now(),
        title: data.title,
        color: data.color,
        cards: [],
      };
      updateBoard({ ...board, columns: [...columns, newColumn] });
      handleCloseAddForm();
    },
    [board, columns, updateBoard],
  );

  const handleDeleteColumn = useCallback(
    (columnId: number) => {
      const updatedColumns = columns.filter((col) => col.id !== columnId);
      updateBoard({ ...board, columns: updatedColumns });
    },
    [board, columns, updateBoard],
  );

  return (
    <div
      ref={boardContainerRef}
      className="p-4 rounded-md shadow-md overflow-hidden"
      style={{ height: "calc(100vh - 144px)", backgroundColor: "#dddddd" }}
    >
      <h2 className="text-2xl font-bold mb-4">{board.title}</h2>
      <div className="grid grid-cols-5 gap-4">
        <ColumnList
          board={board}
          columns={columns}
          containerRef={boardContainerRef}
          onUpdateColumn={handleUpdateColumn}
          onDeleteColumn={handleDeleteColumn}
        />
        {isFormOpen ? (
          <ColumnForm onSubmit={handleAddColumn} onClose={handleCloseAddForm} />
        ) : (
          <button
            type="button"
            className="flex items-center gap-1 p-2 rounded-md hover:bg-black/10 cursor-pointer h-fit text-left"
            style={{ color: "#202020", fontWeight: 500 }}
            onClick={handleOpenAddForm}
          >
            <Plus size={17} /> <span>Add Column</span>
          </button>
        )}
      </div>
    </div>
  );
}
