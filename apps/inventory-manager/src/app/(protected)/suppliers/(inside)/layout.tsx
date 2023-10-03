import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Suppliers",
  description: "List of suppliers",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Suppliers Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
