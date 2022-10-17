import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConections";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./home.css";
import emailSvg from "../../img/email.svg";
import passwordClosed from "../../img/passwordClosed.svg";
import passwordOpen from "../../img/passwordOpen.svg";
import cicleInfoSvg from "../../img/circle-info.svg";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("errors:", errors);

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

  const inputEmailClass = ["input"];
  const inputPasswordClass = ["input"];

  const inputOpen = ["openSvg"];
  const inputClosed = ["closedSvg"];

  async function handleLogin(data) {
    console.log(data);

    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          navigate("./admin", { replace: true });
        })
        .catch((e) => {
          console.log("deu ruim" + " " + e);
        });
    }
  }

  function clickEyed() {
    setIsEyeOpen(!isEyeOpen);
  }

  if (errors.email) inputEmailClass.push("inputErro");
  if (errors.password) inputPasswordClass.push("inputErro");

  return (
    <div className="home-container">
      <h1>Lista de Tarefas</h1>
      <span>Gerencie sua agenda de foma Fácil..</span>

      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        <label className="labelInput">
          <input
            className={inputEmailClass.join(" ")}
            name="email"
            {...register("email", {
              required: {
                value: true,
                message: "Insira um E-mail no formato: email@exemple.com",
              },
              pattern: { value: emailRegex, message: "e-mail não valido" },
            })}
            type="text"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <img className="emailSvg" src={emailSvg} />
          <span className="mgnErro">
            <ErrorMessage
             errors={errors}
              name="email"
              render={({ message }) => <> <img src={cicleInfoSvg} /> {message}</>}
              />
          </span>
        </label>

        <label className="labelInput">
          <input
            className={inputPasswordClass.join(" ")}
            name="password"
            {...register("password", {
              required: { value: true, message: "Insira uma senha" },
              pattern: {
                value: passwordRegex,
                message:
                  "Deve conter ao menos um caractere especial, um número, uma letra maiúscula e uma minúscula",
              },
              minLength: {
                value: 8,
                message: "A senha deve ter pelo menos 8 dígitos",
              },
              maxLength: { value: 14, message: "senha maior que 14 dígitos" },
            })}
            type={isEyeOpen ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            className={inputOpen}
            src={isEyeOpen ? passwordOpen : passwordClosed}
            onClick={clickEyed}
            value={isEyeOpen}
          />

          <span className="mgnErro">
            
            <ErrorMessage
            errors={errors}
            name="password" 
            render={({ message }) => <> <img src={cicleInfoSvg} /> {message}</>}
            />
          </span>
        </label>

        <button type="submit">Acessar</button>
      </form>
      <Link className="button-link" to={"/register"}>
        Não possui conta? CADASTRE-SE
      </Link>
    </div>
  );
}

export default Home;
