import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Edit SaleOrder",
  description: "Update saleOrder",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>SaleOrder Edit Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
