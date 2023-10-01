import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Edit Customer",
  description: "Update customer",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Customer Edit Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
