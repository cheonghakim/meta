import moment from "moment/dist/moment";
import $ from "jquery/dist/jquery.js";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import { numberSign } from "@/js/regex";

/**
 * 날짜 포맷
 * @param format
 * @param date
 * @returns {*}
 */
export const formatDate = (format, date) => {
  if (date !== null) {
    let newDate = moment(date).format(format);
    if (newDate.indexOf("pm") !== -1) {
      newDate = newDate.replace("pm", "오후");
    } else if (newDate.indexOf("am") !== -1) {
      newDate = newDate.replace("am", "오전");
    }
    return newDate;
  } else {
    return "";
  }
};

/**
 * body scroll 금지
 */
export const notScroll = (className) => {
  $(className).on("scroll touchmove mousewheel", function (event) {
    event.preventDefault();
    event.stopPropagation();

    return false;
  });
};

/**
 * body scroll 복구
 */
export const scrollAccept = (className) => {
  $(className).off("scroll touchmove mousewheel");
};

/**
 * 스크롤 중첩 방지
 */
export function scrollDisable() {
  $("body").addClass("scroll-disable");
}
/**
 * 스크롤 복구
 */
export function scrollActivate() {
  $("body").removeClass("scroll-disable");
}

/**
 * 날짜 포맷
 * @param format
 * @param date
 * @returns {*}
 */
export const formatDateLegacy = (format, date) => {
  let d = new Date(date),
    year = d.getFullYear(),
    month = d.getMonth() + 1,
    day = d.getDate(),
    hh = d.getHours(),
    mm = d.getMinutes(),
    ss = d.getSeconds();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  if (hh < 10) hh = "0" + hh;
  if (mm < 10) mm = "0" + mm;
  if (ss < 10) ss = "0" + ss;
  hh = hh == "0" ? "00" : hh;
  mm = mm == "0" ? "00" : mm;
  ss = ss == "0" ? "00" : ss;

  format = format.replace("yyyy", year);
  format = format.replace("MM", month);
  format = format.replace("dd", day);
  format = format.replace("hh", hh);
  format = format.replace("mm", mm);
  format = format.replace("ss", ss);
  return format;
};

/**
 * 다음 주소 format
 * @param fn(post, address)
 */
export const daumAddressFormat = (data) => {
  // 각 주소의 노출 규칙에 따라 주소를 조합한다.
  // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
  let fullAddr = ""; // 최종 주소 변수
  let extraAddr = ""; // 조합형 주소 변수
  // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
  if (data.userSelectedType === "R") {
    // 사용자가 도로명 주소를
    // 선택했을 경우
    fullAddr = data.roadAddress;
  } else {
    // 사용자가 지번 주소를 선택했을 경우(J)
    fullAddr = data.jibunAddress;
  }
  // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
  if (data.userSelectedType === "R") {
    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraAddr += data.bname;
    }
    // 건물명이 있고, 공동주택일 경우 추가한다.
    if (data.buildingName !== "" && data.apartment === "Y") {
      extraAddr +=
        extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
    }
    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
    fullAddr += extraAddr !== "" ? " (" + extraAddr + ")" : "";
  }
  return {
    post: data.zonecode,
    address: fullAddr,
  };
};

/**
 * UUID 생성
 * @returns {string}
 */
export const uuid = () => {
  const s4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return [
    s4(),
    s4(),
    "-",
    s4(),
    "-",
    s4(),
    "-",
    s4(),
    "-",
    s4(),
    s4(),
    s4(),
  ].join("");
};

/**
 * http get 쿼리 스트링 생성
 * @param obj
 * @returns {string}
 */
export const queryString = (obj, emptyStr = false) => {
  let query = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          query.push(`${key}=${encodeURIComponent(v)}`);
        });
      } else {
        query.push(`${key}=${encodeURIComponent(value)}`);
      }
    } else if (value !== undefined && value !== null && emptyStr) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          query.push(`${key}=${encodeURIComponent(v)}`);
        });
      } else {
        query.push(`${key}=${encodeURIComponent(value)}`);
      }
    }
  });
  return `?${query.join("&")}`;
};

/**
 * 깊은 복사 *파일은 복사 안된다, import  cloneDeep  from "lodash/cloneDeep"; 파일까지 깊은 복사
 * @param value
 * @returns {any}
 */
export const clone = (value) => {
  return JSON.parse(JSON.stringify(value));
};

/**
 * undefined => null 변환
 * @param value
 * @returns {null}
 */
