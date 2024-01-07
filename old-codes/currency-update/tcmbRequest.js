const axios = require("axios");

const currencyList = require("./currencyList");

const tcmbRequest = async (startDate, endDate) => {

    // start request
    const apiKey = "TnbhLXNAiV"
    const currencyCodes = currencyList.map(cur => cur.code)
    const type = `type=json`
    const currencyes = currencyCodes.map(cur => `TP.DK.${cur}.A-TP.DK.${cur}.S-TP.DK.${cur}.A.EF-TP.DK.${cur}.S.EF`)
    const listString = currencyes.join("-")

    const url = `https://evds2.tcmb.gov.tr/service/evds/series=${listString}&${startDate}&${endDate}&${type}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        // const totalCount = response.data.totalCount;
        const items = response.data?.items;
        if (!items) throw new Error("No items found");
        let result = [];
        for (const iterator of items) {

            const date = iterator.Tarih;
            // date is dd-mm-yyyy convet to use for date object         
            const dateFormat = date.split("-").reverse().join("-")
            const dateObj = new Date(dateFormat);
            let previousDate = new Date(dateObj.setDate(dateObj.getDate() - 1));
            let isNullDay = false;
            // previousDate format dd-mm-yyyy
            let prevDay = previousDate.getDate();
            // day pads with 0 if less than 10
            prevDay = prevDay.toString().padStart(2, "0");

            const obj = {}
            for (const curr of currencyCodes) {
                const buy = iterator[`TP_DK_${curr}_A`];
                const sell = iterator[`TP_DK_${curr}_S`];
                const buy_ef = iterator[`TP_DK_${curr}_A_EF`];
                const sell_ef = iterator[`TP_DK_${curr}_S_EF`];
                // if all values are null skip
                if (!buy && !sell && !buy_ef && !sell_ef) {
                    obj[curr] = null;
                }
                else obj[curr] = { buy, sell, buy_ef, sell_ef }
            }
            // if all values are null isNullDay is true
            if (Object.values(obj).every(val => val === null)) {
                obj.isNullDay = true;
                for (const curr of currencyCodes) {
                    delete obj[curr]
                }
            }

            obj["TRY"] = {
                "sell_ef": "1",
                "buy": "1",
                "sell": "1",
                "buy_ef": "1"
            }

            let prevMonth = previousDate.getMonth() + 1;
            prevMonth = prevMonth.toString().padStart(2, "0");
            let prevYear = previousDate.getFullYear();
            previousDate = `${prevDay}-${prevMonth}-${prevYear}`

            // YearMonth is YYYYMM from date format dd-mm-yyyy
            let yearMonth = date.split("-").reverse().join("").substring(0, 6);
            result.push({
                date,
                currencyDate: date,
                yearMonth,
                previousDate,
                isNullDay,
                ...obj
            })
        }

        // save to json file result
        // const fs = require("fs");
        // const path = require("path");
        // const filePath = path.join(__dirname, "currency.json");
        // fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
        return result;

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

module.exports = tcmbRequest;


   // example response
/*
{
  Tarih: '08-03-2023',
  TP_DK_USD_A: '18.8907',
  TP_DK_USD_S: '18.9247',
  TP_DK_USD_A_EF: '18.8775',
  TP_DK_USD_S_EF: '18.9531',
  TP_DK_AUD_A: '12.5973',
  TP_DK_AUD_S: '12.6795',
  TP_DK_AUD_A_EF: '12.5394',
  TP_DK_AUD_S_EF: '12.7555',
  TP_DK_DKK_A: '2.7037',
  TP_DK_DKK_S: '2.717',
  TP_DK_DKK_A_EF: '2.7018',
  TP_DK_DKK_S_EF: '2.7233',
  TP_DK_EUR_A: '20.1549',
  TP_DK_EUR_S: '20.1913',
  TP_DK_EUR_A_EF: '20.1408',
  TP_DK_EUR_S_EF: '20.2215',
  TP_DK_GBP_A: '22.67',
  TP_DK_GBP_S: '22.7882',
  TP_DK_GBP_A_EF: '22.6541',
  TP_DK_GBP_S_EF: '22.8224',
  TP_DK_CHF_A: '20.2283',
  TP_DK_CHF_S: '20.3582',
  TP_DK_CHF_A_EF: '20.1979',
  TP_DK_CHF_S_EF: '20.3887',
  TP_DK_SEK_A: '1.7951',
  TP_DK_SEK_S: '1.8137',
  TP_DK_SEK_A_EF: '1.7938',
  TP_DK_SEK_S_EF: '1.8178',
  TP_DK_CAD_A: '13.8433',
  TP_DK_CAD_S: '13.9057',
  TP_DK_CAD_A_EF: '13.7921',
  TP_DK_CAD_S_EF: '13.9586',
  TP_DK_KWD_A: '61.2277',
  TP_DK_KWD_S: '62.0288',
  TP_DK_KWD_A_EF: '60.3093',
  TP_DK_KWD_S_EF: '62.9593',
  TP_DK_NOK_A: '1.8023',
  TP_DK_NOK_S: '1.8144',
  TP_DK_NOK_A_EF: '1.801',
  TP_DK_NOK_S_EF: '1.8186',
  TP_DK_SAR_A: '5.0329',
  TP_DK_SAR_S: '5.0419',
  TP_DK_SAR_A_EF: '4.9951',
  TP_DK_SAR_S_EF: '5.0798',
  TP_DK_JPY_A: '13.8698',
  TP_DK_JPY_S: '13.9617',
  TP_DK_JPY_A_EF: '13.8185',
  TP_DK_JPY_S_EF: '14.0147',
  TP_DK_BGN_A: '10.2459',
  TP_DK_BGN_S: '10.38',
  TP_DK_BGN_A_EF: '0',
  TP_DK_BGN_S_EF: '0',
  TP_DK_RON_A: '4.0718',
  TP_DK_RON_S: '4.125',
  TP_DK_RON_A_EF: '0',
  TP_DK_RON_S_EF: '0',
  TP_DK_RUB_A: '0.24896',
  TP_DK_RUB_S: '0.25222',
  TP_DK_RUB_A_EF: '0',
  TP_DK_RUB_S_EF: '0',
  TP_DK_IRR_A: '0.04473',
  TP_DK_IRR_S: '0.04531',
  TP_DK_IRR_A_EF: '0',
  TP_DK_IRR_S_EF: '0',
  TP_DK_CNY_A: '2.7099',
  TP_DK_CNY_S: '2.7453',
  TP_DK_CNY_A_EF: '0',
  TP_DK_CNY_S_EF: '0',
  TP_DK_PKR_A: '0.0677',
  TP_DK_PKR_S: '0.06859',
  TP_DK_PKR_A_EF: '0',
  TP_DK_PKR_S_EF: '0',
  TP_DK_QAR_A: '5.1478',
  TP_DK_QAR_S: '5.2152',
  TP_DK_QAR_A_EF: '0',
  TP_DK_QAR_S_EF: '0',
  TP_DK_KRW_A: '0.01442',
  TP_DK_KRW_S: '0.01461',
  TP_DK_KRW_A_EF: '0',
  TP_DK_KRW_S_EF: '0',
  TP_DK_AZN_A: '11.0499',
  TP_DK_AZN_S: '11.1945',
  TP_DK_AZN_A_EF: '0',
  TP_DK_AZN_S_EF: '0',
  TP_DK_AED_A: '5.1145',
  TP_DK_AED_S: '5.1814',
  TP_DK_AED_A_EF: '0',
  TP_DK_AED_S_EF: '0',
  UNIXTIME: [Object]
},
*/
