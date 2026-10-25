import { TextInput, type TextInputProps } from "@ui/TextInput";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useErrorTranslate } from "../../hooks/useErrorTranslate";

interface TextInputAdapterProps<T extends FieldValues> extends Omit<
  TextInputProps,
  "error" | "name" | "onChange" | "value"
> {
  control: Control<T>;
  name: Path<T>;
}

export const TextInputAdapter = <T extends FieldValues>({
  control,
  name,
  ...props
}: TextInputAdapterProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  const translateError = useErrorTranslate();

  return (
    <TextInput
      {...props}
      {...field}
      error={translateError(fieldState.error?.message)}
    />
  );
};
