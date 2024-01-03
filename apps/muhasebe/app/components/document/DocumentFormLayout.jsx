"use client";

const DocumentFormLayout = ({
  children,
  companyInfo,
  docInfo,
  note,
  total,
}) => {
  return (
    <div className="min-h-full md:max-h-full flex flex-col overflow-scroll-y shadow sm:rounded-md container">
      <div className="bg-slate-50 md:flex border divide-x">
        {/* Header */}
        <div className="md:w-1/2 px-4 py-6 space-y-4">
          <h1 className="col-span-full text-gray-600 font-semibold">
            Müşteri Bilgileri
          </h1>

          {companyInfo}
        </div>

        <div className="md:w-1/2 px-4 py-6 space-y-4 ">
          <h1 className=" text-gray-600 font-semibold "> Belge Bilgileri</h1>

          {docInfo}
        </div>
      </div>
      {/* Lines */}
      <div className=" min-h-40 bg-white flex border overflow-y-scroll">
        <div className=" w-full space-y-4  py-6">
          {" "}
          <h1 className="col-span-full text-gray-600 px-4 font-semibold">
            {" "}
            Ürün/Hizmet Bilgileri
          </h1>
          {children}
        </div>
      </div>
      {/* Notes and totals */}
      <div className="bg-slate-50 md:flex border ">
        <div className="md:flex flex-1 divide-x">
          <div className="md:w-2/3 space-y-4 px-4 py-6">
            <h1 className="col-span-full text-gray-600 font-semibold">
              Notlar
            </h1>
            {note}
          </div>
          <div className=" md:w-1/3 space-y-4 px-4 py-6">
            <h1 className="col-span-full text-gray-600 font-semibold">
              Toplamlar
            </h1>
            {total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentFormLayout;
