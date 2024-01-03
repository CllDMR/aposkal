import Header from "@/app/[companyId]/Header";
import SideBarLayout from "@/app/[companyId]/SideBarLayout";
import { redirect } from "next/navigation";

import { _getCompanyById } from "@db/index";

export default async function AppLayout({ children, params }) {
  const companyId = params?.companyId;

  if (!companyId || isNaN(companyId)) return redirect("/auth/unauthorized");

  const company = await _getCompanyById({
    companyId,
    getSession: true,
  });

  if (!company?.data) return redirect("/auth/unauthorized");
  if (!company?.perm?.isActive) return redirect("/auth/unauthorized");

  const session = company.session;

  return (
    <div className="h-screen  bg-slate-50">
      <SideBarLayout company={company} />
      <div className="flex h-full flex-col lg:pl-52 ">
        <Header session={session} company={company} />
        <main className="py-5 px-4 h-full overflow-scroll bg-slate-50 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// export const dynamic = "force-dynamic";
