import { useEffect, useMemo } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type { Card as CardType } from "../../types/board";
import { X } from "lucide-react";
import SelectMenu from "../common/Select";
import { PRIORITY_LEVELS } from "../../store/useBoardStore";

import { FORM_STYLES } from "./form.styles";

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
  const defaultValues = useMemo(
    () => ({
      title: defaultValue?.title ?? "",
      description: defaultValue?.description ?? "",
      priority: defaultValue?.priority ?? 0,
    }),
    [defaultValue?.title, defaultValue?.description],
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<CardType>({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [defaultValues, isSubmitSuccessful, reset]);

  return (
    <form className={FORM_STYLES.FORM} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className={FORM_STYLES.LABEL} htmlFor="title">
          Title
        </label>
        <input
          className={FORM_STYLES.INPUT}
          id="title"
          placeholder="Enter title"
          {...register("title")}
        />
      </div>
      <div>
        <label className={FORM_STYLES.LABEL} htmlFor="description">
          Description
        </label>
        <textarea
          className={FORM_STYLES.TEXTAREA}
          id="description"
          placeholder="Enter description"
          {...register("description")}
        />
      </div>
      <div>
        <label className={FORM_STYLES.LABEL} htmlFor="priority">
          Priority
        </label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <SelectMenu
              items={PRIORITY_LEVELS}
              selectedItem={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>
      <div className={FORM_STYLES.BUTTON_CONTAINER}>
        <button className={FORM_STYLES.SUBMIT_BUTTON} type="submit">
          {buttonText}
        </button>
        <button
          className={FORM_STYLES.CANCEL_BUTTON}
          type="button"
          onClick={onClose}
        >
          <X color="rgb(80, 82, 88)" />
        </button>
      </div>
    </form>
  );
}
