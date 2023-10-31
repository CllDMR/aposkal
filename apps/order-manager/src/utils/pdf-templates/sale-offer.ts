import type {
  OrderedListElement,
  TableCell,
  TDocumentDefinitions,
} from "pdfmake/interfaces";

interface CreatePDFTemplateSaleOfferArgs {
  offerInfo?: {
    documentNumber: string;
    date: string;
    validUntil: string;
    dueDate: string;
    currency: string;
    company: {
      title: string;
      address: string;
      tcVkn: string;
      taxAdmin: string;
      phoneNumber: string;
      email: string;
      web: string;
      ticaretSicilNo: string;
      mersisNo: string;
    };
  };
  offerDetails: {
    product: { name: string };
    amount: string;
    unit: string;
    unitPrice: string;
    vatRate: number;
    total: string;
    description: string;
    gtipNo: string;
    imageURL: string;
  }[];
  offerTotals: {
    totalTRY: {
      totalExcludingVat: string;
      totalVat: string;
      total: string;
      totalInWords: string;
    };
    totalCurrency: {
      totalExcludingVat: string;
      totalVat: string;
      total: string;
      totalInWords: string;
    };
  };
  offerNotes: {
    hideNote: boolean;
    text: string;
  }[];
  selectedCompany: {
    title: string;
    address: string;
    tcVkn: string;
    taxAdmin: string;
    ticaretSicilNo: string;
    mersisNo: string;
    phoneNumber: string;
    email: string;
    web: string;
    companyLogo: string;
  };
}

