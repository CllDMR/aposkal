import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import get from "lodash.get";
import type {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { FormErrorMessage } from "~/components/atoms/form/form-error-message";
import type { InputProps } from "~/components/atoms/form/input";
import { Input } from "~/components/atoms/form/input";
import { Label } from "~/components/atoms/form/label";

export type FormInputProps<TFormValues extends FieldValues> = {
  label: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends FieldValues>({
  name,
  label,
  register,
  rules,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={clsx("", className)} aria-live="polite">
      <Label label={label} name={name} />
      <Input
        name={name}
        label={label}
        aria-invalid={hasError}
        className={clsx({
          "border-red-600 transition-colors hover:border-red-600 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50":
            hasError,
        })}
        {...props}
        {...register?.(name, rules)}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
