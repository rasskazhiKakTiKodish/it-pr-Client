import React, {useState, useContext} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { AuthContext } from '../helpers/AuthContext'
import '../App.css'

function Login() {
    const [username, setUsername] =useState('')
    const [password, setPassword] =useState('')
    const {setAuthState} = useContext(AuthContext)

    let history =useHistory()

    const login = () => {
        const data = {username: username, password: password}
        axios.post("http://localhost:3030/auth/login", data).then((response) => {
            if(response.data.error){ 
                alert(response.data.error)
            }else{
            localStorage.setItem("accessToken", response.data.token)
            setAuthState({username:response.data.username, id:response.data.id, status: true})
            history.push('/')
            }
        })

    }
    return (
            <div className="row">
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Card Title</span>
            <label>Username:</label>
            <input type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}/>
            <label>Password:</label>
            <input type="password"
            value={password}
           onChange={e => setPassword(e.target.value)}/>
                    </div>
        <div className="card-action">
            <button onClick={login}>login</button>
            </div>
      </div>
    </div>
  </div>

    )
}

          
        

export default Login
