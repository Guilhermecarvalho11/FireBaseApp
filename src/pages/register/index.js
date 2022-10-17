import React from "react";
import {useState} from 'react';
import { Link, useNavigate} from "react-router-dom";
import { auth } from '../../firebaseConections';
import { createUserWithEmailAndPassword} from 'firebase/auth';



import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";



import "../Home/home.css";
import emailSvg from "../../img/email.svg";
import passwordClosed from "../../img/passwordClosed.svg";
import passwordOpen from "../../img/passwordOpen.svg";
import cicleInfoSvg from "../../img/circle-info.svg";


 function Register(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const [isEyeOpen, setIsEyeOpen] = useState(false);



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
  
  
  async function handleRegister(e) {
    
    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() =>{
        navigate('/', {replace: true})
      })
      .catch(() =>{
        console.log('erro ao fazer o cadastro')
      })
    }else{
      alert('preencha todos os campos')
    }
  }

  function clickEyed() {
    setIsEyeOpen(!isEyeOpen);
  }

  if (errors.email) inputEmailClass.push("inputErro");
  if (errors.password) inputPasswordClass.push("inputErro");

  return(
    <div className="home-container">
      <h1>Cadastra-se</h1>
      <span>Vamos criar sua conta</span>

      <form className='form' onSubmit={handleSubmit(handleRegister)}>
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

        <button type="submit">Cadastrar</button>
        </form>

      <Link className="button-link" to={'/'}>
      Já possui uma conta? Faça login!
      </Link>
      
    </div>
  )
}

export default Register;
