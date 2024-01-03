"use client";

import DocumentFormLayout from "@/components/document/DocumentFormLayout";
import RightDrawer from "@/components/document/RightDrawer";
import Input from "@/components/ui/Input";
import NumberInput from "@/components/ui/NumberInput";
import TextArea from "@/components/ui/TextArea";
import { useState } from "react";

const lines = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

const NewInvoice = () => {
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
        <div className="grid xl:grid-cols-2 gap-4">
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
          <div className="flex text-sm justify-between">
            <div className="text-gray-600 font-semibold">Ara Toplam</div>
            <div className="text-gray-600 font-semibold">0,00 TL</div>
          </div>
          <div className="flex text-sm justify-between">
            <div className="text-gray-600 font-semibold">Kdv</div>
            <div className="text-gray-600 font-semibold">0,00 TL</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-600 font-bold">Genel Toplam</div>
            <div className="text-gray-600 font-bold">0,00 TL</div>
          </div>
        </div>
      }
    >
      <RightDrawer drawerObj={drawer} setDrawerObj={setDrawer} title="Satır" />{" "}
      <div className="divide-y-2">
        {lines.map((line) => (
          <div
            className="md:flex  gap-3 space-y-3 md:space-y-0 even:bg-sky-50 py-4 px-3"
            key={line.id}
          >
            <div className="w-full md:w-5/12 mt-4 md:mt-0">
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
                  className="inline-flex items-center px-2 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
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
            className="inline-flex items-center px-2 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Satır Ekle
          </buton>
        </div>
      </div>
    </DocumentFormLayout>
  );
};

export default NewInvoice;
