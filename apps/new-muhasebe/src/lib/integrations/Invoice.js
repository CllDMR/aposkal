import { v4 as uuidv4 } from "uuid";

// bu class'ın amacı invoice objesini oluşturmak ve validasyon yapmak.
// ardından bu objeyi xml'e çevirmek.

const options = {
  ProfileID: [
    "TEMELFATURA",
    "TICARIFATURA",
    "YOLCUBERABERFATURA",
    "IHRACAT",
    "KAMU",
    "HKS",
    "EARSIVFATURA",
  ],
  InvoiceTypeCode: [
    "SATIS",
    "IADE",
    "TEVKIFAT",
    "ISTISNA",
    "IHRACKAYITLI",
    "OZELMATRAH",
    "SGK",
    "KOMISYONCU",
  ],
  DocumentDescription: [
    "AVANS",
    "YEMEK_FIS",
    "E-FATURA",
    "E-FATURA_IRSALIYE",
    "E-ARSIV",
    "E-ARSIV_IRSALIYE",
    "FATURA",
    "OTOPARK",
    "FATURA_TAHSILAT",
    "FATURA_TAHSILAT_KOMISYONLU",
  ],
};

const currencyData = {
  TRY: "Türk Lirası",
  USD: "Amerikan Doları",
  EUR: "Avro",
  AED: "Dirhams",
  AFN: "Afgan",
  ALL: "Lek",
  AMD: "Dram",
  ANG: "Antiller Guldeni",
  AOA: "Kwanza",
  ARS: "Arjantin Pesosu",
  BHD: "Bahreyn Dinarı",
  BIF: "Burundi Frankı",
  BMD: "Bermuda Doları",
  BND: "Brunei Doları",
  BOB: "Bolivya Bolivyanosu",
  BOV: "Bolivya Mvdolu",
  BRL: "Brazilya Reali",
  BSD: "Bahama Doları",
  BTN: "Ngultrum",
  BWP: "Botsvana Pulası",
  BYR: "Belarus Rublesi",
  BZD: "Belize Doları",
  CAD: "Kanada Doları",
  CDF: "Kongo Frankı",
  CHE: "WIR Euro",
  CHF: "İsviçre Frankı",
  CHW: "WIR Franc",
  CLF: "Unidades de formento",
  CLP: "Şili Pesosu",
  CNY: "Yuan Renminbisi",
  COP: "Kolombiya Pesosu",
  COU: "Unidad de Valor Real",
  CRC: "Kosta Rika Colonu",
  CUP: "Küba Pesosu",
  CVE: "Cape Verde Escudosu",
  CYP: "Kıbrıs Lirası",
  CZK: "Çek Korunası",
  DJF: "Cibuti Frankı",
  DKK: "Danimarka Kronu",
  DOP: "Dominik Pesosu",
  DZD: "Cezayir Dinarı",
  EEK: "Estonya Kronu",
  EGP: "Mısır Lirası/ Gineih",
  ERN: "Nafka",
  ETB: "Etiyopya Birri",
  FJD: "Fiji Doları",
  FKP: "Falkland Adaları Lirası",
  GBP: "İngiliz Sterlini/İngiliz Lirası",
  GEL: "Gürcistan Lirası/ Lari",
  GHC: "Cedi",
  GIP: "Cebelitarık Lirası",
  GMD: "Dalasi",
  GNF: "Gine Frangı",
  GTQ: "Guatemala Kuetzalı",
  GYD: "Guyana Doları",
  HKD: "Hong Kong Doları",
  HNL: "Honduras Lempirası",
  HRK: "Hırvatistan Kunası",
  HTG: "Haiti Gourde",
  HUF: "Macar Forinti",
  IDR: "Rupiah",
  ILS: "İsrail Yeni Şekeli",
  INR: "Hindistan Rupisi",
  IQD: "Irak Dinarı",
  IRR: "İran Riyali",
  ISK: "İzlanda Kronası",
  JMD: "Jamaika Doları",
  JOD: "Ürdün Dinarı",
  JPY: "Japon Yeni",
  KES: "Kenya Şilini",
  KGS: "Kırgızistan Somu",
  KHR: "Riel",
  KID: "Kiribati Doları",
  KMF: "Komoro Frankı",
  KPW: "Kuzey Kore Wonu",
  KRW: "Güney Kore Wonu",
  KWD: "Kuveyt Dinarı",
  KYD: "Cayman Adaları Doları",
  KZT: "Kazak Tengesi",
  LAK: "Kip",
  LBP: "Lübnan Lirası",
  LKR: "Sri Lanka Rupisi",
  LRD: "Liberya Doları",
  LSL: "Loti",
  LTL: "Litvanya Litası",
  LVL: "Letonya Latsı",
  LYD: "Libya Dinarı",
  MAD: "Fas Dirhemı",
  MDL: "Moldovya Leusu",
  MGA: "Madagaskar Ariarisi",
  MKD: "Makedon Dinarı",
  MMK: "Kyat",
  MNT: "Tugrik",
  MOP: "Macau Patakası",
  MRO: "Ouguiya",
  MUR: "Mauritius Rupisi",
  MVR: "Maldiv Rupisi Rufiyaa",
  MWK: "Kwacha",
  MXN: "Meksika Pesosu",
  MYR: "Malezya Ringgiti",
  MZN: "Mozambik Metikali",
  NAD: "Namibya Doları",
  NGN: "Naira",
  NIO: "Kordoba",
  NOK: "Norveç Kronu",
  NPR: "Nepal Rupisi",
  NZD: "Yeni Zelanda Doları",
  OMR: "Umman Riyali",
  PAB: "Balboa",
  PEN: "Nuevo Sol",
  PGK: "Kina",
  PHP: "Filipinler Pesosu",
  PKR: "Pakistan Rupisi",
  PLN: "Leh Zlotisi",
  PYG: "Guarani",
  QAR: "Katar Riyali",
  RON: "Yeni Ley",
  RSD: "Sırbistan Dinarı",
  RUB: "Rus Rublesi",
  RWF: "Rıanda Frankı",
  SAR: "Suudi Riyali",
  SBD: "Solomon Adaları Doları",
  SCR: "Seyşeller Rupisi",
  SDD: "Sudan Dinar'ı",
  SEK: "İsveç Kronu",
  SGD: "Singapur Doları",
  SHP: "Saint Helena Lira",
  SIT: "Tolar",
  SKK: "Slovak Korunası",
  SLL: "Leone",
  SOS: "Somali Şilini",
  SRD: "Surinam Doları",
  STD: "Dobra",
  SVC: "El Salvador Kolonu",
  SYP: "Suriye Lirası",
  SZL: "Lilangeni",
  THB: "Baht",
  TJS: "Somoni",
  TMM: "Turkmenistan Manatı",
  TND: "Tunus Dinarı",
  TOP: "Pa'anga",
  TPE: "Timor Esküdosu",
  TRL: "Türk Lirası (Eski)",
  TRY: "Türk Lirası",
  TTD: "Trinidad ve Tobago Doları",
  TWD: "Yeni Tayvan Doları",
  TZS: "Tanzanya Şilini",
  UAH: "Ukrayna Grivnası",
  UGX: "Uganda Şilini",
  USD: "Amerikan Doları",
  USN: "ABD Doları (Ertesi gün)",
  USS: "ABD Doları (Aynı gün)",
  UYI: "Uruguay Peso en Unidades Indexadas",
  UYU: "Uruguay Pesosu",
  UZS: "Özbekistan Somu",
  VEB: "Venezuela Bolivarı",
  VND: "Dong",
  VUV: "Vatu",
  WST: "Samoa Talası",
  XAF: "CFA Franc BEAC",
  XAG: "Gümüş",
  XAU: "Altın",
  XBA: "Birleşik Avrupa Birimi",
  XBB: "Avrupa Para Birimi (EMU)",
  XBC: "Avrupa Hesap Birimi (XBC)",
  XBD: "Avrupa Hesap Birimi (XBD)",
  XCD: "Doğu Karayip doları",
  XDR: "Özel Çekme Hakkı (IMF)",
  XEU: "Avrupa Para Birimi",
  XFO: "Fransız Altın Frangı",
  XFU: "Fransız UIC-Frangı",
  XOF: "CFA Franc BCEAO",
  XPD: "Paladyum",
  XPF: "CFP Frankı",
  XPT: "Platin",
  XTS: "Test Para Birimi",
  XXX: "Bilinmeyen veya Geçersiz Para Birimi",
  YER: "Yemen Riyali",
  YUM: "Yugoslav Dinarı (Eski)",
  ZAR: "Güney Afrika Randı",
  ZMK: "Kwacha",
  ZWD: "Zimbabve Doları",
};

