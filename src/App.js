import firebase from "./firebaseConnection";
import {useState, /*useEffect*/} from 'react'
import './style.css'
function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [name, setName] = useState('')

  async function newUser(){
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (value)=> {
      await firebase.firestore().collection('users')
      .doc(value.user.uid)
      .set({
        name: name,
        role: role,
        status: true,
      })
      .then(()=>{
        setEmail('')
        setName('')
        setRole('')
        setPassword('')
      })
    })
    .catch((error)=> {
      console.log(error)
    })
    .catch((error)=>{
      if(error.code === 'auth/weak-password'){
        alert('Senha fraca')
      }
      else if (error.code === 'auth/email-already-in-use'){
        alert('Esse email já está cadastrado')
      }
      console.log('Erro ' + error)
    })
  }
  async function logout(){
    await firebase.auth().signOut()
  }

  return (
    <div>
      <h1>React + Firebase</h1><br/>


    

      <div className="container">
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label>Nome:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <label>Cargo:</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)}/>
        <label>Senha:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={newUser}>Cadastrar</button>
        <button onClick={logout}>Sair</button>
      </div>

      
      
    </div>
  );
}

export default App;