export const unToNull = (value) => {
  return value === undefined ? null : value;
};

// 팝업 데이터 반환
export const popupData = (width, height) => {
  return {
    width: width,
    height: height,
    left: (window.screen.width - width) / 2,
    top: (window.screen.height - height) / 2,
    toString: function () {
      return `width=${this.width},height=${this.height},left=${this.left},top=${top}`;
    },
  };
};

// 쿠키 저장
export const setCookie = (name, value, exp) => {
  let date = new Date();
  date.setDate(date.getDate() + exp);
  document.cookie =
    name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
};

// 쿠키 불러오기
export const getCookie = (name) => {
  let popUp = name + "=";
  let cookieIndex = 0;
  while (cookieIndex <= document.cookie.length) {
    let subCookieIndex = Number(cookieIndex + popUp.length);
    if (document.cookie.substring(cookieIndex, subCookieIndex) === popUp) {
      let endIndex = document.cookie.indexOf(";", subCookieIndex);
      if (endIndex === -1) {
        endIndex = document.cookie.length;
      }
      return unescape(document.cookie.substring(subCookieIndex, endIndex));
    }
    cookieIndex = document.cookie.indexOf(" ", cookieIndex) + 1;
    if (cookieIndex === 0) {
      break;
    }
  }
  return "";
};

// 모바일 확인
const pc = "win16|win32|win64|mac|macintel";
export function isMobile() {
  return !(
    navigator.platform && pc.indexOf(navigator.platform.toLowerCase()) !== -1
  );
}
// webview 확인
export function isWebview() {
  return (
    navigator.userAgent &&
    (navigator.userAgent.toUpperCase().indexOf("APP_WEBVIEW_ANDROID") !== -1 ||
      navigator.userAgent.toUpperCase().indexOf("APP_WEBVIEW_IOS") !== -1)
  );
}

export function setMeta({ url, title, description, image }) {
  if (url) {
    $(".og-url").each(function () {
      $(this).attr("content", url);
    });
  }
  if (title) {
    $(".og-title").each(function () {
      $(this).attr("content", title);
    });
  } else if (description) {
    $(".og-title").each(function () {
      $(this).attr("content", description);
    });
  }
  if (description) {
    $(".og-description").each(function () {
      $(this).attr("content", description);
    });
  }
  if (image) {
    $(".og-image").each(function () {
      $(this).attr("content", image);
    });
  }
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * 파일을 url형태로 변환
 * @param {*} file
 * @returns
 */
export function changeFileToUrl(file) {
  // 부차적인 방법
  if (window.URL) {
    return window.URL.createObjectURL(file);
  } else if (window.webkitURL) {
    return window.webkitURL.createObjectURL(file);
  } else {
    try {
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);
      if (url) return url;
      else return null;
    } catch (error) {
      return null;
    }
  }
}

/**
 * 현재로부터 미래까지의 기간을 반환
 * @param {*} salt 추가적으로 더할 개월 수
 * @returns
 */
export function getMonthPeriod(salt) {
  if (!salt) salt = 0;
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth() + salt, 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1 + salt, 0);
  return [firstDay, lastDay];
}

/**
 * 해당하는 달의 일수 반환
 * @param {*} year
 * @param {*} month
 * @returns
 */
export function getMonthDates(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}

/**
 * 해당하는 요일 반환
 * @param {*} year
 * @param {*} month
 * @param {*} day
 * @returns
 */
export function getDayOftheWeek(year, month, day) {
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(year, month, day);
  return weeks[date.getDay()];
}

/**
 * 특정 기간의 범위를 반환
 * @param {*} salt 추가적으로 더할 개월 수
 * @returns
 */
export function getMonthsInPeriods(startSalt, endSalt) {
  if (!startSalt) startSalt = 0;
  if (!endSalt) endSalt = 0;

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth() + startSalt, 1);
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1 + endSalt,
    0
  );
  return [firstDay, lastDay];
}

/**
 * 금액을 한글로 변환
 * @param {*} num (int, string)
 * @returns string
 */
