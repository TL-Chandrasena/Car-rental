export const checkMinLength = (text, minLength) => text.length >= minLength;

export const checkMaxLength = (text, maxLength) => text.length <= maxLength;

export const checkUrl = (url) => url.startsWith("http");

export const checkEmail = (mail) =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);

export const checkEqualValues = (value1, value2) => value1 === value2;
