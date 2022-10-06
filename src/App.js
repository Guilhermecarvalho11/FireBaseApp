import React, { useState, useEffect } from "react";
import { db } from "./firebaseConections";
import {
  doc,
  setDoc,
  collection,
  assDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import "./app.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) =>{
        let listaPost = [];

        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(listaPost);
      })
    }

    loadPosts();
  }, []);

  async function handleAdd() {
    // await setDoc(doc(db, 'posts', 'banco1'), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() =>{
    //   alert('cadastrado')
    // })
    // .catch((error) => {
    //   alert('deu erro' = error)
    // })

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Cadastrado com sucesso!");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("deu ruim" + error);
      });
  }

  async function buscaPosts() {
    // const postRef = doc(db, 'posts', 'banco1')

    // await getDoc(postRef)
    // .then((snapshot) => {
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch(() =>{
    //   console.log('erro ao buscar')
    // })

    const postsRef = collection(db, "posts");
    await getDocs(postsRef)
      .then((snapshot) => {
        let listas = [];

        snapshot.forEach((doc) => {
          listas.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(listas);
      })
      .catch((error) => {
        console.log("deu erro");
      });
  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost);
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        alert("erro ao Atualizar" + error);
      });
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef).then(() => {
      alert("Post deletado com sucesso");
    });
  }

  return (
    <div>
      <h1>Fire + react :) </h1>

      <div className="container">
        <label>ID do Post:</label>
        <input
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />{" "}
        <br />
        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscaPosts}>Buscar Posts</button> <br />
        <button onClick={editarPost}>Atualizar Post</button>
        <ul>
          {posts.map((item) => {
            return (
              <li key={item.id}>
                <strong>ID: {item.id}</strong>
                <br />
                <span>Titulo: {item.titulo}</span>
                <br></br>
                <span>Autor: {item.autor}</span>
                <br />
                <button onClick={() => excluirPost(item.id)}>Excluir</button>
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
