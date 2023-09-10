import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui";

export const metadata = {
  title: "Posts",
  description: "List of posts",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Posts Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
