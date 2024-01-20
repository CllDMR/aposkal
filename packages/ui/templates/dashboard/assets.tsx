"use client";

import {
  BanknotesIcon,
  Bars3Icon,
  BriefcaseIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  CalculatorIcon,
  CreditCardIcon,
  SwatchIcon,
  TicketIcon,
  TruckIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";

const data = [
  {
    label: "Kasa",
    value: "500.000",
    icon: (
      <BanknotesIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
    ),
    type: "positive",
  },
  {
    label: "Banka",
    value: "1.500.000",
    icon: (
      <BuildingLibraryIcon
        className="h-6 w-5 text-gray-400"
        aria-hidden="true"
      />
    ),
    type: "positive",
  },
  {
    label: "Pos",
    value: "1.500.000",
    icon: (
      <CalculatorIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
    ),
    type: "positive",
  },
  {
    label: "Kredi Kartı",
    value: "-35.000",
    icon: (
      <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
    ),
    type: "negative",
    divider: true,
  },

  {
    label: "Çek",
    value: "600.000",
    icon: <TicketIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />,
    type: "positive",
  },
  {
    label: "Senet",
    value: "-340.000",
    icon: <TicketIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />,
    type: "negative",
  },
  {
    label: "Firmalar (Alacaklar)",
    value: "2.300.000",
    icon: (
      <BuildingOfficeIcon
        className="h-6 w-5 text-gray-400"
        aria-hidden="true"
      />
    ),
    type: "positive",
  },
  {
    label: "Firmalar (Borçlar)",
    value: "-1.300.000",
    icon: (
      <BuildingOfficeIcon
        className="h-6 w-5 text-gray-400"
        aria-hidden="true"
      />
    ),
    type: "negative",
  },
  {
    label: "Vergi SGK",
    value: "-8.000",
    icon: (
      <BriefcaseIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
    ),
    type: "negative",
  },
  {
    label: "Krediler",
    value: "-50.000",
    icon: <Bars3Icon className="h-6 w-5 text-gray-400" aria-hidden="true" />,
    type: "negative",
  },
  {
    label: "Ortaklar",
    value: "-5.000",
    icon: <UsersIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />,
    type: "negative",
    divider: true,
  },

  {
    label: "Stoklar",
    value: "9.000.000",
    icon: <SwatchIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />,
    type: "positive",
  },
  {
    label: "Demirbaşlar",
    value: "4.600.000",
    icon: <TruckIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />,
    type: "positive",
  },
];

// get the total value of assets as a number
const total = data.reduce((acc, item) => {
  const value = Number(item.value.replace(".", "").replace(",", "."));
  if (item.type === "positive") {
    return acc + value;
  } else {
    return acc - value;
  }
}, 0);

export const Assets = () => {
  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto border-b pb-3 pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900 ">
              Varlıklar
            </dt>
            <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
              {total.toLocaleString("tr-TR")} ₺
            </dd>
          </div>

          {data.map((item, i) => (
            <div
              key={i}
              className={clsx(
                "flex w-full flex-none gap-x-4 px-6 py-2",
                item.divider && "border-b",
              )}
            >
              <dt className="flex-none">{item.icon}</dt>
              <dd className="flex w-full justify-between text-sm leading-6 text-gray-500">
                <span> {item.label}</span>
                {item.type === "positive" ? (
                  <span className="font-base text-base text-teal-500">
                    {item.value} ₺
                  </span>
                ) : (
                  <span className="font-base text-base text-orange-500">
                    {item.value} ₺
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className="border-t border-gray-900/5 px-6 py-6">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Detaylı Rapor <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};
