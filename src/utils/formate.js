function formate(date, time, index) {
  const year = date.getFullYear();
  const month = zeroFill(date.getMonth() + 1);
  const day = zeroFill(date.getDate() + index);
  return `${year}-${month}-${day} : ${time}`;
}

function zeroFill(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

module.exports = {
  formate
};
