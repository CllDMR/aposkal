"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getSidebarItems } from "~/utils/sidebaritems";

const permissions = [
  { id: "false", title: "Yetki Yok" },
  { id: "read", title: "Görüntüler" },
  { id: "all", title: "Tüm İşlemler" },
];

export const UserModuleSelector = ({ callback, initValue }) => {
  const params = useParams();

  const navigation = getSidebarItems(params.companyId);
  const modules = navigation.map((item) => item.name);

  const initTermObj = modules.reduce((acc, item) => {
    acc[item] = initValue?.[item] ? initValue[item] : "false";
    return acc;
  }, {});

  const [permissionObj, setPermissionObj] = useState(initTermObj);

  const handlePermissionChange = (module, permission) => {
    setPermissionObj({ ...permissionObj, [module]: permission });
  };

  useEffect(() => {
    callback && callback(permissionObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionObj]);

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
                        onChange={(e) => handlePermissionChange(item, per.id)}
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
