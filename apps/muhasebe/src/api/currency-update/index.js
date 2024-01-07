const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const apiKeyCheck = require("../utils/apiKeyCheck")

const updateCurrency = require("./updateCurrency")
const checkDateFormat = require("./checkDateFormat")

const { getCurrencyFromDate,
    getCurrencyFormDateRange } = require("./getCurrencyFromDB.js")

const admin = require("firebase-admin");
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

app.post("/api/currency", async (req, res) => {
    const request = req.body
    let { date, firstDate, lastDate } = request

    // check date format like dd-mm-yyyy and never accept future dates

    // get uid from apiKey
    const apiDoc = await apiKeyCheck(req, res)
    const uid = apiDoc.uid

    const infoRef = db.collection(`currency`).doc("queryInfo");
    const infoDoc = await infoRef.get();
    const infoData = infoDoc.data();
    // const lastQueryTimestamp = infoData?.lastQueryTimestamp;
    const lastQueryDate = infoData?.lastQueryDate;

    try {
        await updateCurrency(lastQueryDate)
    } catch (error) {
        console.log(error)
    }

    if (date) {
        date = checkDateFormat(date)
        const result = await getCurrencyFromDate(date)
        res.status(200).send(result)
        return
    }

    if (firstDate && lastDate) {
        firstDate = checkDateFormat(firstDate)
        lastDate = checkDateFormat(lastDate)
        const result = await getCurrencyFormDateRange(firstDate, lastDate)
        res.status(200).send(result)
        return
    }

    res.status(400).send("Bad request")
    return
})

app.post("/api/currency/calculation", async (req, res) => {
    const request = req.body
    let { amount, from, to, date } = request
    let currencyRates = null

    // if date is not exist, use today format like dd-mm-yyyy
    if (!date) {
        date = new Date().toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" })
        // convert date to dd-mm-yyyy format
        date = date.split(".").join("-")
    }

    date = checkDateFormat(date)
    currencyRates = await getCurrencyFromDate(date)

    const currencyCalculation = require("./currencyCalculation.js")
    const result = await currencyCalculation({ amount, from, to, date, currencyRates })
    res.status(200).send(result)
    return
})

exports.currency = functions.region('europe-west1').https.onRequest(app);