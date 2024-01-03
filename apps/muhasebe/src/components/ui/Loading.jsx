import { Logo } from "@/components/landing/Logo";

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

const Loading = ({ text }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="-mt-32 flex flex-col items-center justify-start">
        <div className=" flex justify-center h-28">
          <Logo className="h-10 w-auto" width={150} />
        </div>
        <div className="-mt-12 h-28 text-center">
          <Loader type="1" className="ml-12" />
        </div>
        <div className="-mt-4">
          <p className="text-sm font-medium text-gray-500">
            Lütfen bekleyin...
          </p>
          {text ? <p>{text}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Loading;
