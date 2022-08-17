import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { getToken } from "./utils/cookies";
import { GlobalContext } from "./utils/GlobalContext";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { validateToken } from "./utils/fetching";

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      if (token === "") {
        const possibleToken = getToken();

        if (possibleToken === null) {
          setToken(null);
          return;
        }

        const wasValid = await validateToken(possibleToken);
        if (!wasValid.status) {
          setToken(null);

          return;
        }

        setToken(possibleToken);
      }
    })();
  }, [token]);

  return (
    <GlobalContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}
