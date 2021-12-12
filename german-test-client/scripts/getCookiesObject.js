"use strict";
export function getCookiesObject() {
  const cookiesPairs = decodeURIComponent(document.cookie)
    .replaceAll("+", " ")
    .split(";");
  const res = {};
  for (const pair of cookiesPairs) {
    const [key, value] = pair.split("=");
    res[key.trim()] = value;
  }
  return res;
}
