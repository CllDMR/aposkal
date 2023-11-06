"use client";

import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import type { FieldValuesFromFieldErrors } from "@hookform/error-message";
import { ErrorMessage } from "@hookform/error-message";
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
import { cn } from "../../utils/cn";

export type FormTextareaProps<TFormValues extends FieldValues> = {
  id: string;
  name: Path<TFormValues>;
  label?: string;
  className?: string;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<FieldErrors>;
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const FormTextarea = <TFormValues extends FieldValues>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  className,
  ...props
}: FormTextareaProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={className}>
      {label ? <Label label={label} name={name} /> : null}
      <textarea
        id={id}
        name={name}
        aria-label={label}
        aria-invalid={!!(errors && errorMessages)}
        className={cn(
          "relative block w-full resize-none appearance-none overflow-auto rounded border border-gray-300 bg-gray-50 p-3 text-base leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-primary-400 focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-400 focus:ring-opacity-30",
          {
            "border-danger-600 hover:border-danger-600 focus:border-danger-600 focus:ring-danger-600 focus:ring-opacity-50":
              hasError,
          },
        )}
        {...props}
        {...register?.(name, rules)}
      />
      <ErrorMessage
        errors={errors}
        name={
          name as FieldName<
            FieldValuesFromFieldErrors<
              Partial<DeepMap<TFormValues, FieldError>>
            >
          >
        }
        render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
      />
    </div>
  );
};
