import firebase from "./firebaseConnection";
import {useState} from 'react'
import './style.css'
function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [dados, setDados] = useState([])

  async function handleAdd(){
    await firebase.firestore().collection('posts')
    /*.doc('12345')
    .set({
      titulo: titulo,
      autor: autor
    })*/
    .add({
      titulo:titulo,
      autor:autor
    })
    .then(()=>{
      console.log('DADOS CADASTRADOS COM SUCESSO')
      setTitulo('')
      setAutor('')
    })
    .catch((error)=>{
      console.log('FALHA AO CADASTRAR' + error)
    })
  }
  async function handleRead(){
    /*await firebase.firestore().collection('posts')
    .doc('123')
    .get()
    .then((snapshot)=>{
      setTitulo(snapshot.data().titulo)
      setAutor(snapshot.data().autor)
    })
    .catch(()=>{
      console.log('ERRO')
    })*/

    await firebase.firestore().collection('posts')
    .get()
    .then((snapshot)=> {
      let lista = []
      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setDados(lista)
    })
    .catch(() => {
      console.log('ERRO')
    })
  }
  return (
    <div>
      <h1>React + Firebase</h1><br/>

      <div className="container">
        <label>Título</label>
        <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

        <label>Autor</label>
        <textarea type="text" value={autor} onChange={(e) => setAutor(e.target.value)}/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={handleRead}>Buscar</button><br/>

        <ul>
          {dados.map((post)=>{
            return(
              <li key={post.id}>
                <span>Titulo: {post.titulo}</span><br/>
                <span>Autor: {post.autor}</span><br/><br/>
              </li>
            )
          })}
        </ul>
      </div>
      
    </div>
  );
}

export default App;
