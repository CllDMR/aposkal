import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function InputError({ error, className = "" }) {
  if (error)
    return (
      <div className={className}>
        <div
          className="text-red-600 flex w-full py-1 text-xs "
          id="email-error"
        >
          <ExclamationTriangleIcon
            className="text-red-500 mr-1 h-4 w-4"
            aria-hidden="true"
          />
          {error}
        </div>
      </div>
    );

  return null;
}
