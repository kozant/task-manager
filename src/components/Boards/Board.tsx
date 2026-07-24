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
import { Ellipsis, Plus } from "lucide-react";
import Dropdown from "../common/Dropdown";

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
  const deleteBoard = useBoardStore((state) => state.deleteBoard);

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

  const handleDeleteBoard = useCallback(() => {
    deleteBoard(board.id);
  }, [board.id, deleteBoard]);

  const actions = [
    // {
    //   group: "list",
    //   label: "Edit Board",
    //   onSelect: handleOpenAddForm,
    // },
    {
      group: "danger",
      label: "Delete Board",
      onSelect: handleDeleteBoard,
      className: "text-red-600 hover:bg-red-600/10",
    },
  ];

  return (
    <div
      ref={boardContainerRef}
      className="bg-gray-200"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="flex justify-between items-center py-2 mb-4 bg-gray-300">
        <h2 className="text-2xl font-bold pl-6">{board.title}</h2>
        <div className="flex transition-opacity pr-3 opacity-100 pointer-events-auto">
          <Dropdown
            tooltipText="Actions"
            items={actions}
            handle={
              <button
                type="button"
                className="p-2 cursor-pointer rounded-full outline-none"
                onPointerDown={(event) => event.stopPropagation()}
              >
                <Ellipsis size={20} />
              </button>
            }
          />
        </div>
      </div>
      <div
        className="flex flex-col justify-between"
        style={{ height: "calc(100% - 68px)" }}
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
      </div>
      <Modal title="Add Column" isOpen={isModalOpen} onChange={setIsModalOpen}>
        <ColumnForm onSubmit={handleAddColumn} />
      </Modal>
    </div>
  );
}
