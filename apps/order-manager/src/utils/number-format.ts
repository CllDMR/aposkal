import { ToWords } from "to-words";

const toWords = new ToWords({
  localeCode: "tr-TR",
  converterOptions: {
    ignoreDecimal: false,
    ignoreZeroCurrency: true,
    doNotAddOnly: true,
    currency: true,
    currencyOptions: {
      name: "Türk Lirası",
      plural: "Türk Lirası",
      symbol: "₺",
      fractionalUnit: {
        name: "Kuruş",
        plural: "Kuruş",
        symbol: "",
      },
    },
  },
});

// const numberFormat = (value: number, digit = 2) =>
//   value.toLocaleString("tr-TR", {
//     minimumFractionDigits: digit,
//     maximumFractionDigits: digit,
//   });

export const sayiOkunusu = (sayi: number) => {
  let convertedSayi = toWords.convert(sayi);

  convertedSayi = convertedSayi.replaceAll("virgül ", "");

  const words = convertedSayi.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (!words[i]?.[0]) continue;

    words[i] = words[i]![0]!.toUpperCase() + words[i]!.slice(1);
  }

  convertedSayi = words.join(" ");

  convertedSayi = convertedSayi.replaceAll("Türk Lirası Kuruş", "Türk Lirası");
  convertedSayi = convertedSayi.replaceAll("Yüzüncü ", "");

  return convertedSayi;
};

// export const sayiOkunusu_ = (sayi: number, kurCinsi: string) => {
//   const formattedSayi = numberFormat(sayi, 2);

//   const birler = [
//     "",
//     "Bir",
//     "İki",
//     "Üç",
//     "Dört",
//     "Beş",
//     "Altı",
//     "Yedi",
//     "Sekiz",
//     "Dokuz",
//   ];
//   const onlar = [
//     "",
//     "On",
//     "Yirmi",
//     "Otuz",
//     "Kırk",
//     "Elli",
//     "Altmış",
//     "Yetmiş",
//     "Seksen",
//     "Doksan",
//   ];
//   const gruplar = [
//     "",
//     "Bin",
//     "Milyon",
//     "Milyar",
//     "Trilyon",
//     "Katrilyon",
//     "Kentilyon",
//     "Sekstilyon",
//     "Septilyon",
//     "Oktilyon",
//     "Nonilyon",
//     "Desilyon",
//   ];

//   let okunus = "";
//   let kurusOkunus = "";

//   // Sayıyı virgül veya nokta karakterine göre bölerek tam ve ondalık kısmını ayrıştırma
//   const tamKisim = formattedSayi.split(/[.,]/)[0] ?? "";
//   const ondalikKisim = formattedSayi.split(/[.,]/)[1] ?? "";

//   // Tam kısmın uzunluğunu alarak grup sayısını belirleme
//   const grupSayisi = Math.ceil(tamKisim.length / 3);

//   // Tam kısmın solundan grupları belirleyerek okunuşa ekleme
//   for (let i = grupSayisi; i > 0; i--) {
//     const grupDegeri = tamKisim.substring(
//       tamKisim.length - i * 3,
//       tamKisim.length - (i - 1) * 3,
//     );
//     const intGrupDegeri = parseInt(grupDegeri);
//     if (intGrupDegeri) {
//       // Grup değerinin okunuşuna, grubun hangi sıradaki grup olduğunu ekleyerek oluşan okunuşu birleştirme
//       let ek1 = birler[Math.floor(intGrupDegeri / 100)];
//       const ek2 = birler[Math.floor(intGrupDegeri / 100)] ? " yüz " : "";
//       const ek3 = onlar[Math.floor((intGrupDegeri % 100) / 10)];
//       const ek4 = birler[intGrupDegeri % 10];
//       if (ek2 && ek1 === "Bir") {
//         ek1 = "";
//       }
//       okunus += ek1 + ek2 + ek3 + " " + ek4 + " " + gruplar[i - 1] + " ";
//     }
//   }

//   // Ondalık kısmın okunuşunu hesaplama ve tam kısmın okunuşu ile birleştirme

//   if (ondalikKisim) {
//     for (let i = grupSayisi; i > 0; i--) {
//       const grupDegeri = ondalikKisim?.substring(
//         ondalikKisim.length - i * 3,
//         ondalikKisim.length - (i - 1) * 3,
//       );
//       const intGrupDegeri = parseInt(grupDegeri);
//       if (intGrupDegeri) {
//         // Grup değerinin okunuşuna, grubun hangi sıradaki grup olduğunu ekleyerek oluşan okunuşu birleştirme
//         const ek1 = birler[Math.floor(intGrupDegeri / 100)];
//         const ek2 = birler[Math.floor(intGrupDegeri / 100)] ? " yüz " : "";
//         const ek3 = onlar[Math.floor((intGrupDegeri % 100) / 10)];
//         const ek4 = birler[intGrupDegeri % 10];
//         kurusOkunus += ek1 + ek2 + ek3 + " " + ek4 + " ";
//       }
//     }
//   }

//   // Kur cinsine göre sonuç okunuşunu oluşturma
//   switch (kurCinsi) {
//     case "TRY":
//       okunus += "Türk Lirası";
//       kurusOkunus += "Kuruş";
//       break;
//     case "USD":
//       okunus += "Amerikan Doları";
//       kurusOkunus += "sent";
//       break;
//     case "EUR":
//       okunus += "Euro";
//       kurusOkunus += "sent";
//       break;
//     case "GBP":
//       okunus += "İngiliz Sterlini";
//       kurusOkunus += "pens";
//       break;
//     case "CHF":
//       okunus += "İsviçre Frangı";
//       kurusOkunus += "rappen";
//       break;
//     case "JPY":
//       okunus += "Japon Yeni";
//       kurusOkunus += "sen";
//       break;
//     case "CNY":
//       okunus += "Çin Yuanı";
//       kurusOkunus += "fen";
//       break;
//     default:
//       okunus += "Türk Lirası";
//       kurusOkunus += "Kuruş";
//       break;
//   }

//   let result = okunus;
//   if (ondalikKisim) result += " - " + kurusOkunus;
//   return result;
// };
