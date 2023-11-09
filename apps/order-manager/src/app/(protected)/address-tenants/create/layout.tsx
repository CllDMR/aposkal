import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Address Tenant Create Page",
  description: "Create new address tenant",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Address Tenant Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
