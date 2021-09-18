import firebase from "./firebaseConnection";
import {useState, /*useEffect*/} from 'react'
import './style.css'
function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState({})

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
    setUser({})
  }

  async function login(){
   await firebase.auth().signInWithEmailAndPassword(email, password)
   .then( async (value) => {
     await firebase.firestore().collection('users')
     .doc(value.user.uid)
     .get()
     .then((snapshot)=>{
       setUser({
         name: snapshot.data().name,
         role: snapshot.data().role,
         status: snapshot.data().status,
         email: value.user.email
       })
     })
   })
   .catch((error) => {
     console.log('FALHA AO LOGAR ' + error) 
   })
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

        <button onClick={login}>Login</button>
        <button onClick={newUser}>Cadastrar</button>
        <button onClick={logout}>Sair</button>
      </div>

      <hr/><br/>
      {Object.keys(user).length > 0 && (
        <div>
          <strong>Bem vindo(a)</strong> {user.name}<br/>
          <strong>{user.role}</strong><br/>
          <strong>{user.email}</strong><br/>
          <strong>{user.status ? 'ACTIVE' : 'NOT ACTIVE'}</strong><br/>
        </div>
      )}
      
      
    </div>
  );
}

export default App;
