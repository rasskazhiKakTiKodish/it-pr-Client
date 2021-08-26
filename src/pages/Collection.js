import React, { useContext, useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'
import "../App.css"


function Collection() {
    let { id } = useParams()
    const [collectionItem, setCollectionItem] = useState({})
    const[comments, setComments] = useState([])
    const[newComment, setNewComment] = useState("")
    const {authState} = useContext(AuthContext)
    let history= useHistory()


    useEffect(() => {
        axios.get(`http://localhost:3030/collections/byId/${id}`).then((response) => {
            setCollectionItem(response.data)
        })

        axios.get(`http://localhost:3030/comments/${id}`).then((response) => {
            setComments(response.data)
        })
      }, [])

      const addComment = () => {
          axios.post("http://localhost:3030/comments", {commentBody: newComment, CollectionId: id},
          {
              headers: {
                  accessToken: localStorage.getItem('accessToken')
              }
          },
          ).then((response) => {
              if(response.data.error) {
                  console.log(response.data.error)
              } else{
              const commentToAdd={commentBody: newComment, username: response.data.username}
             setComments([...comments,commentToAdd])
             setNewComment("")
              }
          })
      }

      const deleteComment = (id) => {
        axios.delete(`http://localhost:3030/comments/${id}`, {headers:{accessToken: localStorage.getItem('accessToken')}
    }).then(() => {
        setComments(comments.filter((val) => {
            return val.id !== id
        })
        )
    })
      }


      const deleteCollection = (id) => {
        axios.delete(`http://localhost:3030/collections/${id}`, {headers:{accessToken: localStorage.getItem('accessToken')}
    }).then(() => {
            history.push('/')
        })
      }


      const editCollection = (option) => {
          if(option === 'name') {
            let newName = prompt("Enter New Name:")
            axios.put("http://localhost:3030/collections/name", 
            {
                newName: newName, 
                id: id
            }, 
            {
                headers:{accessToken: localStorage.getItem('accessToken')}
            }
            )

            setCollectionItem({...collectionItem, name: newName})
          }else{
            let newText = prompt("Enter New Text:")
            axios.put("http://localhost:3030/collections/text", 
            {
                newText: newText, 
                id: id
            }, 
            {
                headers:{accessToken: localStorage.getItem('accessToken')}
            }
            )

            setCollectionItem({...collectionItem, text: newText})
          }
      }
    return (
        <div className="collectionPage">
            <div className="leftSide">
                <div className="collection" id="individual">
                <div className ="head">
                <div className="name" onClick={() =>{if(authState.username === collectionItem.username){ editCollection("name")}}}>{collectionItem.name}</div>
                </div>
                <div className="body" onClick={() =>{if(authState.username === collectionItem.username){ editCollection("body")}}}>{collectionItem.text}</div>
                <div className="footer">{collectionItem.username}
                {authState.username === collectionItem.username && (
                <button onClick={() => {deleteCollection(collectionItem.id)}}>Delete collection</button>
                )}
                </div>
                </div>
            </div>
            <div className="rightSide">
                <div className="addComentContainer"></div>
                <input type="text" placeholder="Comment..." autoComplete="off" value={newComment} onChange={(event) => {setNewComment(event.target.value)}}/>
                <button onClick={addComment}>add Comment</button>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return <div key={key} className="comment">
                            {comment.commentBody}
                            <label> Username: {comment.username}</label>
                            {authState.username === comment.username && <button onClick={() => {deleteComment(comment.id)}}>delete</button>}
                            </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Collection
