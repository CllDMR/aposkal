function getDaysArrayOfMonth(yyyymm) {
    const year = yyyymm.slice(0, 4);
    const month = yyyymm.slice(4);

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const daysArray = [];

    let currentDate = firstDay;
    while (currentDate <= lastDay) {
        const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
        daysArray.push(formattedDate);

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysArray;
}


module.exports = getDaysArrayOfMonth;