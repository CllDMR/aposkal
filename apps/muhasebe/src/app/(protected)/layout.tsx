import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import { Header, SideBarLayout } from "~/components/company";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/auth/unauthorized");

  return (
    <div className="bg-slate-50 h-screen">
      <SideBarLayout />
      <div className="flex h-full flex-col lg:pl-52 ">
        <Header session={session} tenantName={session.user.tn} />
        <main className="bg-slate-50 h-full overflow-scroll px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
