export const Spinner = ({ size = "5" }) => {
  let className = "h-" + size + " w-" + size + " ";
  return (
    <div className="-mt-5 translate-x-1/2 translate-y-1/2 transform pt-0">
      <div
        className={
          "tw-border-t-transparent animate-spin rounded-full  border-4 border-solid border-blue-400 " +
          className
        }
        style={{ borderTopColor: "transparent" }}
      />
    </div>
  );
};
