import React from "react";
import {useState} from 'react';
import { Link, useNavigate} from "react-router-dom";
import { auth } from '../../firebaseConections';
import { createUserWithEmailAndPassword} from 'firebase/auth';


 function Register(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  
  async function handleRegister(e) {
    e.preventDefault();
    
    if(email !== '' && password !== ''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then(() =>{
        navigate('./admin', {replace: true})
      })
      .catch(() =>{
        console.log('erro ao fazer o cadastro')
      })
    }else{
      alert('preencha todos os campos')
    }
  }

  return(
    <div className="home-container">
      <h1>Cadastra-se</h1>
      <span>Vamos criar sua conta</span>

      <form className='form' onSubmit={handleRegister}>
        <input
        type='text'
        placeholder='Digite seu email...'
        value={email}
        onChange={(e) => setEmail(e.target.value)} />

        <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        

        <button type="submit">cadastrar</button>
      </form>

      <Link className="button-link" to={'/'}>
      Já possui uma conta? Faça login!
      </Link>
      
    </div>
  )
}

export default Register;
