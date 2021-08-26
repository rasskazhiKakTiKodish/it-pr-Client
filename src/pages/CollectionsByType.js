import React, { useEffect, useState, useContext } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'


function CollectionsByType() {

    let {id} = useParams()
    let history = useHistory()
    const [listOfCollections, setListOfCollections] = useState([])
    const [likedCollections, setLikedCollections] = useState([])
    const {authState} = useContext(AuthContext)

    useEffect(() => {
        axios.get(`http://localhost:3030/collections/bytypeId/${id}`).then((response) => {
            setListOfCollections(response.data)
        })
    },[])


    return (
  
        <div>
             {listOfCollections.map((value, key) => {
        return (
        <div key={key} className="collection" >
          <div className="head">
        <div className="name">{value.name}</div>
        <div className="type">{value.typename}</div>
        </div>
        <div className="body" onClick={() => {history.push(`/collection/${value.id}`)}}>{value.text}</div>
        <div className="footer">
        <div className="username"><Link to={`/profile/${value.UserId}`} style={{color: 'white'}}>{value.username}</Link></div> 
        <div className="buttons">
        <FavoriteIcon onClick={() => {}}
        className={
          likedCollections.includes(value.id) ? "unlikeBttn" : "likeBttn"
        }
        />
        <label>{value.Likes.length}</label>
        </div>
        </div>
        
        </div>
        )
      })}
      <Link to="/">return to Main Page</Link>
        </div>
    )
}

export default CollectionsByType
