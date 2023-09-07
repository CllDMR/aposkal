import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@acme/auth";
import { db } from "@acme/db";

import { Main } from "~/components/atoms/Main";
import { Button } from "~/components/molecules/button";
import { TenantWithUsersTable } from "~/components/organisms/tenant-with-users/TenantWithUsersTable";

export default async function SettingsTenantPage() {
  const session = await getServerSession(authOptions);

  if (!session) throw new Error("No Session");

  const tenantWithUsers = await db.query.tenant.findFirst({
    with: {
      usersToTenants: {
        with: { user: true },
      },
    },
    where: (tenants, { eq }) => eq(tenants.id, session.user.ti),
  });

  if (!tenantWithUsers) notFound();

  return (
    <Main>
      <div className="flex justify-between">
        <p>{tenantWithUsers.name}</p>

        <Link href={`/settings/tenant/add-user`}>
          <Button>Add User</Button>
        </Link>
      </div>

      <TenantWithUsersTable tenantWithUsers={tenantWithUsers} />
    </Main>
  );
}