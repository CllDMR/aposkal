import { redirect } from "next/navigation";
import { Header, SideBarLayout } from "@/components/company";
import { _getCompanyById } from "@/lib/services";

export default async function Layout({ children, params }) {
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
    <div className="h-screen bg-slate-50">
      <SideBarLayout company={company} />
      <div className="flex h-full flex-col lg:pl-52 ">
        <Header session={session} company={company} />
        <main className="h-full overflow-scroll bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
