import { InputBase, type InputBaseProps } from "@ui/InputBase";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useErrorTranslate } from "../../hooks/useErrorTranslate";

interface PhoneInputAdapterProps<T extends FieldValues> extends Omit<
  InputBaseProps,
  "error"
> {
  // InputBase полиморфный: атрибуты самого поля в его пропсах не описаны
  autoComplete?: string;
  control: Control<T>;
  mask: string;
  name: Path<T>;
  placeholder?: string;
}

// Поле телефона с маской: в форму попадает отформатированный номер
export const PhoneInputAdapter = <T extends FieldValues>({
  control,
  mask,
  name,
  ...props
}: PhoneInputAdapterProps<T>) => {
  const { field, fieldState } = useController({ control, name });
  const translateError = useErrorTranslate();

  return (
    <InputBase
      {...props}
      component={IMaskInput}
      error={translateError(fieldState.error?.message)}
      inputMode="tel"
      inputRef={field.ref}
      mask={mask}
      name={field.name}
      onAccept={(value: string) => field.onChange(value)}
      onBlur={field.onBlur}
      type="tel"
      value={field.value}
    />
  );
};
