"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { useFormContext } from "react-hook-form";

import type { RouterInputs } from "@acme/api";
import { Button } from "@acme/ui/molecules";

import { createPDFTemplateSaleOffer } from "~/utils/pdf-templates/sale-offer";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

export const SaleOfferCreatePreviewPanel: FC = () => {
  const [pdfData, setPdfData] = useState<null | string>(null);
  const [formValues, setFormValues] = useState({});

  const { getValues } = useFormContext<SaleOfferCreateFormFields>();

  useEffect(() => {
    const template = createPDFTemplateSaleOffer({
      offerDetails: [],
      offerNotes: [],
      offerTotals: {
        totalCurrency: {
          total: "",
          totalExcludingVat: "",
          totalInWords: "",
          totalVat: "",
        },
        totalTRY: {
          total: "",
          totalExcludingVat: "",
          totalInWords: "",
          totalVat: "",
        },
      },
      selectedCompany: {
        title: "",
        address: "",
        tcVkn: "",
        taxAdmin: "",
        ticaretSicilNo: "",
        mersisNo: "",
        phoneNumber: "",
        email: "",
        web: "",
        companyLogo: "",
      },
    });

    const pdfDocGenerator = pdfMake.createPdf(template);
    // PDF verisini bileşen durumuna kaydedin
    pdfDocGenerator.getBase64((data) => {
      setPdfData(data);
    });
  }, []);

  return (
    <div className="">
      <div className="border-b pb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Önizleme
        </h3>
      </div>

      <div className="mt-2">
        <Button type="button" onClick={() => setFormValues(getValues())}>
          Get Form Values
        </Button>
      </div>

      <div className="">
        <pre className="">{JSON.stringify(formValues, null, 4)}</pre>
      </div>

      <div className="">
        {pdfData ? (
          <iframe
            title="PDF Viewer"
            src={`data:application/pdf;base64,${pdfData}`}
            className="h-screen sm:w-full"
          ></iframe>
        ) : (
          <span className="">No pdf data</span>
        )}
      </div>
    </div>
  );
};
