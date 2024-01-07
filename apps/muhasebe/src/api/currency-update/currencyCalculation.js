
// const { getCurrencyFromDate } = require("./getCurrencyFromDB.js")
const currencyList = require("./currencyList");

const currencyCalculation = async ({ amount, from, to, currencyRates,date }) => {
    let _amount = Number(amount);
    if (isNaN(_amount)) throw new Error("Amount is not valid");

    // check from and to is valid on currencyList array on code property
    const fromCurrency = currencyList.find(currency => currency.code === from);
    const toCurrency = currencyList.find(currency => currency.code === to);
    if (!fromCurrency) throw new Error("From currency is not valid");
    if (!toCurrency) throw new Error("To currency is not valid");

    // check from and to is same
    if (from === to) return _amount;

    /*
    "USD": {
    "sell_ef": "25.9084",
    "buy": "25.8231",
    "sell": "25.8696",
    "buy_ef": "25.805"
    },
    */

    let rateType = "sell"

    const fromCurrencyRate = currencyRates[from]?.[rateType];
    const toCurrencyRate = currencyRates[to]?.[rateType];

    if (!fromCurrencyRate) throw new Error(`No sell_ef rate found for currency: ${from}`);
    if (!toCurrencyRate) throw new Error(`No sell_ef rate found for currency: ${to}`);

    const resultAmount = (_amount / toCurrencyRate) * fromCurrencyRate;
    return {
        amount,
        from,
        to,
        rateType,
        date,
        fromCurrencyRate,
        toCurrencyRate,
        resultAmount

    }

};


module.exports = currencyCalculation;