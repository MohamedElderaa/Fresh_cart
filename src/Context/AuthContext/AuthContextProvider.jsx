import React, { useState ,createContext } from 'react'

export let authContext= createContext()

export default function AuthContextProvider({children}) {
  const[token,setToken]= useState(localStorage.getItem("token"))
  const [id,setId] = useState(localStorage.getItem("id"))
  return <authContext.Provider value={{token,setToken ,id ,setId}}>
  {children}
  </authContext.Provider>
}

  
  
