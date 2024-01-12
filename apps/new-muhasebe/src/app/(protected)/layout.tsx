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
    <div className="h-screen bg-slate-50">
      <SideBarLayout />
      <div className="flex h-full flex-col lg:pl-52 ">
        <Header session={session} tenantName={session.user.tn} />
        <main className="h-full overflow-scroll bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
