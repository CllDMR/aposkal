import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
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

import { FormErrorMessage } from "~/atoms/form/form-error-message";
import { Label } from "~/atoms/form/label";

export type FormTextareaProps<TFormValues extends FieldValues> = {
  id: string;
  name: Path<TFormValues>;
  label: string;
  className?: string;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
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
      <Label label={label} name={name} />
      <textarea
        id={id}
        name={name}
        aria-label={label}
        aria-invalid={!!(errors && errorMessages)}
        className={clsx(
          "hover:border-blue-400 focus:border-blue-400 focus:ring-blue-400 relative block w-full resize-none appearance-none overflow-auto rounded border border-gray-300 bg-gray-50 p-3 text-base leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-30",
          hasError
            ? "border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            : "",
        )}
        {...props}
        {...register?.(name, rules)}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
      />
    </div>
  );
};
