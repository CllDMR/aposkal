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

import { Checkbox } from "~/atoms/form/checkbox";
import { FormErrorMessage } from "~/atoms/form/form-error-message";
import type { InputProps } from "~/atoms/form/input";
import { Label } from "~/atoms/form/label";

export type FormCheckboxProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, "name" | "type">;

export const FormCheckbox = <TFormValues extends FieldValues>({
  name,
  label,
  register,
  rules,
  errors,
  className,
  ...props
}: FormCheckboxProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={clsx("", className)} aria-live="polite">
      <div className="flex">
        <Label label={label} name={name} />
        <Checkbox
          name={name}
          label={label}
          aria-invalid={hasError}
          className={clsx({
            "border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50":
              hasError,
          })}
          {...props}
          {...register?.(name, rules)}
        />
      </div>
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
