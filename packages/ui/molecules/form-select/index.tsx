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

import { FormErrorMessage } from "../../atoms/form-error-message";
import { Label } from "../../atoms/label";
import type { SelectProps } from "../../atoms/select";
import { Select } from "../../atoms/select";

export type FormSelectProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<FieldErrors<TFormValues>>;
} & Omit<SelectProps, "name">;

export const FormSelect = <TFormValues extends FieldValues>({
  name,
  label,
  register,
  rules,
  errors,
  className,
  children,
  ...props
}: FormSelectProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={clsx("", className)} aria-live="polite">
      {label ? <Label label={label} name={name} /> : null}
      <Select
        name={name}
        label={label}
        aria-invalid={hasError}
        className={clsx({
          "border-danger-600 transition-colors hover:border-danger-600 focus:border-danger-600 focus:outline-none focus:ring-2 focus:ring-danger-600 focus:ring-opacity-50":
            hasError,
        })}
        {...props}
        {...register?.(name, rules)}
      >
        {children}
      </Select>
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
