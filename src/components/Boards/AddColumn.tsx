import { useCallback, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type {
  Board as BoardType,
  Column as ColumnType,
} from "../../types/board";

type Inputs = {
  title: string;
};

export default function AddColumn({
  board,
  onUpdateBoard,
  onClose,
}: {
  board: BoardType;
  onUpdateBoard: (board: BoardType) => void;
  onClose: () => void;
}) {
  const { columns } = board;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Inputs>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    (data) => {
      const newColumn: ColumnType = {
        id: Date.now(),
        title: data.title,
        cards: [],
      };
      onUpdateBoard({ ...board, columns: [...columns, newColumn] });
    },
    [board, onUpdateBoard],
  );

  return (
    <form
      className="flex flex-col gap-3 bg-gray-50 p-2 rounded-md shadow-sm h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="p-2 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter title"
        defaultValue=""
        {...register("title")}
      />
      <div className="flex gap-1">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          type="submit"
        >
          Add Column
        </button>
        <button
          className="px-2 py-1 rounded-md hover:bg-blue-200 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </form>
  );
}
