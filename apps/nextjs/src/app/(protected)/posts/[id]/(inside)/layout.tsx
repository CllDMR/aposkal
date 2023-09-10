import type { PropsWithChildren } from "react";
import type { NextPage } from "next";

import { Main } from "@acme/ui";

export const metadata = {
  title: "Posts",
  description: "List of posts",
};

type LayoutProps = PropsWithChildren & {
  params: {
    id: string;
  };
};

const Layout: NextPage<LayoutProps> = ({ children, params: { id } }) => {
  return (
    <Main>
      <h1>Post {id} Page</h1>

      {children}
    </Main>
  );
};

export default Layout;
