"use client";

import { useState } from "react";
import { DocumentFormLayout, RightDrawer } from "@/components/document";
import { Input, NumberInput, TextArea } from "@/components/ui";

export function IncomePage() {
  const [lines, setLines] = useState([{ id: 1 }]);
  const [drawer, setDrawer] = useState(null);

  const handleAddLine = () => {
    setLines([...lines, { id: lines.length + 1 }]);
  };

  return (
    <DocumentFormLayout
      companyInfo={
        <div>
          <Input label="Müşteri Adı" />
        </div>
      }
      docInfo={
        <div className="grid gap-4 xl:grid-cols-2">
          <Input type="date" label="Fatura Tarihi" />

          <div className="grid grid-cols-2 gap-2 space-y-0">
            <Input type="date" label="Vade Tarihi" />
            <Input type="number" label="Vade Gün" />
          </div>
          <div className="grid grid-cols-2 gap-2 space-y-0">
            <Input label="Döviz Cinsi" />
            <NumberInput label="Kur" />
          </div>
        </div>
      }
      note={<TextArea rows="3" label="Notlar" />}
      total={
        <div>
          <div className="flex justify-between text-sm">
            <div className="font-semibold text-gray-600">Ara Toplam</div>
            <div className="font-semibold text-gray-600">0,00 TL</div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="font-semibold text-gray-600">Kdv</div>
            <div className="font-semibold text-gray-600">0,00 TL</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold text-gray-600">Genel Toplam</div>
            <div className="font-bold text-gray-600">0,00 TL</div>
          </div>
        </div>
      }
    >
      <RightDrawer drawerObj={drawer} setDrawerObj={setDrawer} title="Satır" />{" "}
      <div className="divide-y-2">
        {lines.map((line) => (
          <div
            className="gap-3 space-y-3 px-3 py-4 even:bg-sky-50 md:flex md:space-y-0"
            key={line.id}
          >
            <div className="mt-4 w-full md:mt-0 md:w-5/12">
              <Input label="Ürün Adı" />
            </div>

            <div className="flex w-full gap-3 md:w-4/12">
              <div className="w-3/6 md:w-1/4">
                <NumberInput label="Miktar" />
              </div>
              <div className="w-3/6 md:w-1/4">
                <Input label="Brim" />
              </div>
              <div className="w-3/6 md:w-2/4">
                <NumberInput label="Brim Fiyat" />
              </div>
            </div>

            <div className="flex w-full gap-3 md:w-3/12">
              <div className="w-full md:w-2/6">
                <Input label="Kdv" />
              </div>
              <div className="w-full md:w-4/6">
                <NumberInput label="Toplam" />
              </div>
              <div className="">
                <buton
                  type="button"
                  onClick={() => setDrawer({ id: line.id })}
                  className="inline-flex items-center rounded-md border border-transparent bg-teal-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                    />
                  </svg>
                </buton>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-end px-3 py-4">
          <buton
            type="button"
            onClick={handleAddLine}
            className="inline-flex items-center rounded-md border border-transparent bg-teal-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Satır Ekle
          </buton>
        </div>
      </div>
    </DocumentFormLayout>
  );
}
