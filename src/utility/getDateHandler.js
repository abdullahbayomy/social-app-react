const getDateHandler = (date) => {
  let hours = new Date(`${date}`).getHours();
  let minutes = new Date(`${date}`).getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let mid = 'am';
  if (hours === 0) {
    //At 00 hours we need to show 12 am
    hours = 12;
  } else if (hours > 12) {
    hours = hours % 12;
    mid = 'pm';
  }

  let mydate = new Date(`${date}`);
  let month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][mydate.getMonth()];
  let actualDate =
    month + ' ' + (mydate.getDay() + 1) + ' at ' + hours + ':' + minutes + mid;
  return actualDate;
};

export default getDateHandler;
