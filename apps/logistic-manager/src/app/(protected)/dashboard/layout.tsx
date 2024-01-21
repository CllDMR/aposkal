import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Dashboard",
  description: "Metrics about your data",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return <Main>{children}</Main>;
};

export default Layout;
