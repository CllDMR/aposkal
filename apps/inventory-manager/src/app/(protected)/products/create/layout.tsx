import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Product Create Page",
  description: "Create new product",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Product Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
