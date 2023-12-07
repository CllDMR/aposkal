import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";
import { CreateNewSection } from "@acme/ui/organisms";

export const metadata = {
  title: "Warehouses",
  description: "List of warehouses",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Warehouses Page</h1>

      <CreateNewSection href="/warehouses/create" label="Create new" />

      {children}
    </Main>
  );
};

export default Layout;
