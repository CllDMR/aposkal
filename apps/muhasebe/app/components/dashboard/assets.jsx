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
      <BanknotesIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />
    ),
    type: "positive",
  },
  {
    label: "Banka",
    value: "1.500.000",
    icon: (
      <BuildingLibraryIcon
        className="w-5 h-6 text-gray-400"
        aria-hidden="true"
      />
    ),
    type: "positive",
  },
  {
    label: "Pos",
    value: "1.500.000",
    icon: (
      <CalculatorIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />
    ),
    type: "positive",
  },
  {
    label: "Kredi Kartı",
    value: "-35.000",
    icon: (
      <CreditCardIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />
    ),
    type: "negative",
    divider: true,
  },

  {
    label: "Çek",
    value: "600.000",
    icon: <TicketIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />,
    type: "positive",
  },
  {
    label: "Senet",
    value: "-340.000",
    icon: <TicketIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />,
    type: "negative",
  },
  {
    label: "Firmalar (Alacaklar)",
    value: "2.300.000",
    icon: (
      <BuildingOfficeIcon
        className="w-5 h-6 text-gray-400"
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
        className="w-5 h-6 text-gray-400"
        aria-hidden="true"
      />
    ),
    type: "negative",
  },
  {
    label: "Vergi SGK",
    value: "-8.000",
    icon: (
      <BriefcaseIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />
    ),
    type: "negative",
  },
  {
    label: "Krediler",
    value: "-50.000",
    icon: <Bars3Icon className="w-5 h-6 text-gray-400" aria-hidden="true" />,
    type: "negative",
  },
  {
    label: "Ortaklar",
    value: "-5.000",
    icon: <UsersIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />,
    type: "negative",
    divider: true,
  },

  {
    label: "Stoklar",
    value: "9.000.000",
    icon: <SwatchIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />,
    type: "positive",
  },
  {
    label: "Demirbaşlar",
    value: "4.600.000",
    icon: <TruckIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />,
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
      <div className="rounded-lg shadow-sm bg-gray-50 ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pt-6 pb-3 pl-6 border-b">
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
                "py-2 flex w-full flex-none gap-x-4 px-6",
                item.divider && "border-b"
              )}
            >
              <dt className="flex-none">{item.icon}</dt>
              <dd className="flex justify-between w-full text-sm leading-6 text-gray-500">
                <span> {item.label}</span>
                {item.type === "positive" ? (
                  <span className="text-base text-teal-500 font-base">
                    {item.value} ₺
                  </span>
                ) : (
                  <span className="text-base text-orange-500 font-base">
                    {item.value} ₺
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className="px-6 py-6 border-t border-gray-900/5">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Detaylı Rapor <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};
