import React, { FC, Fragment } from 'react'
import Account from '../components/Account/Account'

const ForgotPasswordPage: FC = () => {
  return (
    <Fragment>
      <head>
        <title>Account</title>
        <meta name="account" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.ico" />
      </head>
      <body>
        <Account></Account>
      </body>
    </Fragment>
  )
}

export default ForgotPasswordPage
