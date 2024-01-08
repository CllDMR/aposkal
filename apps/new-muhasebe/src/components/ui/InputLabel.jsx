export const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
    >
      {children}
    </label>
  );
};
