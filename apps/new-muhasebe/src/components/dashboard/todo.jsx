"use client";

import { DocumentIcon } from "@heroicons/react/20/solid";

const clients = [
  {
    id: 1,
    name: "Bekleyen Evraklar",
    icon: <DocumentIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />,

    items: [
      {
        label: "Gelen Belge",
        value: "15",
        unit: "adet",
      },
      {
        label: "Teklif",
        value: "5",
        unit: "adet",
      },
      {
        label: "Sipariş",
        value: "2",
        unit: "adet",
      },
      {
        label: "İrsaliye",
        value: "1",
        unit: "adet",
      },
      {
        label: "Fatura",
        value: "3",
        unit: "adet",
      },
      {
        label: "Muhasebeleşecek",
        value: "30",
        unit: "belge",
      },
    ],
  },
];

export const Todo = () => {
  return (
    <div className="mx-auto ">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <ul role="list" className="mt-3 ">
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
  );
};
