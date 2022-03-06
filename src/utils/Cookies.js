export function createCookie(name, value, days) {
  let expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ) removed
    expires = "; expires=" + date.toGMTString(); // + added
  }
  // document.cookie = name + "=" + value + expires + ";path=/";
  document.cookie =
    name + "=" + encodeURIComponent(value) + expires + ";path=/"; // + and " added
}

export function getCookie(cookieName) {
  let match =
    document.cookie.match &&
    document.cookie.match(new RegExp(cookieName + `=([^;]+)`));
  if (match) return decodeURIComponent(match[1]);
}

export function deleteCookie(cookieName) {
  document.cookie =
    cookieName + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
