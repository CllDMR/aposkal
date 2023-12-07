import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";
import { CreateNewSection } from "@acme/ui/organisms";

export const metadata = {
  title: "Address Companies",
  description: "List of address companies",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Address Companies Page</h1>

      <CreateNewSection href="/address-companies/create" label="Create new" />

      {children}
    </Main>
  );
};

export default Layout;
