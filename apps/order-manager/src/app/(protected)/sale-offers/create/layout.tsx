import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "SaleOffer Create Page",
  description: "Create new saleOffer",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">SaleOffer Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
