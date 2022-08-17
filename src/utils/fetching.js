import { BASE_URL } from "./data";

export const logIn = (user, pass) => {
  return fetch(`${BASE_URL}/users/login`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      user: user,
      pass: pass,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const register = (user, pass) => {
  return fetch(`${BASE_URL}/users/register`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      user: user,
      pass: pass,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const validateToken = (token) => {
  return fetch(`${BASE_URL}/users/token`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const logOut = (token) => {
  return fetch(`${BASE_URL}/users/token`, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify({
      token: token,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
