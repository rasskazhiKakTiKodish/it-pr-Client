import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import '../App.css'
import * as Yup from "yup"
import axios from 'axios'


function Registration() {
    const initialValues ={
        username:"",
        password:""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(1 ).max(15).required(),
        password:  Yup.string().min(3).max(15).required()
    })

    const onSubmit =(data) => {
        axios.post("http://localhost:3030/auth", data).then(() => {
            console.log(data)
        })
    }
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
               <Form className="formContainer">
                   <label>Username: </label>
                   <ErrorMessage name="usernaemname" component="span"/>
                   <Field  
                   autoComplete="off"
                   id="inputCreateCollection" 
                   name="username" 
                   placeholder="username"/>
                   <label>Password: </label>
                   <ErrorMessage name="password" component="span"/>
                   <Field  
                   autoComplete="off"
                   id="inputCreateCollection"
                   type="password" 
                   name="password" 
                   placeholder="password"/>
                   <button type="submit">Create user</button>
               </Form>
           </Formik>
        </div>
    )
}

export default Registration
