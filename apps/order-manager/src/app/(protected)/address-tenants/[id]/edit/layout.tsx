import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Edit Address Tenant",
  description: "Update address tenant",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Address Tenant Edit Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
