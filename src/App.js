import firebase from "./firebaseConnection";
import {useState} from 'react'
import './style.css'
function App() {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')

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
    await firebase.firestore().collection('posts')
    .doc('JYGFjeCOLD15qqpaSk1L')
    .get()
    .then((snapshot)=>{
      setTitulo(snapshot.data().titulo)
      setAutor(snapshot.data().autor)
    })
    .catch(()=>{
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
        <button onClick={handleRead}>Buscar</button>
      </div>
      
    </div>
  );
}

export default App;
