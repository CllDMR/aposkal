import { redirect } from "next/navigation";
import Header from "@/app/[companyId]/Header";
import SideBarLayout from "@/app/[companyId]/SideBarLayout";
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
    <div className="bg-slate-50 h-screen">
      <SideBarLayout company={company} />
      <div className="flex h-full flex-col lg:pl-52 ">
        <Header session={session} company={company} />
        <main className="bg-slate-50 h-full overflow-scroll px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// export const dynamic = "force-dynamic";
