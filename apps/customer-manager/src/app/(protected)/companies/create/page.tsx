import { auth } from "@acme/auth";

import { CompanyCreateForm } from "~/components/organisms/company/CompanyCreateForm";

export default async function CompanyCreatePage() {
  const session = await auth();
  if (!session) throw new Error("No Session");

  return <CompanyCreateForm />;
}
