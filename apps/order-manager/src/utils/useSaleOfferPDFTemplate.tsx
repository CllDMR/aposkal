import { useEffect, useState } from "react";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

import type { RouterInputs, RouterOutputs } from "@acme/api";

import { sayiOkunusu } from "./number-format";
import { createPDFTemplateSaleOffer } from "./pdf-templates/sale-offer";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

type SaleOfferCreateFormFields = RouterInputs["saleOffer"]["create"];

export const useSaleOfferPDFTemplateFromFormValues = ({
  address,
  company,
  tenant,
  formValues,
}: {
  address: RouterOutputs["addressCompany"]["get"];
  company: RouterOutputs["company"]["get"];
  tenant: RouterOutputs["tenant"]["getWithAddress"];
  formValues: Partial<SaleOfferCreateFormFields> | null;
}) => {
  const [pdfData, setPdfData] = useState<null | string>(null);

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

  return { pdfData };
};

export const useSaleOfferPDFTemplateFromValues = ({
  address,
  company,
  tenant,
  values,
}: {
  address: RouterOutputs["addressCompany"]["get"];
  company: RouterOutputs["company"]["get"];
  tenant: RouterOutputs["tenant"]["getWithAddress"];
  values: {
    id: string;

    startDate: Date;
    endDate: Date;
    paymentEndDate: Date;
    no: number;
    currency: string;

    tenantId: string;
    addressId: string;
    companyId: string;

    saleOfferProducts: {
      description: string | null;
      imageURL: string | null;
      gtipNo: string;
      productId: string;
      name: string;
      currency: string;
      unit: string;
      unitPrice: number;
      kdv: number;
      amount: number;
      total: number;
    }[];

    saleOfferNotes: {
      text: string;
    }[];
  };
}) => {
  const [pdfData, setPdfData] = useState<null | string>(null);

  useEffect(() => {
    if (company && address && tenant) {
      const totalMoney = (
        values?.saleOfferProducts?.map((saleOfferProduct) => ({
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
            values?.startDate?.toISOString() ??
            new Date(Date.now()).toISOString(),
          validUntil:
            values?.endDate?.toISOString() ??
            new Date(Date.now()).toISOString(),
          dueDate:
            values?.paymentEndDate?.toISOString() ??
            new Date(Date.now()).toISOString(),
          currency: values?.currency ?? "currency",
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
          values?.saleOfferProducts?.map((saleOfferProduct) => ({
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
              currency: values?.currency ?? "TRY",
              currencyDisplay: "code",
            }),
            description: "" + saleOfferProduct.description,
            gtipNo: "" + saleOfferProduct.gtipNo,
            imageURL: "" + saleOfferProduct.imageURL,
          })) ?? [],
        offerNotes:
          values?.saleOfferNotes?.map((saleOfferNote) => ({
            hideNote: false,
            text: saleOfferNote?.text ?? "Test",
          })) ?? [],
        offerTotals: {
          totalCurrency: {
            total: totalMoney.total.toLocaleString("tr-TR", {
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              currency: values?.currency ?? "TRY",
              currencyDisplay: "code",
            }),
            totalExcludingVat: totalMoney.totalExcludingVat.toLocaleString(
              "tr-TR",
              {
                style: "currency",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                currency: values?.currency ?? "TRY",
                currencyDisplay: "code",
              },
            ),
            totalInWords: sayiOkunusu(totalMoney.total),
            totalVat: totalMoney.totalVat.toLocaleString("tr-TR", {
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              currency: values?.currency ?? "TRY",
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
  }, [address, company, values, tenant]);

  return { pdfData };
};
