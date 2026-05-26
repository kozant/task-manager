import { useCallback, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import Column from "../Column";

type Inputs = {
  title: string;
};

export default function Board({
  board,
  onUpdateBoard,
}: {
  board: any;
  onUpdateBoard: (board: any) => void;
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
      console.log(data);
      const newColumn = {
        id: Date.now(),
        title: data.title,
        cards: [],
      };
      onUpdateBoard({ ...board, columns: [...board.columns, newColumn] });
    },
    [board, onUpdateBoard],
  );

  const handleOpenAddForm = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleUpdateColumn = (updatedColumn: any) => {
    const updatedColumns = board.columns.map((col: any) =>
      col.id === updatedColumn.id ? updatedColumn : col,
    );
    onUpdateBoard({ ...board, columns: updatedColumns });
  };

  return (
    <div
      className="p-4 bg-blue-100 rounded-md shadow-md"
      style={{ height: "calc(100vh - 144px)" }}
    >
      <h2 className="text-2xl font-bold mb-4">{board.title}</h2>
      <div className="grid grid-cols-5 gap-4">
        {board.columns && board.columns.length > 0
          ? board.columns.map((column: any) => (
              <Column
                key={column.id}
                column={column}
                onUpdateColumn={handleUpdateColumn}
              />
            ))
          : null}
        {isFormOpen ? (
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
                onClick={() => setIsFormOpen(false)}
              >
                X
              </button>
            </div>
          </form>
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
