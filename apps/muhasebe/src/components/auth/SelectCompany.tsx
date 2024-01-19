"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";

import type { RouterOutputs } from "@acme/api";
import { api } from "@acme/util";

interface SelectCompanyProps {
  tenants: RouterOutputs["tenant"]["listOfUserTenants"];
}

export const SelectCompany: FC<SelectCompanyProps> = ({
  tenants: initialTenants,
}) => {
  const router = useRouter();

  const { data, update } = useSession({
    required: true,
    onUnauthenticated() {
      void router.push("/");
    },
  });

  const [tenants] = api.tenant.listOfUserTenants.useSuspenseQuery(undefined, {
    initialData: initialTenants,
  });

  if (tenants.length <= 0) return null;

  return tenants.map((tenant) => (
    <li key={tenant.id}>
      <form
        className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
        onSubmit={async (e) => {
          e.preventDefault();

          await update({
            ...data,
            user: { ...data?.user, ti: tenant.id, tn: tenant.title },
          });

          router.push("/dashboard");
          router.refresh();
        }}
      >
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <button type="submit">
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {tenant.title}
              </button>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <ChevronRightIcon
            className="h-5 w-5 flex-none text-gray-400"
            aria-hidden="true"
          />
        </div>
      </form>
    </li>
  ));
};
