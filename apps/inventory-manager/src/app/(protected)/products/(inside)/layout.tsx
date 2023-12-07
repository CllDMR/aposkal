import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";
import { CreateNewSection } from "@acme/ui/organisms";

export const metadata = {
  title: "Products",
  description: "List of products",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Products Page</h1>

      <CreateNewSection href="/products/create" label="Create new" />

      {children}
    </Main>
  );
};

export default Layout;
