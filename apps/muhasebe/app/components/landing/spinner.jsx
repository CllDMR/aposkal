const Spinner = ({ size = "5" }) => {
  let className = "h-" + size + " w-" + size + " ";
  return (
    <div className="pt-0 -mt-5 transform translate-x-1/2 translate-y-1/2">
      <div
        className={
          "tw-border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 " +
          className
        }
        style={{ borderTopColor: "transparent" }}
      />
    </div>
  );
};

export default Spinner;
