import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import type { Column as ColumnType } from "../../types/board";
import { X } from "lucide-react";
import { COLUMN_COLORS } from "../../store/useBoardStore";

export default function ColumnForm({
  onSubmit,
  onClose,
}: {
  onSubmit: (column: ColumnType) => void;
  onClose: () => void;
}) {
  const defaultValues = useMemo(
    () => ({ title: "", color: COLUMN_COLORS[0] }),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<ColumnType>({ defaultValues });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [defaultValues, isSubmitSuccessful, reset]);

  return (
    <form
      className="flex flex-col gap-3 bg-gray-50 p-2 rounded-md shadow-sm h-fit"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="px-4 py-1 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter title"
        {...register("title")}
      />
      <div className="flex gap-1">
        <button
          className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          type="submit"
        >
          Add Column
        </button>
        <button
          className="p-1 rounded-md hover:bg-black/10 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <X color="rgb(80, 82, 88)" />
        </button>
      </div>
    </form>
  );
}
