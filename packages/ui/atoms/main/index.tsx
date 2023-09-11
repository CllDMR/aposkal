import type { FC, PropsWithChildren } from "react";

export const Main: FC<PropsWithChildren> = ({ children }) => (
  <main className="px-4 py-8 sm:px-6 lg:pl-60 lg:pr-8">{children}</main>
);
