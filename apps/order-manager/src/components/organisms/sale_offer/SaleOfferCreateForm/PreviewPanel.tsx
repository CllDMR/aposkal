"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { useFormContext } from "react-hook-form";

import type { RouterInputs, RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/molecules";

import { api } from "~/utils/api";
import { sayiOkunusu } from "~/utils/number-format";
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
      const totalMoney = (
        formValues?.saleOfferProducts?.map((saleOfferProduct) => ({
          total: saleOfferProduct.total,
          totalVat: saleOfferProduct.total * (saleOfferProduct.kdv / 100),
          totalExcludingVat:
            saleOfferProduct.total -
            saleOfferProduct.total * (saleOfferProduct.kdv / 100),
        })) ?? []
      ).reduce(
        (acc, saleOfferProduct) => ({
          total: acc.total + saleOfferProduct.total,
          totalExcludingVat:
            acc.totalExcludingVat + saleOfferProduct.totalExcludingVat,
          totalVat: acc.totalVat + saleOfferProduct.totalVat,
        }),
        {
          total: 0,
          totalExcludingVat: 0,
          totalVat: 0,
        },
      );

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
            unitPrice: saleOfferProduct.unitPrice.toLocaleString("tr-TR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
            vatRate: saleOfferProduct.kdv / 100,
            total: saleOfferProduct.total.toLocaleString("tr-TR", {
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              currency: formValues?.currency ?? "TRY",
              currencyDisplay: "code",
            }),
            description: "" + saleOfferProduct.description,
            gtipNo: "" + saleOfferProduct.gtipNo,
            imageURL: "" + saleOfferProduct.imageURL,
          })) ?? [],
        offerNotes:
          formValues?.saleOfferNotes?.map((saleOfferNote) => ({
            hideNote: false,
            text: saleOfferNote?.text ?? "Test",
          })) ?? [],
        offerTotals: {
          totalCurrency: {
            total: totalMoney.total.toLocaleString("tr-TR", {
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              currency: formValues?.currency ?? "TRY",
              currencyDisplay: "code",
            }),
            totalExcludingVat: totalMoney.totalExcludingVat.toLocaleString(
              "tr-TR",
              {
                style: "currency",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                currency: formValues?.currency ?? "TRY",
                currencyDisplay: "code",
              },
            ),
            totalInWords: sayiOkunusu(totalMoney.total),
            totalVat: totalMoney.totalVat.toLocaleString("tr-TR", {
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              currency: formValues?.currency ?? "TRY",
              currencyDisplay: "code",
            }),
          },
          totalTRY: {
            total: totalMoney.total.toLocaleString("tr-TR", {
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              currency: "TRY",
              currencyDisplay: "code",
            }),
            totalExcludingVat: totalMoney.totalExcludingVat.toLocaleString(
              "tr-TR",
              {
                style: "currency",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                currency: "TRY",
                currencyDisplay: "code",
              },
            ),
            totalInWords: sayiOkunusu(totalMoney.total),
            totalVat: totalMoney.totalVat.toLocaleString("tr-TR", {
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              currency: "TRY",
              currencyDisplay: "code",
            }),
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
          companyLogo: tenant.logoURL,
        },
      });

      const pdfDocGenerator = pdfMake.createPdf(template);
      // PDF verisini bileşen durumuna kaydedin
      pdfDocGenerator.getBase64((data) => {
        setPdfData(data);
      });
    }
  }, [address, company, formValues, tenant]);

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
