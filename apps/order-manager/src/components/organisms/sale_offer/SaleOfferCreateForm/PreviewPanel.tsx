"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { useFormContext } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/molecules";

import { api } from "~/utils/api";
import { createPDFTemplateSaleOffer } from "~/utils/pdf-templates/sale-offer";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

interface SaleOfferCreatePreviewPanelProps {
  companies: RouterOutputs["company"]["list"];
  addresses: RouterOutputs["address"]["list"];
}

export const SaleOfferCreatePreviewPanel: FC<
  SaleOfferCreatePreviewPanelProps
> = ({ companies: initialCompanies, addresses: initialAddresses }) => {
  const [pdfData, setPdfData] = useState<null | string>(null);
  const [formValues, setFormValues] =
    useState<Partial<SaleOfferCreateFormFields> | null>(null);

  const { getValues } = useFormContext<SaleOfferCreateFormFields>();

  const { data: company } = api.company.get.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      id: formValues?.companyId!,
    },
    {
      initialData: initialCompanies.find((o) => o.id === formValues?.companyId),
      enabled:
        Boolean(formValues?.companyId) &&
        typeof formValues?.companyId === "string",
    },
  );

  const { data: address } = api.address.get.useQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      id: formValues?.addressId!,
    },
    {
      initialData: initialAddresses.find((o) => o.id === formValues?.addressId),
      enabled:
        Boolean(formValues?.addressId) &&
        typeof formValues?.addressId === "string",
    },
  );

  useEffect(() => {
    if (company && address) {
      const template = createPDFTemplateSaleOffer({
        offerInfo: {
          documentNumber: "documentNumber",
          date:
            formValues?.startDate?.toISOString() ??
            new Date(Date.now()).toISOString(),
          validUntil:
            formValues?.endDate?.toISOString() ??
            new Date(Date.now()).toISOString(),
          dueDate:
            formValues?.paymentEndDate?.toISOString() ??
            new Date(Date.now()).toISOString(),
          currency: formValues?.currency ?? "currency",
          company: {
            title: company.title,
            address: company.address.name,
            tcVkn: company.taxNo ?? "tcVkn",
            taxAdmin: company.taxOffice ?? "taxAdmin",
            phoneNumber: company.firmPhoneNumber ?? "phoneNumber",
            email: company.email ?? "email",
            web: company.web ?? "web",
            ticaretSicilNo: company.ticaretSicilNo ?? "ticaretSicilNo",
            mersisNo: company.mersisNo ?? "mersisNo",
          },
        },
        offerDetails:
          formValues?.saleOfferProducts?.map((saleOfferProduct) => ({
            // productName: saleOfferProduct.product.name ?? "productName",
            productName: "productName",
            amount: "" + saleOfferProduct.amount,
            unit: "unit",
            unitPrice: "" + saleOfferProduct.unitPrice,
            vatRate: saleOfferProduct.kdv,
            total: "" + saleOfferProduct.total,
            description: "description",
            gtipNo: "gtipNo",
            imageURL: "imageURL",
          })) ?? [],
        offerNotes:
          formValues?.saleOfferNotes?.map((saleOfferNote) => ({
            hideNote: false,
            text: saleOfferNote?.text ?? "Test",
          })) ?? [],
        offerTotals: {
          totalCurrency: {
            total: "total",
            totalExcludingVat: "totalExcludingVat",
            totalInWords: "totalInWords",
            totalVat: "totalVat",
          },
          totalTRY: {
            total: "total",
            totalExcludingVat: "totalExcludingVat",
            totalInWords: "totalInWords",
            totalVat: "totalVat",
          },
        },
        selectedCompany: {
          title: company.title,
          address: company.address.name,
          tcVkn: company.taxNo ?? "tcVkn",
          taxAdmin: company.taxOffice ?? "taxAdmin",
          phoneNumber: company.firmPhoneNumber ?? "phoneNumber",
          email: company.email ?? "email",
          web: company.email ?? "web",
          ticaretSicilNo: company.email ?? "ticaretSicilNo",
          mersisNo: company.email ?? "mersisNo",
          companyLogo: company.email ?? "companyLogo",
        },
      });

      const pdfDocGenerator = pdfMake.createPdf(template);
      // PDF verisini bileşen durumuna kaydedin
      pdfDocGenerator.getBase64((data) => {
        setPdfData(data);
      });
    }
  }, [address, company, formValues]);

  return (
    <div className="">
      <div className="border-b pb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Önizleme
        </h3>
      </div>
      <div className="">
        <Button type="button" onClick={() => setFormValues(getValues())}>
          Refresh
        </Button>
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
