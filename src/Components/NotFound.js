import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

const NotFound = () => {
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    setTimeout(() => setRedirect(true), 2000)
  }, [])

  return (
    <div>
      <h1>Not Found</h1>
      <p>We can't find what you're looking for</p>
      <span>Redirecting back</span>
      {redirect && <Redirect to='/' />}
    </div>
  )
}

export default withRouter(NotFound)