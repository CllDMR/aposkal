import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";
import { CreateNewSection } from "@acme/ui/organisms";

export const metadata = {
  title: "Product Categories",
  description: "List of product categories",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Product Categories Page</h1>

      <CreateNewSection href="/product-categories/create" label="Create new" />

      {children}
    </Main>
  );
};

export default Layout;
