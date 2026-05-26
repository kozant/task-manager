import { useCallback, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Card from "../Card";

type Inputs = {
  title: string;
  description: string;
};

export default function Column({
  column,
  onUpdateColumn,
}: {
  column: any;
  onUpdateColumn: (column: any) => void;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
      const newCard = {
        id: Date.now(),
        title: data.title,
        description: data.description,
      };
      onUpdateColumn({ ...column, cards: [...column.cards, newCard] });
    },
    [column, onUpdateColumn],
  );

  const handleOpenAddForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  return (
    <div
      key={column.id}
      className="flex flex-col gap-3 p-2 bg-green-100 rounded-md shadow-sm"
    >
      {column.title}
      {column.cards && column.cards.length > 0
        ? column.cards.map((card: any) => <Card key={card.id} card={card} />)
        : null}
      {isFormOpen ? (
        <form
          className="grid grid-rows-2 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              onClick={() => setIsFormOpen(false)}
            >
              X
            </button>
          </div>
        </form>
      ) : (
        <div
          className="p-2 rounded-md hover:bg-green-200 cursor-pointer"
          onClick={handleOpenAddForm}
        >
          + Add Card
        </div>
      )}
    </div>
  );
}
