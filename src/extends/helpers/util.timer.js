import moment from "moment";
import "moment/dist/locale/id";

export const differenceOfTwoDate = (date1, date2, type = "hour") => {
  const msMinutes = 60 * 1000;
  const msHours = 60 * 60 * 1000;
  const msDays = 60 * 60 * 24 * 1000;

  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  const diff = newDate2.getTime() - newDate1.getTime();

  let result = 0;
  switch (type) {
    case "minute":
      result = diff / msMinutes;
      break;
    case "hour":
      result = diff / msHours;
      break;
    case "day":
      result = diff / msDays;
      break;
  }

  return Math.floor(result);
};

export const sleep = async (ms = 15) => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};

export const debounce = (routine, wait, immediate = false) => {
  let timeout = null;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) routine.apply(context, args);
    }, wait);
    if (immediate && !timeout) routine.apply(context, args);
  };
};
