import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Product Category Create Page",
  description: "Create new product category",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Product Category Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
