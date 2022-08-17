import React, { useState, useEffect, useContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../utils/fetching";
import { validateString } from "../../utils/validation";
import { GlobalContext } from "../../utils/GlobalContext";
import { setCookie } from "../../utils/cookies";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const { token, setToken } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      if (token) {
        navigate("/");
      }
    })();
  }, [token, navigate]);

  const handleLogin = async () => {
    if (validateString(user) || validateString(pass)) {
      alert("El usuario y la contraseña solo pueden tener numeros y letras.");
      return;
    }

    const res = await logIn(user, pass);

    if (!res.status) {
      alert(res.message);
      return;
    }

    alert("Sesion iniciada correctamente");
    setCookie(res.token);
    setToken(res.token);
    navigate("/");
  };

  return (
    <div className="background">
      <section>
        <main>
          <div>
            <h1>Iniciar sesión</h1>
            <h3>Para hacer cosas interesantes..</h3>
            <article>
              <input
                type="text"
                placeholder="Usuario"
                defaultValue={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <input
                type="password"
                placeholder="Constraseña"
                defaultValue={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              <div>
                <button className="button" onClick={handleLogin}>
                  Entrar
                </button>
                <Link to="/register">Registrarse</Link>
              </div>
            </article>
          </div>
        </main>
      </section>
    </div>
  );
}
