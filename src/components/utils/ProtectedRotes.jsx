import React from 'react'
import { Navigate} from 'react-router-dom'
export default function ProtectedRouter({isAuthenticated,children}) {
    if (!isAuthenticated) {
        return  <Navigate  to={"/login"}/>
    }
  return children;
}
