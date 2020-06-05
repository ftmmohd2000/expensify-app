import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
      404 Page Not Found - <Link to="/">Back to HomePage</Link>
    </div>
  )
}

export default ErrorPage
