import Image from "next/image";

import type { RouterOutputs } from "@acme/api";
import { auth } from "@acme/auth";
import { db, desc, eq, inArray, schema } from "@acme/db";

import { CreateTenant } from "~/components/organisms/auth/CreateTenant";
import { SelectTenant } from "~/components/organisms/auth/SelectTenant";

export default async function SelectTenantPage() {
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

  return (
    <main>
      <div className="min-h-screen bg-gray-50 p-10 md:px-36">
        <div className="xl:px-60 ">
          <div className="xl:mb-20">
            <div className="flex justify-center ">
              <Image
                className="h-48 w-48"
                src="/logo.svg"
                alt="Aposkal Logo"
                width={286.3}
                height={141.73}
                priority
              />
            </div>
            {/* <p className="text-sm text-center text-gray-500">
              {packageJson.version}
            </p> */}
          </div>

          <CreateTenant />

          <SelectTenant tenants={tenants} />
        </div>
      </div>
    </main>
  );
}
