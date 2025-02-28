export const datetimeCalulate = {
  goodDateTimeFormat:  (date, month, year, hr, min, sec) => {
    let date1, hr1, min1, sec1;
    if (date < 10) {
      date1 = "" + 0 + date;
    } else {
      date1 = date;
    }
    if (hr < 10) {
      hr1 = "" + 0 + hr;
    } else {
      hr1 = hr;
    }
    if (min < 10) {
      min1 = "" + 0 + min;
    } else {
      min1 = min;
    }
    if (sec < 10) {
      sec1 = "" + 0 + sec;
    } else {
      sec1 = sec;
    }
    let fullDate = `${date1}-${month}-${year} ${hr1}:${min1}:${sec1}`;
    return fullDate;
  },
   convertISOToRFC2822:  (isoDateString)=> {
    const isoDate = new Date(isoDateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  
    return isoDate.toLocaleDateString('en-US', options);
  },
   convertISOToSortableDateTime:(isoDateString)=> {
    const isoDate = new Date(isoDateString);
    
    const padZero = (value) => (value < 10 ? `0${value}` : String(value));
  
    const year = isoDate.getUTCFullYear();
    const month = padZero(isoDate.getUTCMonth() + 1); // Months are zero-based
    const day = padZero(isoDate.getUTCDate());
    const hours = padZero(isoDate.getUTCHours());
    const minutes = padZero(isoDate.getUTCMinutes());
    const seconds = padZero(isoDate.getUTCSeconds());
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
   convertISOToshortDate:(isoDateString)=> {
    const isoDate = new Date(isoDateString);
  
    // Array of month names
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const year = isoDate.getUTCFullYear();
    const month = monthNames[isoDate.getUTCMonth()]; // Get month name from array
    const day = isoDate.getUTCDate();
  
    // Format the day with zero-padding if needed
    const formattedDay = day < 10 ? `0${day}` : day;
  
    // Create the custom formatted date
    const formattedDate = `${month} ${formattedDay}, ${year}`;
  
    return formattedDate;
  }
};
