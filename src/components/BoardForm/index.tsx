import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import type { Board as BoardType } from "../../types/board";
import { useBoardStore } from "../../store/useBoardStore";
import { FORM_STYLES } from "../CardForm/form.styles";
import BoardCell from "./BoardCell";

export default function BoardForm({
  onSubmit,
  onClose,
}: {
  onSubmit: (board: BoardType) => void;
  onClose: () => void;
}) {
  const defaultValues = useMemo(() => ({ title: "" }), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<BoardType>({ defaultValues });

  const boards = useBoardStore((state) => state.boards);
  const activeBoardId = useBoardStore((state) => state.activeBoardId);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [defaultValues, isSubmitSuccessful, reset]);

  const changeActiveBoard = useBoardStore((state) => state.changeActiveBoard);

  return (
    <div className="flex flex-col gap-5 h-fit">
      <div className="grid grid-flow-col auto-cols-max gap-3 overflow-x-auto p-2">
        {boards.map((board) => (
          <BoardCell
            key={board.id}
            isActive={board.id === activeBoardId}
            board={board}
            onChange={changeActiveBoard}
            onClose={onClose}
          />
        ))}
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <div className="w-full h-0.5 bg-gray-200"></div>
        <div className="font-semibold text-gray-400">Or</div>
        <div className="w-full h-0.5 bg-gray-200"></div>
      </div>
      <div>
        <div className="text-lg font-semibold mb-5 leading-none">
          Create New Board
        </div>
        <form
          className="flex flex-col gap-5 rounded-md h-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className={FORM_STYLES.LABEL} htmlFor="title">
              Title
            </label>
            <input
              className={FORM_STYLES.INPUT}
              placeholder="Enter title"
              {...register("title")}
            />
          </div>

          <div className={FORM_STYLES.BUTTON_CONTAINER}>
            <button className={FORM_STYLES.SUBMIT_BUTTON} type="submit">
              Add Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
