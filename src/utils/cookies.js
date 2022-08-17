export const getToken = () => {
  const stringCookies = document.cookie;
  const arrCookies = stringCookies.split(";");

  let savedCookie = arrCookies.find((cookie) => cookie.indexOf("token") !== -1);
  const token = savedCookie ? savedCookie.split("=")[1] : null;
  return token;
};

export const setCookie = (token) => (document.cookie = `token=${token};`);
