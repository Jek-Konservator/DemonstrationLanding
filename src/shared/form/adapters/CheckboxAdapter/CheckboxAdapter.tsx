import { Checkbox, type CheckboxProps } from "@ui/Checkbox";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useErrorTranslate } from "../../hooks/useErrorTranslate";

interface CheckboxAdapterProps<T extends FieldValues> extends Omit<
  CheckboxProps,
  "checked" | "error" | "name" | "onChange"
> {
  control: Control<T>;
  name: Path<T>;
}

export const CheckboxAdapter = <T extends FieldValues>({
  control,
  name,
  ...props
}: CheckboxAdapterProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  const translateError = useErrorTranslate();

  return (
    <Checkbox
      {...props}
      checked={field.value}
      error={translateError(fieldState.error?.message)}
      name={field.name}
      onBlur={field.onBlur}
      onChange={(event) => field.onChange(event.currentTarget.checked)}
      ref={field.ref}
    />
  );
};
