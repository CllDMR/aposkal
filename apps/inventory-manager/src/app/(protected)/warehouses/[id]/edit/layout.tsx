import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Edit Warehouse",
  description: "Update warehouse",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Warehouse Edit Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
