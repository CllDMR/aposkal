import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "Edit Supplier",
  description: "Update supplier",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1 className="sr-only">Supplier Edit Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
