const Button = (props) => {
  const {
    loading,
    children,
    size = "md",
    color = "primary",
    className,
    type = "button",
    disabled = false,
    ...rest
  } = props;

  const opacity = " opacity-50 ";
  const defaultClass =
    "inline-flex justify-center border border-transparent shadow-sm rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2";

  let sizeClass;
  if (size === "sm") sizeClass = " px-2.5 py-1.5 text-xs ";
  else if (size === "md") sizeClass = " px-4 py-2 text-sm font-medium ";
  else if (size === "lg") sizeClass = " px-6 py-3 text-base ";

  let colorClass;
  if (color === "primary")
    colorClass =
      "text-white bg-teal-600 hover:brightness-95 focus:ring-primary";
  else if (color === "secondary")
    colorClass =
      "text-teal-700 bg-teal-100 hover:brightness-95 focus:ring-secondary";
  else if (color === "tertiary")
    colorClass = "text-teal-700  hover:brightness-95 focus:ring-tertiary";
  else if (color === "danger")
    colorClass = "text-white bg-red-600 hover:brightness-95 focus:ring-primary";
  else if (color === "warning")
    colorClass =
      "text-white bg-orange-600 hover:brightness-95 focus:ring-primary";

  return (
    <button
      type={type}
      disabled={disabled}
      className={` ${sizeClass} ${colorClass}  ${defaultClass} ${
        className || ""
      } ${(disabled || loading) && opacity}`}
      {...rest}
    >
      {loading && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {/* <LockClosedIcon className="h-5 w-5 text-primary group-hover:text-primary" aria-hidden="true" /> */}
          <Loader size="12" colorName="white" />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;

const Loader = (props) => {
  const { type, className = "", colorName } = props;

  let color = "#34BE82";
  if (colorName === "secondary") color = "#2F86A6";
  if (colorName === "white") color = "#fff";

  const defaultClass = "h-full";

  if (type === "1")
    return (
      <svg
        version="1.1"
        id="L4"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        space="preserve"
        className={className + " " + defaultClass}
      >
        <circle fill={color} stroke="none" cx="6" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill={color} stroke="none" cx="26" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill={color} stroke="none" cx="46" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
    );

  if (type === "2")
    return (
      <svg
        className={className + " " + defaultClass}
        version="1.1"
        id="L5"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        space="preserve"
      >
        <circle fill={color} stroke="none" cx="6" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 15 ; 0 -15; 0 15"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill={color} stroke="none" cx="30" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 10 ; 0 -10; 0 10"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill={color} stroke="none" cx="54" cy="50" r="6">
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="translate"
            values="0 5 ; 0 -5; 0 5"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
    );

  return (
    <svg
      className={className + " " + defaultClass}
      version="1.1"
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      space="preserve"
    >
      <path
        fill={color}
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
