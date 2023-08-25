import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";

import { db, desc, schema } from "@acme/db";

export default async function SelectTenantPage() {
  const tenants = await db
    .select()
    .from(schema.tenant)
    .orderBy(desc(schema.tenant.name));

  const action = async (formData: FormData) => {
    "use server";
    const validationSchema = zfd.formData({
      name: zfd.text(),
    });

    const result = validationSchema.safeParse(formData);

    if (result.success) {
      await db.insert(schema.tenant).values(result.data);
      revalidatePath("/auth/select-tenant");
    } else console.error(result.error.flatten());
  };

  return (
    <main>
      <form className="" action={action}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>

        <button type="submit">Send</button>
      </form>

      {tenants?.map((tenant) => <div key={tenant.id}>{tenant.name}</div>)}
      {tenants.length === 0 && <p>No tenant</p>}
    </main>
  );
}
