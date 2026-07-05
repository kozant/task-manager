import { useCallback, useState, useRef } from "react";
import type {
  Board as BoardType,
  Column as ColumnType,
} from "../../types/board";
import type { SubmitHandler } from "react-hook-form";
import { useBoardStore } from "../../store/useBoardStore";
import ColumnList from "../Columns";
import ColumnForm from "../ColumnForm";
import Modal from "../common/Modal";
import { PanelsTopLeft, Plus } from "lucide-react";

type BoardProps = {
  board: BoardType;
};

export default function Board({ board }: BoardProps) {
  const { columns } = board;
  const boardContainerRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddForm = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseAddForm = useCallback(() => {
    setIsModalOpen(false);
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
      className="py-4"
      style={{ height: "calc(100vh - 64px)", backgroundColor: "#dddddd" }}
    >
      <h2 className="text-2xl font-bold mb-4 pl-6 pr-4">{board.title}</h2>
      <div
        className="flex flex-col justify-between"
        style={{ height: "calc(100% - 32px)" }}
      >
        <ul className="flex flex-row h-full overflow-x-auto overflow-y-hidden px-4">
          <ColumnList
            board={board}
            columns={columns}
            containerRef={boardContainerRef}
            onUpdateColumn={handleUpdateColumn}
            onDeleteColumn={handleDeleteColumn}
          />
          <li>
            <button
              type="button"
              className="flex items-center gap-1 p-2 rounded-md hover:bg-black/10 cursor-pointer h-fit w-64 text-left"
              style={{ color: "#202020", fontWeight: 500 }}
              onClick={handleOpenAddForm}
            >
              <Plus size={17} /> <div>Add Column</div>
            </button>
          </li>
        </ul>
        <div className="absolute bottom-7 w-full flex justify-center">
          <button
            type="button"
            className="flex justify-center items-center gap-2 p-2 rounded-md bg-white hover:bg-black/10 cursor-pointer h-fit w-64 text-left"
            style={{ color: "#202020", fontWeight: 500 }}
            onClick={handleOpenAddForm}
          >
            <PanelsTopLeft size={17} /> <div>Choose Board</div>
          </button>
        </div>
      </div>
      <Modal title="Add Column" isOpen={isModalOpen} onChange={setIsModalOpen}>
        <ColumnForm onSubmit={handleAddColumn} onClose={handleCloseAddForm} />
      </Modal>
    </div>
  );
}
