const { Timestamp } = require('firebase-admin/firestore')
const admin = require("firebase-admin");
const db = admin.firestore();

const getDaysBetweenDates = require("./getDaysBetweenDates")
const getYearMonthArray = require("./getYearMonthArray")
// const getDaysArrayOfMonth = require("./getDaysArrayOfMonth")

const getCurrencyFromDate = async (date) => {
    const dateArr = date.split("-")
    if (dateArr.length !== 3) throw new Error("Date format is not valid");
    let day = dateArr[0];
    // day padStart 2 digit
    day = day.padStart(2, "0");
    let month = dateArr[1];
    // month padStart 2 digit
    month = month.padStart(2, "0");
    const year = dateArr[2];

    // currencyID for firestore document id
    const currencyID = `${year}${month}`;
    // dayKey for firestore document field
    const dayKey = `${day}-${month}-${year}`;

    const currencyRef = db.collection(`currency`).doc(currencyID);
    const currencyDoc = await currencyRef.get();
    // check currency is exist
    if (currencyDoc.exists) {
        const currencyData = currencyDoc.data();
        const dayData = currencyData[dayKey];
        return dayData;
    } else {
        throw new Error("Currency is not exist in db");
    }
}

const getCurrencyFormDateRange = async (firstDate, lastDate) => {
    const firstDateArr = firstDate.split("-")
    const lastDateArr = lastDate.split("-")
    if (firstDateArr.length !== 3 || lastDateArr.length !== 3) throw new Error("Date format is not valid");
    let firstDay = firstDateArr[0];
    // firstDay padStart 2 digit
    firstDay = firstDay.padStart(2, "0");
    let firstMonth = firstDateArr[1];
    // firstMonth padStart 2 digit
    firstMonth = firstMonth.padStart(2, "0");
    let firstYear = firstDateArr[2];
    let lastDay = lastDateArr[0];
    // lastDay padStart 2 digit
    lastDay = lastDay.padStart(2, "0");
    let lastMonth = lastDateArr[1];
    // lastMonth padStart 2 digit
    lastMonth = lastMonth.padStart(2, "0");
    let lastYear = lastDateArr[2];

    // currencyID for firestore document id range from `${year}${month}` to `${year}${month}`
    const currencyID = `${firstYear}${firstMonth}`;
    // iterate from firstYearFirstMonth to lastYearLastMonth

    let year = firstYear;
    let month = firstMonth;

    const currencyIDs = getYearMonthArray(`${firstYear}${firstMonth}`, `${lastYear}${lastMonth}`);
    const days = getDaysBetweenDates(firstDate, lastDate);

    const currencyDatas = [];
    for await (const currencyID of currencyIDs) {
        const currencyRef = db.collection(`currency`).doc(currencyID);
        const currencyDoc = await currencyRef.get();

        // check currency is exist
        if (currencyDoc.exists) {
            const currencyData = currencyDoc.data();
            const filteredDays = days.filter(day => {
                const month = day.split("-")[1];
                const year = day.split("-")[2];
                const yearMonth = `${year}${month}`;
                return yearMonth === currencyID;
            })

            filteredDays.forEach(day => {
                const dayData = currencyData[day];
                if (dayData) {
                    currencyDatas.push(dayData);
                }
            }
            )
        }
    }
    return currencyDatas;
}

module.exports = {
    getCurrencyFromDate,
    getCurrencyFormDateRange
}





