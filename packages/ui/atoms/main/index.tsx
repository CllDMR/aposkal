import type { FC, PropsWithChildren } from "react";

export const Main: FC<PropsWithChildren> = ({ children }) => (
  <main className="px-4 py-8 sm:px-6 lg:pl-72 lg:pr-12">{children}</main>
);
