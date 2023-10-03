import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui/atoms";

export const metadata = {
  title: "SaleOrder",
  description: "A saleOrder",
};

type LayoutProps = PropsWithChildren & {
  params: {
    id: string;
  };
};

const Layout: NextPage<LayoutProps> = ({ children, params: { id } }) => {
  return (
    <Main>
      <h1 className="sr-only">SaleOrder {id} Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
