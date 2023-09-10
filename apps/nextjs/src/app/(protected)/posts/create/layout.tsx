import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "~/components/atoms/Main";

export const metadata = {
  title: "Post Create Page",
  description: "Create new post",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Post Create Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
