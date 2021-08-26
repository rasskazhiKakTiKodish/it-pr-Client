import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { AuthContext } from '../helpers/AuthContext'
import { Col } from 'react-bootstrap';


function Main() {
    const [listOfCollections, setListOfCollections] = useState([])
    const [likedCollections, setLikedCollections] = useState([])
    const [listOfTypes, setListOfTypes] = useState([])
    const {authState} = useContext(AuthContext)
    let history = useHistory()



useEffect(() => {

  if(!localStorage.getItem("accessToken")) {
    history.push('/login')
  } else {
  axios.get("http://localhost:3030/collections", { headers: {accessToken: localStorage.getItem("accessToken")}})
  .then((response) => {
    setListOfCollections(response.data.listOfCollections)
    setLikedCollections(response.data.likedCollections)
    response.data.likedCollections.map((like) => {
      return like.CollectionId
    })
  })
  axios.get("http://localhost:3030/types")
    .then((response) => {
      setListOfTypes(response.data.listOfTypes)})
}
}, [])

const likeACollection = (collectionId) => {
  axios.post(
    "http://localhost:3030/likes", 
    {CollectionId: collectionId }, 
    { headers: {accessToken: localStorage.getItem("accessToken")}}
  ).then((response) => {
    setListOfCollections(listOfCollections.map((collection) => {
      if(collection.id === collectionId) {
        if(response.data.liked){
        return {...collection, Likes: [...collection.Likes, 0]}
        } else {
          const likesArray = collection.Likes
          likesArray.pop()
          return {...collection, Likes: likesArray}
        }
      }else {
        return collection
      }
    })
    )

    if(likedCollections.includes(collectionId)) {
      setLikedCollections(likedCollections.filter((id) => {
        return id != collectionId
      }))
    } else {
      setLikedCollections([...likedCollections, collectionId])
    }
  })
}


    return (
      <div className="profilePageContainer">
    
        <h3>Types</h3>
        <div>
            {listOfTypes.map((value, key) => {
        return (
          <div key={key} className="typebar">
            
          <Link to={`/collectionsbytype/${value.id}`} className="name">{value.typename}</Link>
        </div>
              )
            })}
          </div>
            <h3>Collections</h3>
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
        <FavoriteIcon onClick={() => {likeACollection(value.id)}}
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
        </div>
        </div>
       
 )

}

export default Main
