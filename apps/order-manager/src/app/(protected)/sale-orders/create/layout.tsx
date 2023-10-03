import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "SaleOrder Create Page",
  description: "Create new saleOrder",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">SaleOrder Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
