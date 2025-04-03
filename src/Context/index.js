// import React from 'react'

// export const LoginContext=React.createContext();
// export const UsersContext=React.createContext();
// export const NameContext = React.createContext();


/////////////////////////////

import React from 'react'

// In Context/index.js
export const NameContext = React.createContext();
export const UsersContext = React.createContext();
const LoginContext = React.createContext();
export { LoginContext }; // Named export
export default LoginContext; // Also add default export