export const createPDFTemplateSaleOffer = ({
  offerInfo,
  offerDetails,
  offerTotals,
  offerNotes,
  selectedCompany,
}: CreatePDFTemplateSaleOfferArgs): TDocumentDefinitions => {
  const documentType = "Teklif";

  const documentNumber = offerInfo?.documentNumber ?? "";
  const documentDate = convertDate(offerInfo?.date) ?? "";
  const validUntilDate = convertDate(offerInfo?.validUntil) ?? "";
  const paymentDate = convertDate(offerInfo?.dueDate) ?? "";
  const documentCurrency = offerInfo?.currency ?? "";
  const customer = {
    title: offerInfo?.company?.title ?? "",
    address: offerInfo?.company?.address ?? "",
    tcVkn: offerInfo?.company?.tcVkn ?? "",
    taxAdmin: offerInfo?.company?.taxAdmin ?? "",
    phone: offerInfo?.company?.phoneNumber ?? "",
    email: offerInfo?.company?.email ?? "",
    web: offerInfo?.company?.web ?? "",
    ticaretSicilNo: offerInfo?.company?.ticaretSicilNo ?? "",
    mersisNo: offerInfo?.company?.mersisNo ?? "",
  };
  const supplier = {
    title: selectedCompany?.title ?? "",
    address: selectedCompany?.address ?? "",
    tcVkn: selectedCompany?.tcVkn ?? "",
    taxAdmin: selectedCompany?.taxAdmin ?? "",
    ticaretSicilNo: selectedCompany?.ticaretSicilNo ?? "",
    mersisNo: selectedCompany?.mersisNo ?? "",
    phone: selectedCompany?.phoneNumber ?? "",
    email: selectedCompany?.email ?? "",
    web: selectedCompany?.web ?? "",
    logoURL: selectedCompany?.companyLogo ?? "",
  };
  const offerItems = offerDetails?.map((item) => ({
    productName: item?.product?.name ?? "",
    amount: item?.amount ?? "",
    unit: item?.unit ?? "",
    unitPrice: item?.unitPrice ?? "",
    vatRate: item?.vatRate ?? "",
    total: item?.total ?? "",
    description: item?.description ?? "",
    gtipNo: item?.gtipNo ?? "",
    imageUrl: item?.imageURL ?? "",
  }));

  const subtotals = {
    totalTRY: {
      baseAmount: offerTotals?.totalTRY?.totalExcludingVat ?? "",
      vatAmount: offerTotals?.totalTRY?.totalVat ?? "",
      totalAmount: offerTotals?.totalTRY?.total ?? "",
      totalInWords: offerTotals?.totalTRY?.totalInWords ?? "",
    },
    totalCurrency: {
      baseAmount: offerTotals?.totalCurrency?.totalExcludingVat ?? "",
      vatAmount: offerTotals?.totalCurrency?.totalVat ?? "",
      totalAmount: offerTotals?.totalCurrency?.total ?? "",
      totalInWords: offerTotals?.totalCurrency?.totalInWords ?? "",
    },
  };
  const notes = offerNotes
    ?.filter((item) => !item?.hideNote)
    .map((item) => ({ note: item?.text }));

  const primaryColor = "#374151";
  const secondaryColor = "#6b7280";

  // download logo image from url and convert to base64
  //   const logoURL = await convertUrlToBase64(supplier?.logoURL);

  let lineNumber = 0;

  const offerItemDetail: TableCell[][] = offerItems?.flatMap((item) => {
    const dataRow: TableCell[] = [
      ++lineNumber,
      item?.productName || "",
      { text: item?.amount || "", alignment: "right" },
      { text: item?.unit || "", alignment: "right" },
      {
        text: item?.unitPrice ? numberFormat(item?.unitPrice, 2, true) : "",
        alignment: "right",
      },
      {
        text: item?.vatRate ? renderPercentage(item?.vatRate) : "",
        alignment: "right",
      },
      {
        text: item?.total
          ? numberFormat(item?.total, 2, true) + " " + documentCurrency
          : "",
        alignment: "right",
      },
    ];
    const descriptionRow: TableCell[] = [
      {
        colSpan: 7,
        text: (item?.description || "") + (item?.gtipNo || ""),
      },
    ];
    return item?.description || item?.gtipNo
      ? [dataRow, descriptionRow]
      : [dataRow];
  });

  const noteItems = notes?.map((note) => note?.note);

  const temp_: OrderedListElement[] = [
    {
      text: supplier?.title,
      bold: true,
      color: primaryColor,
    },
    {
      text: supplier?.address,
      style: "subheader",
    },
    {
      text: supplier?.phone,
      style: "subheader",
    },
    {
      text: supplier?.email,
      style: "subheader",
    },
    {
      text: supplier?.web,
      style: "subheader",
    },
    {
      text: `Vkn/Tckn: ${supplier?.tcVkn} - ${supplier?.taxAdmin}`,
      color: primaryColor,
    },
    {
      text: `Ticaret Sicil No: ${supplier?.ticaretSicilNo || ""}`,
      style: "subheader",
    },
    {
      text: `Mersis No: ${supplier?.mersisNo || ""}`,
      style: "subheader",
    },
  ];

  //   if (logoURL) {
  //     const newArray = temp_.slice();
  //     newArray.unshift({
  //       image: logoURL,
  //       fit: [100, 100],
  //       margin: [0, 0, 0, 10],
  //       style: "subheader",
  //     });
  //     temp_ = newArray;
  //   }

  const template: TDocumentDefinitions = {
    styles: {
      header: {
        fontSize: 12,
        margin: [0, 0, 0, 10],
        bold: true,
        color: primaryColor,
      },
      subheader: {
        fontSize: 10,
        margin: [0, 3, 0, 0],
      },
      number: {
        fontSize: 10,
        alignment: "right",
        // width: "auto",
        margin: [0, 3, 0, 0],
      },
      tableExample: {
        fontSize: 10,
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: primaryColor,
      },
    },
    defaultStyle: {
      color: secondaryColor,
      fontSize: 10,
    },
    content: [
      {
        columns: [
          {
            width: 210,
            type: "none",
            ol: temp_,
          },
          {
            width: 110,
            text: "Teklif",
            fontSize: 14,
            bold: true,
            tocItem: false,
            alignment: "center",
          },
          {
            width: 210,
            type: "none",
            ol: [
              {
                text: "Sayın",
                style: "subheader",
              },
              {
                text: customer?.title,
                bold: true,
                color: primaryColor,
              },
              {
                text: customer?.address,
                style: "subheader",
              },
              {
                text: customer?.phone,
                style: "subheader",
              },
              {
                text: customer?.email,
                style: "subheader",
              },
              {
                text: customer?.web,
                style: "subheader",
              },
              {
                text: `Vkn/Tckn: ${customer?.tcVkn} - ${customer?.taxAdmin}`,
                color: primaryColor,
              },
              {
                text: `Ticaret Sicil No: ${customer?.ticaretSicilNo || ""}`,
                style: "subheader",
              },
              {
                text: `Mersis No: ${customer?.mersisNo || ""}`,
                style: "subheader",
              },
              {
                text: "___________________________________________",
                style: "subheader",
              },
              {
                text: `${documentType} No`,
                style: "subheader",
                color: "gray",
              },
              {
                text: ` ${documentNumber} `,
                color: primaryColor,
              },
              {
                columns: [
                  {
                    text: `${documentType} Tarihi`,
                    style: "subheader",
                  },

                  {
                    text: `Ödeme Tarihi`,
                    style: "subheader",
                    color: "gray",
                  },
                ],
              },
              {
                columns: [
                  {
                    text: documentDate,
                    color: primaryColor,
                  },

                  {
                    text: paymentDate,
                    style: "subheader",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        style: "tableExample",
        layout: "headerLineOnly",
        table: {
          widths: [13, "*", 35, 35, "auto", 25, "auto"],
          headerRows: 1,
          body: [
            [
              { text: "No", style: "tableHeader" },
              { text: "Ürün / Hizmet Adı", style: "tableHeader" },
              { text: "Miktar", style: "tableHeader", alignment: "right" },
              { text: "Birim", style: "tableHeader", alignment: "right" },
              { text: "BirimFiyat", style: "tableHeader", alignment: "right" },
              { text: "KDV", style: "tableHeader", alignment: "right" },
              { text: "Toplam", style: "tableHeader", alignment: "right" },
            ],
            ...offerItemDetail,
          ],
        },
      },
      {
        columns: [
          {
            width: "*",
            text: "",
          },
          {
            width: 75,
            type: "none",
            ol: [
              {
                text: "Ara Toplam",
                style: "number",
              },
              {
                text: "KDV Tutarı",
                style: "number",
              },
              {
                text: "Genel Toplam",
                style: "number",
              },
            ],
          },
          {
            type: "none",
            width: "auto",
            ol: [
              {
                text: `${numberFormat(
                  subtotals.totalCurrency.baseAmount,
                  2,
                  true,
                )} ${documentCurrency}`,
                style: "number",
              },
              {
                text: `${numberFormat(
                  subtotals.totalCurrency.vatAmount,
                  2,
                  true,
                )} ${documentCurrency}`,
                style: "number",
              },
              {
                text: `${numberFormat(
                  subtotals.totalCurrency.totalAmount,
                  2,
                  true,
                )} ${documentCurrency}`,
                style: "number",
              },
            ],
          },
          documentCurrency !== "TRY"
            ? {
                width: "auto",
                type: "none",
                ol: [
                  {
                    text: `${numberFormat(
                      subtotals.totalTRY.baseAmount,
                      2,
                      true,
                    )} TL`,
                    style: "number",
                  },
                  {
                    text: `${numberFormat(
                      subtotals.totalTRY.vatAmount,
                      2,
                      true,
                    )} TL`,
                    style: "number",
                  },
                  {
                    text: `${numberFormat(
                      subtotals.totalTRY.totalAmount,
                      2,
                      true,
                    )} TL`,
                    style: "subheader",
                    color: primaryColor,
                  },
                ],
              }
            : {
                width: 0,
                text: "",
              },
        ],
      },
      {
        text: subtotals.totalTRY.totalInWords,
        alignment: "right",
        margin: [0, 10, 0, 0],
      },
      {
        text: `Teklif son geçerlilik tarihi: ${validUntilDate}`,
      },
      {
        text: "Not:",
        fontSize: 8,
        bold: true,
        margin: [0, 20, 0, 8],
      },
      ...noteItems,
    ],
  };

  return template;
};

const convertUrlToBase64 = async (logoURL: string) => {
  try {
    const response = await fetch(logoURL);
    const blob = await response.blob();
    return await convertBlobToBase64(blob);
  } catch (error) {
    return null;
  }
};

const convertDate = (date?: string) => {
  //  2023-06-12T17:27:12.137Z => 12.06.2023
  if (!date) return null;
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day < 10 ? "0" + day : day}.${
    month < 10 ? "0" + month : month
  }.${year}`;
};

const renderPercentage = (value: number) => {
  if (!value) return null;
  // input like 0.18
  // output like %18
  return "%" + (value * 100).toFixed(0);
};

const convertBlobToBase64 = (blob: Blob): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else if (reader.result === null) {
        resolve(null);
      } else {
        resolve(null);
      }
    };
    reader.readAsDataURL(blob);
  });
};

const numberFormat = (value: string, digit = 2, string = false) => {
  if (!value) return "0";
  const value_ = Number(value);

  if (string) {
    return value_.toLocaleString("tr-TR", {
      minimumFractionDigits: digit,
      maximumFractionDigits: digit,
    });
  }

  let parameter = 1;
  if (digit > 0) {
    for (let i = 0; i < digit; i++) {
      parameter *= 10;
    }
  }

  return Math.round(value_ * parameter) / parameter;
};
