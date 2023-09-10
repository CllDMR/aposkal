import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "~/components/atoms/Main";

export const metadata = {
  title: "Edit Post",
  description: "Update post",
};

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <Main>
      <h1>Post Edit Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
