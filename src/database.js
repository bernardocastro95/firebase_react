const [user, setUser] = useState(false)
const [userLogged, setUserLogged] = useState({})
const [idPost, setIdPost] = useState('')
const [titulo, setTitulo] = useState('')
const [autor, setAutor] = useState('')
const [dados, setDados] = useState([])

useEffect(()=> {
    async function loadPosts(){
      await firebase.firestore().collection('posts')
      .onSnapshot((doc)=>{
        let posts = []
 
        doc.forEach((item)=>{
          posts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor
          })
        })
 
        setDados(posts)
      })
    }
 
    loadPosts()
   }, [])
 
   useEffect(()=> {
     async function checkLogin(){
       await firebase.auth().onAuthStateChanged((user)=> {
         if(user){
           setUser(true)
           setUserLogged({
             uid: user.uid,
             email: user.email
           })
         }
         else {
           setUser(false)
           setUserLogged({
 
           })
         }
       })
     }
     checkLogin()
   }, [])
 

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

  async function handleEdit(){
    await firebase.firestore().collection('posts')
    .doc(idPost)
    .update({
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('DADOS ATUALIZADOS COM SUCESSO')
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch(()=>{
      console.log('FALHA AO ATUALIZAR')
    })
  }
  async function handleDelete(id){
    await firebase.firestore().collection('posts')
    .doc(id)
    .delete()
    .then(()=>{
      alert('DELETADO COM SUCESSO')
    })
    .catch(()=>{
      console.log('FALHA AO DELETAR')
    })
  }

async function login(){
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=> {
      console.log('VOCÊ LOGOU COM')
    })
    .catch((error)=> {
      console.log('ERROR ' + error)
    })
  }

{user && (
    <div>
      <strong>Bem vindo(a). Você está logado(a)</strong><br/>
      <span>{userLogged.uid} - {userLogged.email}</span>
      <br/><br/>
    </div>
  )}

  

<div className="container">
        <h2>Banco de Dados</h2>
        <label>ID:</label>
        <input type="text" value={idPost} onChange={(e) => setIdPost(e.target.value)}/>
        <label>Título</label>
        <textarea type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

        <label>Autor</label>
        <textarea type="text" value={autor} onChange={(e) => setAutor(e.target.value)}/>

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={handleRead}>Buscar</button>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={login}>Login</button>

        <ul>
          {dados.map((post)=>{
            return(
              <li key={post.id}>
                <span>Id: {post.id}</span><br/>
                <span>Titulo: {post.titulo}</span><br/>
                <span>Autor: {post.autor}</span><br/>
                <button onClick={()=> handleDelete(post.id)}>Deletar</button><br/>
              </li>
            )
          })}
        </ul>
      </div>