export function changeNumberToKorean(num) {
  if (num?.length > 12) return "변환할 수 없는 금액입니다.";
  if (typeof num !== "string") num = String(num);
  num = parseInt((num + "").replace(/[^0-9]/g, ""), 10) + "";
  if (num === "0") return "영 원";

  const number = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const unit = ["", "만", "억", "조"];
  const smallUnit = ["천", "백", "십", ""];
  const result = [];
  let unitCnt = Math.ceil(num.length / 4);
  num = num.padStart(unitCnt * 4, "0");
  const regexp = /[\w\W]{4}/g;
  let array = num.match(regexp);

  for (let i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
    const hanValue = makeKorean(array[i]); //한글로 변환된 숫자
    if (hanValue == "") continue;
    result.unshift(hanValue + unit[unitCnt]);
  }

  /*
   * 네자리 숫자를 매개변수로 받는다
   */
  function makeKorean(text) {
    let str = "";
    for (let i = 0; i < text.length; i++) {
      let num = text[i];
      if (num == "0") continue;
      str += number[num] + smallUnit[i];
    }
    return str;
  }

  return `${result.join("")}`;
}

export function deepCopy(obj) {
  return cloneDeep(obj);
}

export function randomColor() {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
}

export function ConvertRGBtoHex(red, green, blue) {
  return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

export function getRgbFromNumber(r, g, b, num) {
  const rValue = Math.round(r * num) > 256 ? 255 : Math.round(r * num);
  const gValue = Math.round(g * num) > 256 ? 255 : Math.round(g * num);
  const bValue = Math.round(b * num) > 256 ? 255 : Math.round(b * num);
  return [rValue, gValue, bValue];
}

function ColorToHex(color) {
  const hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}

/**
 * ag grid 아이템에서 인덱스 찾기
 * @param {*} arr
 * @param {*} target
 * @param {*} id
 * @returns index
 */
export function returnIndex(arr, target, id) {
  let index = -1;
  for (let i = 0; i < arr?.length; i++) {
    if (arr[i][target] === id) {
      index = i;
      break;
    }
  }
  return index;
}

/**
 * 객체안의 키값이 전부 있는지 확인
 * @param {*} target 검색대상 객체
 * @param {*} arr 검색할 키 리스트
 * @returns Boolean
 */
export function checkEveryProperties(target = {}, arr = []) {
  return arr.every((item) => {
    return target.hasOwnProperty(item);
  });
}

/**
 * 객체안의 키값이 일부 있는지 확인
 * @param {*} target 검색대상 객체
 * @param {*} arr 검색할 키 리스트
 * @returns Boolean
 */
export function checkSomeProperties(target = {}, arr = []) {
  return arr.some((item) => {
    return target.hasOwnProperty(item);
  });
}

/**
 * 배열안에서 일치하는 객체가 있는지 확인하고 인덱스 반환
 * @param {*} target 검색 비교 객체
 * @param {*} arr 검색할 리스트
 * @returns Number
 */
export function checkEqaulObject(target = {}, arr = []) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (isEqual(arr[i], target)) return i;
  }
  return index;
}

/**
 * 부모그룹 인덱스 반환 함수
 * @param {Array} arr
 * @param {Array} parentId
 * @returns Number<index>
 */
function getParent(arr, parentId) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === parentId) return i;
  }
  return -1;
}

/**
 * 부모그룹 인덱스 반환 함수
 * @param {Array} arr
 * @param {Array} parentId
 * @returns Number<index>
 */
function getParentLevel1(arr, parentId) {
  for (let i = 0; i < arr?.length; i++) {
    if (String(arr[i].id) === String(parentId)) return i;
  }
  return -1;
}

/**
 * 부모그룹 인덱스 반환 함수
 * @param {Array} arr
 * @param {Array} parentId
 * @returns Number<index>
 */
function getParentLevel2(arr, parentId) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].children.length; j++) {
      // 부모 레벨로 진입
      // arr[i].children[j].id 부모 아이디
      // parentId에 저장된 부모 아이디

      if (String(arr[i].children[j].id) === String(parentId)) {
        return {
          root: i,
          middle: j,
        };
      }
    }
  }
  return -1;
}

/**
 * 부모그룹 인덱스 반환 함수
 * @param {Array} arr
 * @param {Array} parentId
 * @returns Number<index>
 */
function getParentLevel3(arr, parentId) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].children.length; j++) {
      for (let k = 0; k < arr[i].children[j].children.length; k++)
        if (String(arr[i].children[j].children[k].id) === String(parentId)) {
          return {
            root: i,
            middle: j,
            last: k,
          };
        }
    }
  }
  return -1;
}

export function changeFilterForm(
  list = [],
  filter = [],
  name = "",
  target = ""
) {
  const changeList = changeSelectList(list);

  let check = false;
  filter?.forEach((item) => {
    if (item.name === name) {
      item.target = target;
      item.attributes = changeList;
      check = true;
    }
  });
  if (check) return filter;
  else {
    return [
      ...filter,
      {
        name,
        target,
        attributes: changeList,
      },
    ];
  }
}

