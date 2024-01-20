import type { FC, ReactNode } from "react";

interface DocumentFormLayoutProps {
  children: ReactNode;
  companyInfo: string;
  docInfo: string;
  note: string;
  total: string;
}

export const DocumentFormLayout: FC<DocumentFormLayoutProps> = ({
  children,
  companyInfo,
  docInfo,
  note,
  total,
}) => {
  return (
    <div className="overflow-scroll-y container flex min-h-full flex-col shadow sm:rounded-md md:max-h-full">
      <div className="bg-slate-50 divide-x border md:flex">
        {/* Header */}
        <div className="space-y-4 px-4 py-6 md:w-1/2">
          <h1 className="col-span-full font-semibold text-gray-600">
            Müşteri Bilgileri
          </h1>

          {companyInfo}
        </div>

        <div className="space-y-4 px-4 py-6 md:w-1/2 ">
          <h1 className="font-semibold text-gray-600 "> Belge Bilgileri</h1>

          {docInfo}
        </div>
      </div>
      {/* Lines */}
      <div className="min-h-40 flex overflow-y-scroll border bg-white">
        <div className="w-full space-y-4 py-6 ">
          {" "}
          <h1 className="col-span-full px-4 font-semibold text-gray-600">
            {" "}
            Ürün/Hizmet Bilgileri
          </h1>
          {children}
        </div>
      </div>
      {/* Notes and totals */}
      <div className="bg-slate-50 border md:flex ">
        <div className="flex-1 divide-x md:flex">
          <div className="space-y-4 px-4 py-6 md:w-2/3">
            <h1 className="col-span-full font-semibold text-gray-600">
              Notlar
            </h1>
            {note}
          </div>
          <div className="space-y-4 px-4 py-6 md:w-1/3">
            <h1 className="col-span-full font-semibold text-gray-600">
              Toplamlar
            </h1>
            {total}
          </div>
        </div>
      </div>
    </div>
  );
};
