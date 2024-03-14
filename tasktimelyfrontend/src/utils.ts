export function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getStringDate(d: Date) {
    console.log(d?.getDate(), d?.getMonth(), d?.getFullYear());
    const date = d.getDate();
    const monthInt = d.getMonth();
    console.log(monthInt)
    const year = d.getFullYear();
    let monthStr = "";
    switch (monthInt + 1) {
        case 1:
            monthStr = "Jan";
            break;
        case 2:
            monthStr = "Feb";
            break;
        case 3:
            monthStr = "Mar";
            break;
        case 4:
            monthStr = "Apr";
            break;
        case 5:
            monthStr = "May";
            break;
        case 6:
            monthStr = "Jun";
            break;

        case 7:
            monthStr = "Jul";
            break;

        case 8:
            monthStr = "Aug";
            break;

        case 9:
            monthStr = "Sep";
            break;

        case 10:
            monthStr = "Oct";
            break;

        case 11:
            monthStr = "Nov";
            break;

        case 12:
            monthStr = "Dec";
            break;
    }
    return `${date} ${monthStr} ${year}`
}
