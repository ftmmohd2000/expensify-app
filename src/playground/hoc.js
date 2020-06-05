import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is : {props.info}</p>
  </div>
)

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private privileged info, please dont share</p>}

      <WrappedComponent {...props} />
    </div>
  )
}

const requireAuthentication = (WrappedComponent) => {
  return (props) => {
    if (props.isAuthenticated)
      return (
        <WrappedComponent {...props} />
      )
    else
      return (
        <h1>Get authenticated bitch</h1>
      )
  }
}

const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(AdminInfo)

ReactDOM.render(<AuthInfo isAdmin={true} isAuthenticated={false} info="GET RICH FUCK BITCHES" />, document.getElementById('app'))