import React, { useEffect, useState, useContext } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function Profile() {
    let {id} = useParams()
    let history = useHistory()
    const [username, setUsername] = useState("")
    const [listOfCollections, setListOfCollections] = useState([])
    const {authState} = useContext(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3030/auth/basicInfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })

        axios.get(`http://localhost:3030/collections/byuserId/${id}`).then((response) => {
            setListOfCollections(response.data)
        })
    },[])

    return (
        <div className="profilePageContainer">
            <div className="basicInfo"> 
             <h1>Username: {username}</h1>
             {authState.username === username && (<button onClick={()=> {history.push('/changepassword')}}>Change My Password</button>)}
             </div>
            <div className="listOfCollections">             
             {listOfCollections.map((value, key) => {
        return (
        <div key={key} className="collection" >
        <div className="name">{value.name}</div>
        <div className="body" onClick={() => {history.push(`/collection/${value.id}`)}}>{value.text}</div>
        <div className="footer">
        <div className="username">{value.username}</div> 
        <div className="buttons"> 
        <label>{value.Likes.length}</label>
        </div>
        </div>
        </div>
        )
      })}</div>
        </div>
    )
}

export default Profile
