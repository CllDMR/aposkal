"use client";

import { BriefcaseIcon, BuildingOfficeIcon } from "@heroicons/react/20/solid";

const clients = [
  {
    id: 2,
    name: "Alacaklar",
    icon: (
      <BuildingOfficeIcon
        className="h-6 w-5 text-gray-400"
        aria-hidden="true"
      />
    ),

    items: [
      {
        label: "Abc İnşaat Ltd. Şti.",
        value: "50.000",
        unit: "₺",
      },
      {
        label: "Def Teknoloji Anonim. Şti.",
        value: "25.000",
        unit: "₺",
      },
      {
        label: "Ghi Sağlık ve Turizm Limited Şirketi",
        value: "10.000",
        unit: "₺",
      },
      {
        label: "Zoto Otomotiv Limited Şirketi",
        value: "7.000",
        unit: "₺",
      },
      {
        label: "Tahta Mobilya Limited Şirketi",
        value: "3.000",
        unit: "₺",
      },
    ],
  },
  {
    id: 2,
    name: "Borçlar",
    icon: (
      <BuildingOfficeIcon
        className="h-6 w-5 text-gray-400"
        aria-hidden="true"
      />
    ),

    items: [
      {
        label: "Mebra Tekstil Ltd. Şti.",
        value: "150.000",
        unit: "₺",
      },
      {
        label: "Lezzet Gıda Anonim. Şti.",
        value: "35.000",
        unit: "₺",
      },
      {
        label: "Toprak İnşaat Limited Şirketi",
        value: "10.000",
        unit: "₺",
      },
      {
        label: "Zımba Kırtasiye Limited Şirketi",
        value: "9.000",
        unit: "₺",
      },
      {
        label: "Kalem Mobilya Limited Şirketi",
        value: "1.000",
        unit: "₺",
      },
    ],
  },
  // {
  //   id: 2,
  //   name: "Vadesi Yaklaşan Çekler",
  //   icon: <TicketIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />,

  //   items: [
  //     {
  //       label: "30.08.2023 - Alınan Çek",
  //       value: "150.000",
  //       unit: "₺",
  //     },
  //     {
  //       label: "01.09.2023 - Verilen Çek",
  //       value: "-35.000",
  //       unit: "₺",
  //     },
  //     {
  //       label: "05.09.2023 - Verilen Çek",
  //       value: "-10.000",
  //       unit: "₺",
  //     },
  //     {
  //       label: "10.09.2023 - Alınan Çek",
  //       value: "9.000",
  //       unit: "₺",
  //     },
  //     {
  //       label: "15.09.2023 - Alınan Çek",
  //       value: "1.000",
  //       unit: "₺",
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   name: "Vadesi Yaklaşan Senetler",
  //   icon: <TicketIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />,

  //   items: [
  //     {
  //       label: "30.08.2023 - Alınan Senet",
  //       value: "150.000",
  //       unit: "₺",
  //     },
  //     {
  //       label: "01.09.2023 - Verilen Senet",
  //       value: "-35.000",
  //       unit: "₺",
  //     },
  //     {
  //       label: "05.09.2023 - Verilen Senet",
  //       value: "-10.000",
  //       unit: "₺",
  //     },
  //     {
  //       label: "10.09.2023 - Alınan Senet",
  //       value: "9.000",
  //       unit: "₺",
  //     },
  //     {
  //       label: "15.09.2023 - Alınan Senet",
  //       value: "1.000",
  //       unit: "₺",
  //     },
  //   ],
  // },
  {
    id: 2,
    name: "KDV Durumu",
    icon: (
      <BriefcaseIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
    ),

    items: [
      {
        label: "Temmuz",
        value: "150.000",
        unit: "₺",
      },
      {
        label: "Ağustos (Bu Ay)",
        value: "35.000",
        unit: "₺",
      },
    ],
  },
];

export const Detail = () => {
  return (
    <>
      {/* Recent client list*/}
      <div className="mx-auto max-w-7xl ">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-4"
          >
            {clients.map((client) => (
              <li
                key={client.id}
                className="overflow-hidden rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                  {client.icon}
                  <div className="text-sm font-medium leading-6 text-gray-900">
                    {client.name}
                  </div>
                </div>
                <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                  {client?.items?.map((item, i) => (
                    <div key={i} className="flex justify-between gap-x-4 py-3">
                      <dt className="w-36 truncate text-gray-500">
                        {item.label}
                      </dt>
                      <dd className="text-gray-700">
                        {item.value} {item.unit}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
