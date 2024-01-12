import Link from "next/link";

import type { RouterOutputs } from "@acme/api";
import { auth } from "@acme/auth";
import { db, desc, eq, inArray, schema } from "@acme/db";

import { SelectCompany } from "~/components/auth";
import { Logo } from "~/components/landing";

export const metadata = {
  title: "Select Company",
};

export default async function Page() {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const usertenants = await db
    .select()
    .from(schema.usersToTenants)
    .where(eq(schema.usersToTenants.userId, session.user.id))
    .orderBy(desc(schema.usersToTenants.tenantId));

  let tenants: RouterOutputs["tenant"]["listOfUserTenants"] = [];

  if (usertenants.length > 0) {
    tenants = await db
      .select()
      .from(schema.tenant)
      .where(
        inArray(
          schema.tenant.id,
          usertenants.map((e) => e.tenantId),
        ),
      )
      .orderBy(desc(schema.tenant.title));
  }

  // if (!session?.user) redirect(`/auth/verify-email/verifiedError`);

  // const tenants = await db.select().from(schema.tenant).limit(10);
  // // .where(eq(schema.tenant.id, session.user.tn));

  // if (tenants.length === 0) redirect(`/app/createCompany`);

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <div className="mt-14 flex h-28 justify-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" width={150} />
        </Link>
      </div>

      <ul className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:mx-auto md:w-2/3">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Firma Seçin
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <Link
                href="/auth/create-company"
                type="button"
                className="relative inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Yeni Firma Ekle
              </Link>
            </div>
          </div>
        </div>

        <SelectCompany tenants={tenants} />
      </ul>
    </div>
  );
}
