import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Customer Create Page",
  description: "Create new customer",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Customer Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
