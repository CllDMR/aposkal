"use client";

import type { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type FormInputProps<TFormValues extends FieldValues> = {
  label?: string;
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<FieldErrors<TFormValues>>;
} & Omit<InputProps, "name">;

export const TextField = <TFormValues extends FieldValues>({
  name,
  label,
  register,
  rules,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className}>
      {label ? <Label label={label} name={name} /> : null}
      <Input
        name={name}
        label={label}
        {...props}
        {...register?.(name, rules)}
      />
    </div>
  );
};

type InputProps = {
  id: string;
  name: string;
  label?: string;
  className?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref"
>;

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, label, type = "text", placeholder, ...props }, ref) => {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        placeholder={placeholder}
        className={
          "block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
        }
        {...props}
      />
    );
  },
);

Input.displayName = "InputField";

interface LabelProps {
  name: string;
  label: string;
}

const Label: FC<LabelProps> = ({ label, name }) => {
  return (
    <label
      htmlFor={name}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
  );
};
