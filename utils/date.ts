const convertDateToDashedDate = (date:Date): string => {
    return date.toISOString().replace(/T.*/, '').split('-').join('-')
}

const convertSecondsToDate = (seconds:number): Date =>{
    return new Date(seconds * 1000);
}

const convertDateToSeconds = (date:Date): number => {
    console.log('date', date)
    return Math.floor(date.getTime() / 1000);
}

 export {
     convertDateToDashedDate,
     convertSecondsToDate,
     convertDateToSeconds
 }
