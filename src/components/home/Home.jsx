import React from "react";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { GlobalContext } from "../../utils/GlobalContext";
import { setCookie } from "../../utils/cookies";
import { logOut } from "../../utils/fetching";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  const { token, setToken } = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLogged(token ? true : false);
  }, [token]);

  const handleLogOut = () => {
    setCookie(null);
    setToken(null);
    navigate("/");
    logOut(token);
  };

  return (
    <>
      <nav>
        <h1>Fiumba S.A.</h1>
        <div>
          <p>Catalogo</p>
          <p>Localidades</p>
          <p>Sobre nosotros</p>
        </div>
        <div>
          {isLogged ? (
            <button className="logout" onClick={handleLogOut}>
              Cerrar sesion
            </button>
          ) : (
            <>
              <Link to="/login">Entrar</Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </div>
      </nav>
      <main>Aca va el tema de las promociones activas y todo ese temario.</main>
    </>
  );
}
