"use client";

import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";

const settings = [
  {
    id: "owner",
    name: "Hesap Sahibi",
    description: "Hesabı oluşturan kullanıcı. Tüm işlemlere yetkili.",
    disabled: true,
  },
  {
    id: "ADMIN",
    name: "Yetkili",
    description: "Yetkili kullanıcılar tüm işlemlere yetkilidir.",
    disabled: false,
  },
  {
    id: "USER",
    name: "Kullanıcı",
    description:
      "Ayarları görüntüleyemez değiştiremez. Kullanıcı davet edip silemez. Şirket verilerine erişebilir",
    disabled: false,
  },
];

interface UserRoleSelectorProps {
  callback: Dispatch<SetStateAction<string | null>>;
  initValue: string | null;
}

export const UserRoleSelector: FC<UserRoleSelectorProps> = ({
  callback,
  initValue,
}) => {
  const init = settings.find((s) => s.id === initValue) ?? settings[1]!;
  const [selected, setSelected] = useState(init);

  useEffect(() => {
    const init = settings.find((s) => s.id === initValue) ?? settings[1]!;

    setSelected(init);
  }, [initValue]);

  useEffect(() => {
    callback(selected.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only"> Privacy setting </RadioGroup.Label>
      <div className="-space-y-px rounded-md bg-white">
        {settings.map((setting, settingIdx) => (
          <RadioGroup.Option
            key={setting.name}
            disabled={setting.disabled}
            value={setting}
            className={({ checked }) =>
              clsx(
                settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                settingIdx === settings.length - 1
                  ? "rounded-bl-md rounded-br-md"
                  : "",
                checked ? "z-10 border-teal-200 bg-teal-50" : "border-gray-200",
                "relative flex cursor-pointer border p-4 focus:outline-none",
                setting.disabled && "cursor-not-allowed opacity-50",
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={clsx(
                    checked
                      ? "border-transparent bg-teal-600"
                      : "border-gray-300 bg-white",
                    active ? "ring-2 ring-teal-500 ring-offset-2" : "",
                    "mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border",
                  )}
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={clsx(
                      checked ? "text-teal-900" : "text-gray-900",
                      "block text-sm font-medium",
                    )}
                  >
                    {setting.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={clsx(
                      checked ? "text-teal-700" : "text-gray-500",
                      "block text-sm",
                    )}
                  >
                    {setting.description}
                  </RadioGroup.Description>
                </span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};
