import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Warehouse Create Page",
  description: "Create new warehouse",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Warehouse Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
