import React, {useContext, useEffect, useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import '../App.css'
import * as Yup from "yup"
import axios from 'axios'
import { useHistory, useParams } from 'react-router'
import { AuthContext } from '../helpers/AuthContext'
import { Dropdown } from 'react-bootstrap'

function CreateCollection() {
    let {id} = useParams()
    const {authState} = useContext(AuthContext)
    const [listOfTypes, setListOfTypes] = useState([])
    const [selectedType, setSelectedType] = useState({})


    const initialValues = {
        
        name:"",
        text:"",
        typename:"",
    }

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            history.push('/login')
        }
        axios.get("http://localhost:3030/types")
            .then((response) => {
             setListOfTypes(response.data.listOfTypes)})




             axios.get(`http://localhost:3030/types/`).then((response) => {
                setSelectedType(response.data)
            })
    }, [])

    const validationSchema = Yup.object().shape({
        
        name: Yup.string().required("You must input a name"),
        text: Yup.string().required("You must input a text"),
        typeId: Yup.string().required("You must input a name"),
    })

    const onSubmit=(data) => {

        axios.get("http://localhost:3030/collections", data, {
            headers: {accessToken: localStorage.getItem("accessToken"),}
        }).then((response) => {
        history.push('/')
    })
    }

    let history = useHistory()
    return (
        <div className="createCollectionPage">
           <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
               <Form className="formContainer">
               <label>TypeId: </label>
               <ErrorMessage name="typeId" component="span"/>
               <Dropdown>
                        <Dropdown.Toggle>{selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {listOfTypes.map((type, key) => 
                                <Dropdown.Item onClick={() => setSelectedType(type)} key={key}>{type.typename}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                   <label>Name: </label>
                   <ErrorMessage name="name" component="span"/>
                   <Field  
                   autoComplete="off"
                   id="inputCreateCollection" 
                   name="name" 
                   placeholder="name"/>
                   <label>Text: </label>
                   <ErrorMessage name="text" component="span"/>
                   <Field  
                   autoComplete="off"
                   id="inputCreateCollection" 
                   name="text" 
                   placeholder="text"/>
                   <button type="submit">Create collection</button>
               </Form>
           </Formik>
        </div>
    )
}

export default CreateCollection