const currencyCodes = Object.keys(currencyData);

const checkOptions = (options, value, key) => {
  if (options.includes(value)) return true;
  throw new Error(`${key} must be one of the following: ${options.join(", ")}`);
};

class Invoice {
  constructor() {
    this.UBLVersionID = "UBL 2.1";
    this.CustomizationID = null;
    this.ProfileID = null;
    this.ID = null;
    this.CopyIndicator = false;
    // uuid like this F47AC10B-58CC-4372-A567-0E02B2C3D479
    this.UUID = uuidv4();
    this.IssueDate = new Date().toISOString().split("T")[0];
    this.IssueTime = new Date().toISOString().split("T")[1];
    this.InvoiceTypeCode = null;
    this.Note = [];
    this.DocumentCurrencyCode = "TRY";
    // this.TaxCurrencyCode = "TRY";
    // this.PricingCurrencyCode = "TRY";
    // this.PaymentCurrencyCode = "TRY";
    // this.PaymentAlternativeCurrencyCode = "TRY";
    // this.AccountingCostCode = null;
    this.LineCountNumeric = null;
    // this.InvoicePeriod = null;
    this.OrderReference = null;
    this.BillingReference = null;

    // burada kaldım : https://developertest.nes.com.tr/docs/ubl-invoice/element-details#despatch-document-reference
  }
  setProfileID(value) {
    checkOptions(options.ProfileID, value, "ProfileID");
    this.ProfileID = value;
  }
  setID(value) {
    // {SERI}{YIL}{MUTESELSILNUMARA}
    if (value.length !== 16) throw new Error("ID must be 16 characters long");
    this.ID = value;
  }
  setIssueDate(value) {
    // YYYY-MM-DD
    if (value.length !== 10)
      throw new Error("IssueDate must be 10 characters long");
    this.IssueDate = value;
  }
  setIssueTime(value) {
    // HH:MM:SS
    if (value.length !== 8)
      throw new Error("IssueTime must be 8 characters long");
    this.IssueTime = value;
  }
  setInvoiceTypeCode(value) {
    checkOptions(options.InvoiceTypeCode, value, "InvoiceTypeCode");
    this.InvoiceTypeCode = value;
  }
  addNote(value) {
    this.Note.push(value);
  }
  removeNote(Note) {
    this.Note = this.Note.filter((note) => note !== Note);
  }
  updateNote(Note, value) {
    this.Note = this.Note.map((note) => (note === Note ? value : note));
  }
  setDocumentCurrencyCode(value) {
    if (!currencyCodes.includes(value))
      throw new Error("DocumentCurrencyCode must be a valid currency code");
    this.DocumentCurrencyCode = value;
  }
  setOrderReference(id, issueDate, documentReference) {
    // https://developertest.nes.com.tr/docs/shared/cac/order-reference
    //  DocumentReference de eklenebilyor. ben eklemedim.

    const obj = {
      ID: id,
      IssueDate: issueDate,
    };
    if (documentReference) obj.DocumentReference = documentReference;
    this.OrderReference = obj;
  }
  setBillingReference_OKC(
    id,
    issueDate,
    documentDescription,
    externalReference,
    startDate,
    startTime,
    endpointID,
  ) {
    checkOptions(
      options.DocumentDescription,
      documentDescription,
      "DocumentDescription setBillingReference_OKC",
    );
    // https://developertest.nes.com.tr/docs/shared/cac/billing-reference

    const documentReference = {
      AdditionalDocumentReference: {
        ID: id,
        IssueDate: issueDate,
        DocumentTypeCode: "OKCBF",
        DocumentType: "OKCBilgiFisi",
        DocumentDescription: documentDescription,
        Attachment: {
          ExternalReference: {
            URI: externalReference,
          },
        },
        ValidityPeriod: {
          StartDate: startDate,
          StartTime: startTime,
        },
        IssuerParty: {
          EndpointID: endpointID,
          PartyIdentification: {
            ID: "",
          },
          PostalAddress: {
            CitySubdivisionName: "",
            CityName: "",
            Country: {
              Name: "",
            },
          },
        },
      },
    };

    this.BillingReference = documentReference;
  }

