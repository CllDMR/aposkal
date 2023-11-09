import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Address Tenants",
  description: "List of address tenants",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Address Tenants Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
