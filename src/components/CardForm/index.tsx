import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { Card as CardType } from "../../types/board";
import { X } from "lucide-react";

export default function CardForm({
  buttonText,
  defaultValue,
  onSubmit,
  onClose,
}: {
  buttonText: string;
  defaultValue?: CardType;
  onSubmit: SubmitHandler<CardType>;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<CardType>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form className="grid grid-rows-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="px-3 py-1 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter title"
        defaultValue={defaultValue?.title || ""}
        {...register("title")}
      />
      <input
        className="px-3 py-1 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter description"
        defaultValue={defaultValue?.description || ""}
        {...register("description")}
      />
      <div className="flex gap-1">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
          type="submit"
        >
          {buttonText}
        </button>
        <button
          className="p-1 rounded-md hover:bg-green-200 cursor-pointer"
          type="button"
          onClick={onClose}
        >
          <X color="rgb(80, 82, 88)" />
        </button>
      </div>
    </form>
  );
}
