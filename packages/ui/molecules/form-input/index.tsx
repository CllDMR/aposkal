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
import type { InputProps } from "../../atoms/input";
import { Input } from "../../atoms/input";
import { Label, LabelVariant } from "../../atoms/label";


const VARIANT_MAPS: Record<LabelVariant, string> = {
  [LabelVariant.OVERLAPPING]: "relative",
  [LabelVariant.DEFAULT]: "",
};

export type FormInputProps<TFormValues extends FieldValues> = {
  label?: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<FieldErrors<TFormValues>>;
  variant?: LabelVariant;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends FieldValues>({
  name,
  label,
  register,
  rules,
  errors,
  className,
  variant = LabelVariant.DEFAULT,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div
      className={clsx(
        "",
        className,
        VARIANT_MAPS[variant] || VARIANT_MAPS[LabelVariant.DEFAULT],
      )}
      aria-live="polite"
    >
      {label ? (
        <Label
          variant={variant}
          label={label}
          name={name}
        />
      ) : null}
      <Input
        name={name}
        label={label}
        aria-invalid={hasError}
        className={clsx({
          "border-danger-600 hover:border-danger-600 focus:border-danger-600 focus:ring-danger-600 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50":
            hasError,
        })}
        {...props}
        {...register?.(name, rules)}
      />
      {hasError ? (
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
      ) : null}
    </div>
  );
};



FormInput.variant = LabelVariant;