import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Warehouses",
  description: "List of warehouses",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Warehouses Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
