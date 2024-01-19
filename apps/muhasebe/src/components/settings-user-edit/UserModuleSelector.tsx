/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";

import { sidebarItems } from "@acme/util";

const permissions = [
  { id: "false", title: "Yetki Yok" },
  { id: "read", title: "Görüntüler" },
  { id: "all", title: "Tüm İşlemler" },
];

interface UserModuleSelectorProps {
  callback: any;
  initValue: any;
}

export const UserModuleSelector: FC<UserModuleSelectorProps> = ({
  callback,
  initValue,
}) => {
  const modules = sidebarItems.map((item) => item.name);

  const initTermObj = modules.reduce(
    (acc, item) => {
      acc[item] = initValue?.[item] ? initValue[item] : "false";
      return acc;
    },
    {} as Record<string, string>,
  );

  const [permissionObj, setPermissionObj] = useState(initTermObj);

  const handlePermissionChange = (module: any, permission: any) => {
    setPermissionObj({ ...permissionObj, [module]: permission });
  };

  useEffect(() => {
    callback?.(permissionObj);
  }, [callback, permissionObj]);

  return (
    <div className="mt-2 -space-y-px divide-y rounded-md border bg-white">
      {/* render sidebarItemsNames array items  */}
      {Object.keys(permissionObj).map((item, index) => (
        <div key={index}>
          <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700">
            <div className="flex-shrink-0">{item}</div>

            <div>
              <label className="text-base font-semibold leading-6 text-gray-700"></label>

              <fieldset className="">
                <legend className="sr-only">Notification method</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {permissions.map((per) => (
                    <div key={per.id} className="flex items-center">
                      <input
                        id={per.id + item}
                        name={item}
                        type="radio"
                        defaultChecked={permissionObj[item] === per.id}
                        className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-500"
                        onChange={() => handlePermissionChange(item, per.id)}
                      />
                      <label
                        htmlFor={per.id + item}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {per.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
