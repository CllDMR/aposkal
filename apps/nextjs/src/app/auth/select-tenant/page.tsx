import { revalidatePath } from "next/cache";

import { db, schema } from "@acme/db";
import type { InsertTenant } from "@acme/db/schema/auth";

export default async function SelectTenantPage() {
  const tenants = await db.select().from(schema.tenant);

  const action = async (formData: FormData) => {
    "use server";

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values: InsertTenant = JSON.parse(
      JSON.stringify(Object.fromEntries(formData)),
    );

    await db.insert(schema.tenant).values(values);

    revalidatePath("/auth/select-tenant");
  };

  return (
    <main>
      <form className="" action={action}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>

        <button type="submit">Send</button>
      </form>

      {tenants?.map((tenant) => <div key={tenant.id}>{tenant.name}</div>)}
      {tenants.length === 0 && <p>No tenant</p>}
    </main>
  );
}
