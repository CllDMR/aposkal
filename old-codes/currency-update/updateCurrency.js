const tcmbRequest = require("./tcmbRequest");
const { Timestamp } = require('firebase-admin/firestore')
const admin = require("firebase-admin");
const db = admin.firestore();

const updateCurrency = async (lastQueryDate = null) => {

    // if lastQueryDate is null lastQueryDate = 01-01-2022
    if (!lastQueryDate) {
        lastQueryDate = "24-12-2021"
    }

    // get today date with format dd-mm-yyyy turkish time zone
    const today = new Date().toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" })
    // convert date to dd-mm-yyyy format
    const todayArr = today.split(".")
    const day = todayArr[0]
    const month = todayArr[1]
    const year = todayArr[2]
    const todayDate = `${day}-${month}-${year}`
    // if todayDate is equal lastQueryDate return
    if (todayDate === lastQueryDate) return

    const lastQueryYear = lastQueryDate.split("-")[2]
    const lastQueryMonth = lastQueryDate.split("-")[1]
    const lastQueryDay = lastQueryDate.split("-")[0]

    const lastQueryBefore30Day = new Date(lastQueryYear, lastQueryMonth - 1, lastQueryDay - 30)

    let lastQueryBefore30DayString = lastQueryBefore30Day.toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" })
    // lastQueryBefore30DayString format dd-mm-yyyy
    lastQueryBefore30DayString = lastQueryBefore30DayString.split(".").join("-")
    const startDate = `startDate=${lastQueryBefore30DayString}`
    const endDate = `endDate=${todayDate}`
    const tcmbResult = await tcmbRequest(startDate, endDate);

    // burada isnullday true olmayanları db ye kaydet isNullday Turu ise bir önceki öğeye bak false olanu bulup kaydet.

    // find first isNullDay false item and delete before items

    let firstNotNullDayIndex = null

    for (let i = 0; i < tcmbResult.length; i++) {
        if (!tcmbResult[i].isNullDay) {
            firstNotNullDayIndex = i
            break
        }
    }
    const removeFirstNullDays = tcmbResult.filter((item, index) => index >= firstNotNullDayIndex)

    const _tcmbResult = removeFirstNullDays.map((item, index) => {
        if (index === 0) return item
        let lastNotNullDay = null
        if (item.isNullDay) {
            // find last not null day

            for (let i = index; i >= 0; i--) {
                if (!removeFirstNullDays[i].isNullDay) {
                    lastNotNullDay = removeFirstNullDays[i]
                    break
                }
            }
            // if lastNotNullDay is null return
            if (!lastNotNullDay) return
            // if lastNotNullDay is not null set lastNotNullDay to item

            return {
                ...lastNotNullDay,
                date: item.date,
                currencyDate: lastNotNullDay.currencyDate,
                yearMonth: item.yearMonth,
                previousDate: item.previousDate,
                isNullDay: item.isNullDay,
            }

        } else return item
    })

    // get uniq yearMonth from tcmbResult as array
    const currencyIDs = [...new Set(_tcmbResult.map(item => item.yearMonth))]

    for await (const currencyID of currencyIDs) {
        const currencyRef = db.collection(`currency`).doc(currencyID);
        const filterResult = _tcmbResult.filter(item => item.yearMonth === currencyID)
        const currencyData = {}
        for await (const item of filterResult) {
            const dayKey = item.date
            currencyData[dayKey] = item
        }
        await currencyRef.set(currencyData, { merge: true });
    }

    const infoRef = db.collection(`currency`).doc("queryInfo");
    await infoRef.set({
        lastQueryDate: todayDate,
        lastQueryTimestamp: Timestamp.fromDate(new Date())
    }, { merge: true });

}

module.exports = updateCurrency