import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";
import { CreateNewSection } from "@acme/ui/organisms";

export const metadata = {
  title: "Companies",
  description: "List of companies",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Companies Page</h1>

      <CreateNewSection href="/companies/create" label="Create new" />

      {children}
    </Main>
  );
};

export default Layout;
