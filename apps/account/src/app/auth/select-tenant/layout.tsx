import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
