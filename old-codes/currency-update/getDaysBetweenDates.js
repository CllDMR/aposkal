
export function getDaysBetweenDates(firstDate, lastDate) {

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }
    // convert date from dd-mm-yyyy to yyyy-mm-dd
    firstDate = firstDate.split("-").reverse().join("-")
    lastDate = lastDate.split("-").reverse().join("-")
    const startDate = new Date(firstDate);
    const endDate = new Date(lastDate);

    const daysArray = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const formattedDate = formatDate(currentDate);
        daysArray.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return daysArray;
}
