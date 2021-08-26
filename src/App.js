import './App.css'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Main from "./pages/Main"
import CreateCollection from './pages/CreateCollection'
import Collection from './pages/Collection'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'
import {AuthContext} from './helpers/AuthContext'
import { useEffect, useState } from 'react'
import CollectionsByType from './pages/CollectionsByType'
import axios from 'axios'



function App() {


  const [authState, setAuthState] = useState({
    username: "", 
    id:0, 
    status: false})

  useEffect(() => {
   axios.get('http://localhost:3030/auth/auth', { headers: {
     accessToken: localStorage.getItem("accessToken")
   }}).then((response) =>{
     if(response.data.error){
       setAuthState({...authState, status:false})
     } else {
      setAuthState({
        username: response.data.username, 
      id: response.data.id, 
      status: true
     })
    }
   })
  }, [])

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({username:"",id:0, status:false})
  }
  
  return <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
      <div className="navbar">
        <div className ="links">
         
        {!authState.status ? (
          <>
      <Link to="/login">login</Link>
      <Link to="/registration">registration</Link>
      </>
        ) : (
          <>
           <Link to="/createcollection">Create a collection</Link>
          <Link to="/">Main</Link>

          </>
        )}
        
        </div>
        <div className="loggedInContainer">
        <Link to ={`/profile/${authState.id}`}>{authState.username}</Link>
         {authState.status && <button onClick={logout}>logout</button>}
        </div>
        </div>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/createcollection" exact component={CreateCollection}/>
        <Route path="/collection/:id" exact component={Collection}/>
        <Route path="/registration" exact component={Registration}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/profile/:id" exact component={Profile}/>
        <Route path="/changepassword" exact component={ChangePassword}/>
        <Route path="/collectionsbytype/:id" exact component={CollectionsByType}/>
        <Route path="*" exact component={PageNotFound}/>
      </Switch>
    </Router>
    </AuthContext.Provider>

  </div>
}

export default App;
