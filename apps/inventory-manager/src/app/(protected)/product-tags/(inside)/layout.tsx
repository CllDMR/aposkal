import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Product Tags",
  description: "List of product tags",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Product Tags Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
