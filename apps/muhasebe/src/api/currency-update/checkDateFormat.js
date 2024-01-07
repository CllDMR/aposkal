function checkDateFormat(date) {
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;

    if (!datePattern.test(date)) {
        throw new Error('Geçersiz tarih formatı. Doğru format: dd-mm-yyyy');
    }

    const [day, month, year] = date.split('-').map(Number);
    const inputDate = new Date(year, month - 1, day); // Ay, JavaScript'te 0'dan başladığı için month - 1 kullanıyoruz

    const now = new Date();
    const trOffset = 3; // Türkiye saat dilimi ofseti (UTC+03:00)

    const currentYear = now.getUTCFullYear();
    const currentMonth = now.getUTCMonth() + 1;
    const currentDay = now.getUTCDate();

    const currentHour = now.getUTCHours();
    const currentMinute = now.getUTCMinutes();

    const adjustedDate = new Date(
        currentYear,
        currentMonth - 1,
        currentDay,
        currentHour + trOffset,
        currentMinute
    );

    if (inputDate > adjustedDate) {
        return `${currentDay}-${currentMonth}-${currentYear}`;
    }
    // min date "24-12-2021"
    const minDate = new Date(2021, 11, 24);
    if (inputDate < minDate) {
        return `${24}-${12}-${2021}`;
    }
    
    return date;
}


module.exports = checkDateFormat;