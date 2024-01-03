import { Logo } from "@/components/landing/Logo";
import { _getCompaniesByUid, getAuth } from "@db/index";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

const CompanyList = async () => {
  const auth = await getAuth();
  if (!auth.user?.emailVerified) redirect(`/auth/verify-email/verifiedError`);
  // if (auth.user === null) redirect(`/auth/login`);

  const companies = await _getCompaniesByUid(auth?.user?.id);
  if (companies.length === 0) redirect(`/app/createCompany`);

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <div className=" flex mt-14 justify-center h-28">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>

      <ul
        role="list"
        className="md:mx-auto  divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:w-2/3"
      >
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Firma Seçin
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <Link
                href="/app/createCompany"
                type="button"
                className="relative inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Yeni Firma Ekle
              </Link>
            </div>
          </div>
        </div>
        {companies.length > 0 &&
          companies.map((company) => (
            <li
              key={company.id}
              className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <Link href={`/app/${company.id}`}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {company.title}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CompanyList;

//  if (data.length === 1) redirect(`/app/${data[0].id}`);
