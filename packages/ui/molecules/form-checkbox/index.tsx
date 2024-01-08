"use client";

import type { FieldValuesFromFieldErrors } from "@hookform/error-message";
import { ErrorMessage } from "@hookform/error-message";
import clsx from "clsx";
import get from "lodash.get";
import type {
  DeepMap,
  FieldError,
  FieldErrors,
  FieldName,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { Checkbox } from "../../atoms/checkbox";
import { FormErrorMessage } from "../../atoms/form-error-message";
import type { InputProps } from "../../atoms/input";
import { Label } from "../../atoms/label";

export type FormCheckboxProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<FieldErrors<TFormValues>>;
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

  const { ref, ...rest } = register?.(name, rules) ?? {};

  return (
    <div className={clsx("", className)} aria-live="polite">
      <div className="flex">
        {label ? <Label label={label} name={name} /> : null}
        <Checkbox
          name={name}
          label={label}
          aria-invalid={hasError}
          className={clsx({
            "border-danger-600 hover:border-danger-600 focus:border-danger-600 focus:ring-danger-600 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50":
              hasError,
          })}
          innerRef={ref}
          {...props}
          {...rest}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={
          name as unknown as FieldName<
            FieldValuesFromFieldErrors<
              Partial<DeepMap<TFormValues, FieldError>>
            >
          >
        }
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};
