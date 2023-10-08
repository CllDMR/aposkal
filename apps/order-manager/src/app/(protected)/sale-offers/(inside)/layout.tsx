import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "SaleOffers",
  description: "List of saleOffers",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">SaleOffers Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
