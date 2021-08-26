import { Link } from 'react-router-dom'
import React from 'react'

function PageNotFound() {
    return (
        <div>
           <h1> Page Not Found :/ </h1>
           <h3>Go to Main Page: <Link to="/">Main</Link></h3>
        </div>
    )
}

export default PageNotFound
