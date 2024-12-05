//获取当前日期函数
export function getNowFormatDate() {
  let date = new Date(),
    year = date.getFullYear(), //获取完整的年份(4位)
    month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
    strDate = date.getDate(); // 获取当前日(1-31)
  if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

  return `${year}-${month}-${strDate}`;
}

export const getMonthArray = () => {
  //   const curYear = getNowFormatDate().split("-")[0];
  //   const curMonth = getNowFormatDate().split("-")[1];
  const curYear = "2023";
  const curMonth = "6";
  let curObj = {
    year: curYear,
    month: curMonth,
    curMonth: true,
  };
  let array = [curObj];
  console.log("curYear, curMonth", curYear, curMonth);

  for (let i = 1; i <= 5; i++) {
    const month = curMonth - i <= 0 ? curMonth - i + 12 : curMonth - i;
    const year = month > curMonth ? curYear - 1 : curYear;
    const showYear = month == 12;
    const obj = {
      year,
      month,
      showYear,
    };
    array.unshift(obj);
  }
  for (let j = 1; j <= 5; j++) {
    const month =
      curMonth * 1 + j > 12 ? curMonth * 1 + j - 12 : curMonth * 1 + j;
    const year = month < curMonth ? curYear * 1 + 1 : curYear;
    const showYear = month == 1;
    const obj = {
      year,
      month,
      showYear,
    };
    array.push(obj);
  }
  return array;
};
