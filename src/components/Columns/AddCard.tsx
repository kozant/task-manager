import { useCallback, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Column as ColumnType, Card as CardType } from "../../types/board";

type Inputs = {
  title: string;
  description: string;
};

export default function AddCard({
  column,
  onUpdateColumn,
  onClose,
}: {
  column: ColumnType;
  onUpdateColumn: (column: ColumnType) => void;
  onClose: () => void;
}) {
  const { cards } = column;

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
      const newCard: CardType = {
        id: Date.now(),
        title: data.title,
        description: data.description,
      };
      onUpdateColumn({ ...column, cards: [...cards, newCard] });
    },
    [column, onUpdateColumn],
  );

  return (
    <form className="grid grid-rows-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="p-2 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter title"
        defaultValue=""
        {...register("title")}
      />
      <input
        className="p-2 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter description"
        defaultValue=""
        {...register("description")}
      />
      <div className="flex gap-1">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          type="submit"
        >
          Add Card
        </button>
        <button
          className="px-2 py-1 rounded-md hover:bg-green-200 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </form>
  );
}
