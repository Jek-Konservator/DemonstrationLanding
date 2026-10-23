import { Select, type SelectProps } from "@ui/Select";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useErrorTranslate } from "../../hooks/useErrorTranslate";

interface SelectAdapterProps<T extends FieldValues> extends Omit<
  SelectProps,
  "error" | "name" | "onChange" | "value"
> {
  control: Control<T>;
  name: Path<T>;
}

export const SelectAdapter = <T extends FieldValues>({
  control,
  name,
  ...props
}: SelectAdapterProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  const translateError = useErrorTranslate();

  return (
    <Select
      {...props}
      error={translateError(fieldState.error?.message)}
      name={field.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
      ref={field.ref}
      value={field.value}
    />
  );
};