export function changeSelectList(list) {
  list?.forEach((item) => {
    if (item.hasOwnProperty("key") && item.hasOwnProperty("value")) {
      item.name = item.value;
      item.value = item.key;
    }
  });
  return list;
}

export function checkKeyStatus(evt, target) {
  if (evt?.getModifierState) return evt?.getModifierState(target);
  else return false;
}

export function findValueWithKey(arr, value) {
  for (let i = 0; i < arr?.length; i++) {
    if (
      String(arr[i]["key"]) === String(value) ||
      String(arr[i]["value"]) === String(value)
    )
      return { key: value, value: String(value), name: arr[i]?.name };
  }
  return undefined;
}

export function findValueWithName(arr, value) {
  const pattern = /(?=.*)\(([0-9]{1,})\)/i;
  const copy = String(value);
  const matched = copy.replace(pattern, "");

  for (let i = 0; i < arr?.length; i++) {
    if (matched) {
      if (String(arr[i]["name"])?.trim() === String(matched)?.trim())
        return {
          key: arr[i]?.value,
          value: String(arr[i]?.value),
          name: arr[i]?.name,
        };
    } else {
      if (String(arr[i]["name"]) === String(value)) {
        return {
          key: arr[i]?.value,
          value: String(arr[i]?.value),
          name: arr[i]?.name,
        };
      }
    }
  }
  return undefined;
}

// ex) 82
export function findCountryValueWithCode(arr, value) {
  let copy = cloneDeep(arr);
  for (let i = 0; i < copy?.length; i++) {
    if (String(copy[i]["dial_code"]) === String(value))
      return { dial_code: value, name: copy[i]?.name, code: copy[i]?.code };
  }
  copy = null;
  return undefined;
}

// ex) Korea
export function findCountryValueWithDial(arr, value) {
  let copy = cloneDeep(arr);
  for (let i = 0; i < copy?.length; i++) {
    if (String(copy[i]["code"]) === String(value))
      return {
        code: value,
        name: copy[i]?.name,
        dial_code: copy[i]?.dial_code,
      };
  }
  copy = null;
  return undefined;
}

export function getTagValues(tagList) {
  return tagList?.map((item) => item.value)?.join("|");
}

export function setTagValues(tagStr) {
  if (
    !tagStr ||
    typeof tagStr !== "string" ||
    tagStr?.length <= 0 ||
    tagStr === "null" ||
    tagStr === "undefined"
  )
    return [];
  return tagStr
    ?.split("|")
    ?.filter((item) => item !== "")
    ?.map((item) => {
      return { name: item, value: item };
    });
}

export function getFirewallTagValues(tagList) {
  const str = tagList?.map((item) => item.value)?.join("|");

  if (str === "") return "|";
  else return `|${str}|`;
}

export function getHTMLFormat(cont) {
  const parse = new DOMParser();
  const parsed = parse.parseFromString(
    cont
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/(src=)(&quot;)(.*)(&quot;)(.*)/gm, "$1$3$5"),
    "text/html"
  );
  return parsed.body.outerHTML || cont;
}

export function getLastMonth(now = new Date(), iter = 4) {
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  const res = [];
  while (iter > 0) {
    if (month <= 0) {
      month += 12;
      year -= 1;
    }
    if (month < 10) res.unshift(`${year}-0${month}`);
    else res.unshift(`${year}-${month}`);
    iter -= 1;
    month -= 1;
  }
  return res;
}

/**
 * Base64 => File Object
 * @param {*} src
 * @param {*} name
 * @param {*} type
 * @returns File Object
 */
export async function changeBase64ToFile(
  base64,
  name = "image-file",
  type = { type: "image/png" }
) {
  const res = await fetch(base64);
  const blob = res.blob();
  return new File([blob], name, type);
}

/**
 *
 * @param {*} num 숫자
 * @param {*} format 변환할 진법 형식(2, 8, 16 ..)
 * @returns 변환한 진법 형식
 */
export function toNumFormat(num = 0, format = 2) {
  const n = num;
  return n.toString(format);
}

/**
 *
 * @param {*} num 문자열수 ("110110")
 * @param {*} format 현재 형식
 * @returns decimal number
 */
export function toDecimal(num, format = 2) {
  const n = num;
  return parseInt(n, format);
}
