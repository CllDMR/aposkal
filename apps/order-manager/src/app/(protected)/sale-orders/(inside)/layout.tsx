import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";
import { CreateNewSection } from "@acme/ui/organisms";

export const metadata = {
  title: "SaleOrders",
  description: "List of saleOrders",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">SaleOrders Page</h1>

      <CreateNewSection href="/sale-orders/create" label="Create new" />

      {children}
    </Main>
  );
};

export default Layout;
