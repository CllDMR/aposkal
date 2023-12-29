"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";

import { Form } from "@acme/ui/atoms";

import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

interface SelectTenantProps {
  tenants: RouterOutputs["tenant"]["listOfUserTenants"];
}

export const SelectTenant: FC<SelectTenantProps> = ({
  tenants: initialTenants,
}) => {
  const router = useRouter();

  const { data, update } = useSession();

  const [tenants] = api.tenant.listOfUserTenants.useSuspenseQuery(undefined, {
    initialData: initialTenants,
  });

  return (
    <>
      {tenants.length === 0 && <p>No tenant</p>}

      <div className="mt-5 overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {tenants.map((tenant) => (
            <li key={tenant.id}>
              <Form
                variant="none"
                onSubmit={async (e) => {
                  e.preventDefault();

                  await update({
                    ...data,
                    user: { ...data?.user, ti: tenant.id, tn: tenant.title },
                  });

                  router.push("/");
                }}
              >
                <button
                  type="submit"
                  className="hover:text-primary block w-full cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center px-2 py-2 sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="truncate">
                        <div className="flex text-sm">
                          <p className="truncate font-medium">{tenant.title}</p>
                        </div>
                        <div className="flex p-0.5">
                          <div className="flex items-center text-sm text-gray-500">
                            <p>Vkn: {tenant.taxNo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              </Form>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
