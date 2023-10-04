import type { FC, PropsWithChildren } from "react";

export const FormBottom: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="col-span-full mt-4 flex justify-end border-t pt-4">
      {children}
    </div>
  );
};
