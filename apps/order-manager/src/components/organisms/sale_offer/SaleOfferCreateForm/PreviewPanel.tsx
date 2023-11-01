"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { useFormContext } from "react-hook-form";

import type { RouterInputs } from "@acme/api";
import { Button } from "@acme/ui/molecules";

import { api } from "~/utils/api";
import { createPDFTemplateSaleOffer } from "~/utils/pdf-templates/sale-offer";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

export const SaleOfferCreatePreviewPanel: FC = () => {
  const [pdfData, setPdfData] = useState<null | string>(null);
  const [formValues, setFormValues] = useState({});

  const { getValues, watch } = useFormContext<SaleOfferCreateFormFields>();

  useEffect(() => {
    const { unsubscribe } = watch(
      ({
        addressId,
        currency,
        companyId,
        endDate,
        paymentEndDate,
        saleOfferProducts,
        startDate,
        saleOfferNotes,
      }) => {
        const { data: company } = api.company.get.useQuery(
          {
            id: companyId!,
          },
          {
            enabled: Boolean(companyId),
          },
        );

        const { data: address } = api.address.get.useQuery(
          {
            id: companyId!,
          },
          {
            enabled: Boolean(companyId),
          },
        );

        if (company && address) {
          const template = createPDFTemplateSaleOffer({
            offerInfo: {
              documentNumber: "Test",
              date: "Test",
              validUntil: "Test",
              dueDate: "Test",
              currency: "Test",
              company: {
                title: company.title,
                address: address.name,
                tcVkn: "Test",
                taxAdmin: "Test",
                phoneNumber: "Test",
                email: "Test",
                web: "Test",
                ticaretSicilNo: "Test",
                mersisNo: "Test",
              },
            },
            offerDetails: [
              {
                productName: "Test",
                amount: "Test",
                unit: "Test",
                unitPrice: "Test",
                vatRate: 9999,
                total: "Test",
                description: "Test",
                gtipNo: "Test",
                imageURL: "Test",
              },
            ],
            offerNotes: saleOfferNotes?.map((saleOfferNote) => ({
              hideNote: false,
              text: saleOfferNote?.text ?? "Test",
            })) ?? [
              {
                hideNote: false,
                text: "Test",
              },
            ],
            offerTotals: {
              totalCurrency: {
                total: "Test",
                totalExcludingVat: "Test",
                totalInWords: "Test",
                totalVat: "Test",
              },
              totalTRY: {
                total: "Test",
                totalExcludingVat: "Test",
                totalInWords: "Test",
                totalVat: "Test",
              },
            },
            selectedCompany: {
              title: "Test",
              address: "Test",
              tcVkn: "Test",
              taxAdmin: "Test",
              ticaretSicilNo: "Test",
              mersisNo: "Test",
              phoneNumber: "Test",
              email: "Test",
              web: "Test",
              companyLogo: "Test",
            },
          });

          const pdfDocGenerator = pdfMake.createPdf(template);
          // PDF verisini bileşen durumuna kaydedin
          pdfDocGenerator.getBase64((data) => {
            setPdfData(data);
          });
        }
      },
    );
    return () => unsubscribe();
  }, [watch]);

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
