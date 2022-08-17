import React, { useState, useEffect, useContext } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../utils/fetching";
import { validateStringLength, validateString } from "../../utils/validation";
import { setCookie } from "../../utils/cookies";
import { GlobalContext } from "../../utils/GlobalContext";

export default function Register() {
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

  const handleRegister = async () => {
    if (
      validateStringLength(user, 30, 4) ||
      validateStringLength(pass, 30, 8)
    ) {
      alert(
        "El usuario debe tener de 4 a 30 caracteres y contraseña debe entre 8 y 30."
      );
      return;
    }

    if (validateString(user) || validateString(pass)) {
      alert("El usuario y la contraseña solo pueden tener numeros y letras.");
      return;
    }

    const res = await register(user, pass);

    if (!res.status) {
      alert("Ha ocurrido un error creando su cuenta");
      return;
    }

    alert("Su cuenta se ha creado correctamente");
    setCookie(res.token);
    setToken(res.token);
    navigate("/");
  };

  return (
    <div className="background">
      <section>
        <main>
          <div>
            <h1>Crea tu cuenta</h1>
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
                <button className="button" onClick={handleRegister}>
                  Crear
                </button>
                <Link to="/login">Ya tengo cuenta</Link>
              </div>
            </article>
          </div>
        </main>
      </section>
    </div>
  );
}
