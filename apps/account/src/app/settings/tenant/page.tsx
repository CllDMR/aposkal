import { auth } from "@acme/auth";
import { db, desc, eq, schema, sql } from "@acme/db";
import { Main } from "@acme/ui/atoms";
import { LinkButton } from "@acme/ui/molecules";

import { TenantWithUsersTable } from "~/components/organisms/tenant-with-users/TenantWithUsersTable";

export default async function SettingsTenantPage({
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await auth();
  if (!session) throw new Error("No Session");

  const pageIndex = +(searchParams.pi ?? 0);
  const pageSize = +(searchParams.ps ?? 10);

  const usersOfTenant = await db.query.usersToTenants.findMany({
    where: (usersToTenant, { eq }) =>
      eq(usersToTenant.tenantId, session.user.ti),
    with: { user: true },
    orderBy: desc(schema.usersToTenants.userId),
    offset: pageIndex * pageSize,
    limit: pageSize,
  });

  const { totalCount } = (
    await db
      .select({
        totalCount: sql`count(*)`.mapWith(Number).as("totalCount"),
      })
      .from(schema.usersToTenants)
      .where(eq(schema.usersToTenants.tenantId, session.user.ti))
  ).at(0) ?? { totalCount: 0 };

  return (
    <Main>
      <div className="flex justify-end">
        <LinkButton href={`/settings/tenant/add-user`}>Add User</LinkButton>
      </div>

      <TenantWithUsersTable
        users={usersOfTenant.flatMap((e) => e.user)}
        totalCount={totalCount}
      />
    </Main>
  );
}
