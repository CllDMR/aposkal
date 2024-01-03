import { DocumentIcon } from "@heroicons/react/20/solid";

const clients = [
  {
    id: 1,
    name: "Bekleyen Evraklar",
    icon: <DocumentIcon className="w-5 h-6 text-gray-400" aria-hidden="true" />,

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
      <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
        <ul role="list" className="mt-3 ">
          {clients.map((client) => (
            <li
              key={client.id}
              className="overflow-hidden border border-gray-200 rounded-xl"
            >
              <div className="flex items-center p-6 border-b gap-x-4 border-gray-900/5 bg-gray-50">
                {client.icon}
                <div className="text-sm font-medium leading-6 text-gray-900">
                  {client.name}
                </div>
              </div>
              <dl className="px-6 py-4 -my-3 text-sm leading-6 divide-y divide-gray-100">
                {client?.items?.map((item, i) => (
                  <div key={i} className="flex justify-between py-3 gap-x-4">
                    <dt className="text-gray-500 truncate w-36">
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
