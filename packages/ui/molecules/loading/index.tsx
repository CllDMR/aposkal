import type { FC } from "react";

import { Logo } from "../../atoms";

export const Loading: FC<{ text?: string }> = ({ text }) => {
  const color = "#34BE82";
  return (
    <div className="absolute left-0 top-0 flex h-full min-h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="-mt-32 flex flex-col items-center justify-start">
        <div className="flex h-28 justify-center">
          <Logo className="w-36" />
        </div>
        <div className="-mt-12 h-28 text-center">
          <svg
            version="1.1"
            id="L4"
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            xmlSpace="preserve"
            className={"ml-12 h-full"}
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
