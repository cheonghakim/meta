import { formatDate } from "./util";
import { categoryData } from "@/data/categoryData";
import * as moment from "moment";

/**
 * 날짜 포맷 YYYY-MM-DD
 * @param value
 * @returns {*}
 */
export const dateFormat = (value = moment()) => {
  return formatDate("YYYY-MM-DD", value);
};
/**
 * 날짜 포맷 YYYY.MM.DD
 * @param {*} value
 */
export const dateFormat2 = (value = moment()) => {
  return formatDate("YYYY.MM.DD", value);
};

/**
 * 날짜 시간 포맷 YYYY-MM-DD a hh:mm:ss
 * @param value
 * @returns {*}
 */
export const dateTimeFormat = (value = moment()) => {
  return formatDate("YYYY-MM-DD a hh:mm:ss", value);
};
/**
 * 날짜 시간 포맷 YYYY-MM-DD a hh:mm:ss
 * @param value
 * @returns {*}
 */
export const dateTimeFormat2 = (value = moment()) => {
  return formatDate("YYYY.MM.DD a hh:mm:ss", value);
};

/**
 * 날짜 시간 포맷 YYYY-MM-DD a hh:mm
 * @param value
 * @returns {*}
 */
export const dateMinutesFormat = (value = moment()) => {
  return formatDate("YYYY-MM-DD a hh:mm", value);
};

/**
 * 한글 방지
 * @param value
 * @returns {*}
 */
export const preventKorean = value => {
  const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
  if (!reg.exec(value)) {
    return value.replace(/[^A-Z-_0-9]/gi, "");
  } else {
    return "";
  }
};

/**
 * 금액 포맷 xx,xxx,xxx
 * @param value
 * @returns {string}
 */
export const numberFormat = value => {
  if (value) {
    value = value.toString().replace(/[^0-9]/g, "");
    value = Number(value).toString();
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "0";
};

/**
 * 금액 포맷(음수포함) (-)xx,xxx,xxx
 * @param value
 * @returns {string}
 */
export const numberFormatRegardsNegative = value => {
  if (value) {
    //문자가 섞인경우에도 parseInt로 정수만 반환한다
    value = parseInt(value, 10).toString();
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "0";
};

/**
 * 전화번호 포맷 type 0일때 hidden
 * @param num
 * @param type
 * @returns {*}
 */
export const phoneFormat = (num = "", type) => {
  let formatNum = "";
  if (num === null) {
    num = "";
  }
  num = num.toString();
  num = num.replace(/[^0-9]/g, "");
  if (num.length === 11) {
    if (type === 0) {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
    } else {
      formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
  } else if (num.length === 8) {
    formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else {
    if (num.indexOf("02") === 0) {
      if (type === 0) {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
      } else {
        formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
      }
    } else {
      if (type === 0) {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3");
      } else {
        formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
      }
    }
  }
  return formatNum;
};

export const businessFormat = (num = "", type) => {
  let formatNum = "";
  if (num === null) {
    num = "";
  }
  num = num.toString();
  num = num.replace(/[^0-9]/g, "");

  if (num.length === 10) {
    if (type === 0) {
      formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-*****");
    } else {
      formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
    }
  } else {
    if (type === 0) {
      formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-*****");
    } else {
      formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
    }
  }
  return formatNum;
};

/**
 * 카테고리
 * @param value
 * @returns {string}
 */
export function categoryFormat(value) {
  let name = "";
  for (const category of categoryData) {
    if (category.category === value) {
      name = category.name;
    }
  }
  return name;
}

export function mondayFormat(date) {
  const day = date.getDay() || 7;
  if (day !== 1) date.setHours(-24 * (day - 1));
  return date;
}

/**
 * 일 카운트 다운
 */
const ss = 1000;
const mm = ss * 60;
const hh = mm * 60;
const dd = hh * 24;
export function countDownDay(dt) {
  const end = moment(dt)
    .zone("Asia/Seoul")
    .toDate();
  const now = moment()
    .zone("Asia/Seoul")
    .toDate();
  const distance = end - now;
  const days = Math.floor(distance / dd);
  const hours = Math.floor((distance % dd) / hh);
  const minutes = Math.floor((distance % hh) / mm);
  const seconds = Math.floor((distance % mm) / ss);
  if (days > -1) {
    let result = "";
    if (days) {
      result = days + "일 남음";
    } else if (hours) {
      result = hours + "시간 남음";
    } else if (minutes) {
      result = minutes + "분 남음";
    } else {
      result = "";
    }
    return result;
  } else {
    return "";
  }
}

/**
 * 지수값으로 변환
 */
export function expRangePrice({ minPrice, maxPrice, current }) {
  const minValue = Math.log(1);
  const maxValue = Math.log(maxPrice);
  const scale = (maxValue - minValue) / (maxPrice - minPrice);
  return Number(Math.exp(minValue + scale * (current - minPrice)).toFixed(0));
}

/**
 * 지수값 원본값으로 변환
 */
export function expRangePriceOriginal({ minPrice, maxPrice, current }) {
  const minValue = Math.log(1);
  const maxValue = Math.log(maxPrice);
  const scale = (maxValue - minValue) / (maxPrice - minPrice);
  const result = Number((Math.log(current) / scale).toFixed(0));
  return result === -Infinity ? 0 : result;
}
