import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "SaleOrders",
  description: "List of saleOrders",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>SaleOrders Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
