import { useCallback, useState } from "react";
import type { Board as BoardType } from "../../types/board";
import type { SubmitHandler } from "react-hook-form";
import { useBoardStore } from "../../store/useBoardStore";
import BoardForm from "../BoardForm";
import Modal from "../common/Modal";
import { PanelsTopLeft } from "lucide-react";

export default function BoardPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddForm = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseAddForm = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const createBoard = useBoardStore((state) => state.createBoard);
  const boards = useBoardStore((state) => state.boards);

  const handleAddBoard: SubmitHandler<BoardType> = useCallback(
    (data) => {
      createBoard(data.title);
      handleCloseAddForm();
    },
    [createBoard],
  );

  return (
    <>
      <div className="absolute bottom-7 w-full flex justify-center">
        <button
          type="button"
          className="flex justify-center items-center gap-2 p-2 rounded-md bg-white 
          hover:bg-black/10 cursor-pointer h-fit w-64 text-left"
          style={{ color: "#202020", fontWeight: 500 }}
          onClick={handleOpenAddForm}
        >
          <PanelsTopLeft size={17} /> <div>Choose Board</div>
        </button>
      </div>
      <Modal
        title={!!boards.length ? "Choose Board" : "Create New Board"}
        isOpen={isModalOpen}
        onChange={setIsModalOpen}
      >
        <BoardForm onSubmit={handleAddBoard} onClose={handleCloseAddForm} />
      </Modal>
    </>
  );
}
