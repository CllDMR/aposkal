import { revalidatePath } from "next/cache";
import { zfd } from "zod-form-data";

import { db, desc, eq, schema } from "@acme/db";

export default async function SelectTenantPage() {
  const tenants = await db
    .select()
    .from(schema.tenant)
    .orderBy(desc(schema.tenant.name));

  async function createAction(formData: FormData) {
    "use server";
    const validationSchema = zfd.formData({
      name: zfd.text(),
    });

    const result = validationSchema.safeParse(formData);

    if (result.success) {
      await db.insert(schema.tenant).values(result.data);
      revalidatePath("/auth/select-tenant");
    } else console.error(result.error.flatten());
  }

  async function deleteAction(formData: FormData) {
    "use server";
    const validationSchema = zfd.formData({
      id: zfd.text(),
    });

    const result = validationSchema.safeParse(formData);

    if (result.success) {
      await db
        .delete(schema.tenant)
        .where(eq(schema.tenant.id, result.data.id));
      revalidatePath("/auth/select-tenant");
    } else console.error(result.error.flatten());
  }

  return (
    <main>
      <form className="" action={createAction}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>

        <button type="submit">Send</button>
      </form>

      {tenants?.map((tenant) => (
        <div key={tenant.id} className="flex gap-2">
          <span>{tenant.name}</span>
          <form action={deleteAction}>
            <input type="hidden" name="id" defaultValue={tenant.id} />
            <button type="submit">Delete</button>
          </form>
        </div>
      ))}
      {tenants.length === 0 && <p>No tenant</p>}
    </main>
  );
}
