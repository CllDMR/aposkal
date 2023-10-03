import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Product Tag Create Page",
  description: "Create new product tag",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Product Tag Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
