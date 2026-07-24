import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Column as ColumnType } from "../../types/board";
import { COLUMN_COLORS } from "../../store/useBoardStore";
import { FORM_STYLES } from "../CardForm/form.styles";

export default function ColumnForm({
  onSubmit,
}: {
  onSubmit: (column: ColumnType) => void;
}) {
  const defaultValues = useMemo(
    () => ({ title: "", color: COLUMN_COLORS[0] }),
    [],
  );

  const {
    register,
    control,
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

      <div>
        <label className={FORM_STYLES.LABEL} htmlFor="color">
          Color
        </label>
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-5 gap-3">
              {COLUMN_COLORS.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => field.onChange(option)}
                  className={`
                    ${FORM_STYLES.COLOR_SELECT}
                    ${field.value.name === option.name ? "ring-2 ring-blue-500 ring-offset-2" : ""}
                  `}
                  style={{ backgroundColor: option.background }}
                />
              ))}
            </div>
          )}
        />
      </div>

      <div className={FORM_STYLES.BUTTON_CONTAINER}>
        <button className={FORM_STYLES.SUBMIT_BUTTON} type="submit">
          Add Column
        </button>
      </div>
    </form>
  );
}
