import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Supplier Create Page",
  description: "Create new supplier",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Supplier Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
