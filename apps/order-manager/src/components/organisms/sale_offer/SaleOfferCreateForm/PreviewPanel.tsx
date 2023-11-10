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
  addresses: RouterOutputs["addressCompany"]["list"];
  tenant: RouterOutputs["tenant"]["getWithAddress"];
}

export const SaleOfferCreatePreviewPanel: FC<
  SaleOfferCreatePreviewPanelProps
> = ({
  companies: initialCompanies,
  addresses: initialAddresses,
  tenant: initialTenant,
}) => {
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

  const { data: address } = api.addressCompany.get.useQuery(
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

  const { data: tenant } = api.tenant.getWithAddress.useQuery(undefined, {
    initialData: initialTenant,
  });

  useEffect(() => {
    if (company && address && tenant) {
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
            address: address.name,
            tcVkn: company.taxNo,
            taxAdmin: company.taxOffice,
            phoneNumber: company.firmPhoneNumber,
            email: company.email,
            web: company.web,
            ticaretSicilNo: company.ticaretSicilNo,
            mersisNo: company.mersisNo,
          },
        },
        offerDetails:
          formValues?.saleOfferProducts?.map((saleOfferProduct) => ({
            productName: saleOfferProduct.name,
            amount: "" + saleOfferProduct.amount,
            unit: saleOfferProduct.unit,
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
          title: tenant.title,
          address: tenant.address.name,
          tcVkn: tenant.taxNo,
          taxAdmin: tenant.taxOffice,
          phoneNumber: tenant.firmPhoneNumber,
          email: tenant.email,
          web: tenant.web,
          ticaretSicilNo: tenant.ticaretSicilNo,
          mersisNo: tenant.mersisNo,
          companyLogo: "<companyLogo>",
        },
      });

      const pdfDocGenerator = pdfMake.createPdf(template);
      // PDF verisini bileşen durumuna kaydedin
      pdfDocGenerator.getBase64((data) => {
        setPdfData(data);
      });
    }
  }, [address, company, tenant, formValues]);

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
