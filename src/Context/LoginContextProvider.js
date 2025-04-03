// import React from 'react'
// import {useState} from "react"
// import  LoginContext  from '.'
// const LoginContextProvider = ({children}) => {
//     const [loginStatus, setLoginStatus] = useState(false)
//   return (
//     <LoginContext.Provider value={{loginStatus,setLoginStatus}}>
//         {children}
//     </LoginContext.Provider>
//   )
// }

// export default LoginContextProvider

import React from 'react'
import {useState} from "react"
import { LoginContext } from '.'

const LoginContextProvider = ({children}) => {
    const [loginStatus, setLoginStatus] = useState(false)
  return (
    <LoginContext.Provider value={{loginStatus,setLoginStatus}}>
        {children}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider