function getYearMonthArray(startYearMonth, endYearMonth) {
    const startDate = new Date(`${startYearMonth.slice(0, 4)}-${startYearMonth.slice(4)}-01`);
    const endDate = new Date(`${endYearMonth.slice(0, 4)}-${endYearMonth.slice(4)}-01`);

    const yearMonthArray = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        yearMonthArray.push(`${year}${month}`);

        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return yearMonthArray;
}

module.exports = getYearMonthArray;