  setBillingReference_IADE(id, issueDate) {
    // https://developertest.nes.com.tr/docs/shared/cac/billing-reference
    const obj = {
      ID: id,
      IssueDate: issueDate,
      DocumentTypeCode: "RETURNS",
    };
    this.BillingReference = obj;
  }
}

export default Invoice;

const data = {
  nesInvoice: {
    InvoiceInfo: {
      UUID: "c57ce4ad-f280-490d-b4b8-1484ba4f5d3a",
      InvoiceType: "SATIS",
      InvoiceSerieOrNumber: "NES2016000000001",
      IssueDate: "2017-06-21 12:18:58",
      IssueTime: "2017-06-21 12:18:58",
      CurrencyCode: "TRY",
      ExchangeRate: 0,
      InvoiceProfile: "TEMELFATURA",
      DespatchDocumentReference: null,
      OrderReference: {
        IssueDate: "2017-06-21 12:18:58",
        Value: "SIP.001",
      },
      OrderReferenceDocument: null,
      AdditionalDocumentReferences: [
        {
          ID: "Şube Adı",
          IssueDate: null,
          DocumentType: "BRANCH_NAME",
          DocumentTypeCode: null,
          Attachment: null,
        },
        {
          ID: "Şube adresi",
          IssueDate: null,
          DocumentType: "BRANCH_ADDRESS",
          DocumentTypeCode: null,
          Attachment: null,
        },
      ],
      TaxExemptionReasonInfo: null,
      XSLTTitle: null,
      XSLTPath: null,
      ERPRefNo: null,
      ERPCustomerRefNo: null,
      EArchiveInfo: null,
      DraftInvoiceID: null,
      PaymentTermsInfo: null,
      PaymentMeansInfo: null,
      OKCInfo: null,
      ReturnInvoiceInfo: null,
    },
    CompanyInfo: {
      RegisterNumber: "6310694807",
      Name: "NES BİLGİ VERİ TEK. VE SAK. HİZ. A.Ş.",
      TaxOffice: "KOZYATAĞI",
      PartyIdentifications: null,
      AgentPartyIdentifications: null,
      ReceiverAlias: null,
      Address: "Barbaros Mah. Ak Zambak Sok. Uphill Towers A Blok K:16/92",
      District: "Ataşehir",
      City: "İstanbul",
      Country: "Türkiye",
      PostalCode: null,
      Phone: "216 688 51 00",
      Fax: "216 688 51 99",
      Mail: "info@nesbilgi.com.tr",
      WebSite: "http://nesbilgi.com.tr",
    },
    CustomerInfo: {
      RegisterNumber: "6310694807",
      Name: "NES BİLGİ VERİ TEK. VE SAK. HİZ. A.Ş.",
      TaxOffice: "KOZYATAĞI",
      PartyIdentifications: null,
      AgentPartyIdentifications: null,
      ReceiverAlias: null,
      Address: "Barbaros Mah. Ak Zambak Sok. Uphill Towers A Blok K:16/92",
      District: "Ataşehir",
      City: "İstanbul",
      Country: "Türkiye",
      PostalCode: null,
      Phone: "216 688 51 00",
      Fax: "216 688 51 99",
      Mail: "info@nesbilgi.com.tr",
      WebSite: "http://nesbilgi.com.tr",
    },
    ExportCustomerInfo: null,
    TaxFreeInfo: null,
    InvoiceLines: [
      {
        Index: null,
        SellerCode: null,
        BuyerCode: null,
        Name: "Laptop",
        Description: null,
        Quantity: 1,
        UnitType: "C62",
        Price: 18,
        AllowanceTotal: 0,
        KDVPercent: 18,
        Taxes: [
          {
            TaxCode: "9040",
            Total: 0,
            Percent: 20,
            ReasonCode: null,
          },
        ],
        ManufacturerCode: null,
        BrandName: null,
        ModelName: null,
        Note: null,
        DeliveryInfo: null,
      },
    ],
    Notes: null,
    ISEArchiveInvoice: false,
  },
  invoiceProfile: 1,
  customerRegisterNumber: "1234567801",
  isDirectSend: true,
};
