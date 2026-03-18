import React, { useContext } from 'react'
import { AuthContextAPI } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { UserContextAPI } from '../context/UserContext'

const AdminRoute = ({childrn}) => {

    let {userDataFromDB} = useContext(UserContextAPI)

    if (userDataFromDB?.role=="admin"){
        return <>{childrn}</>
    }
    else{
        
        return <Navigate to={"/user-profile"}/>
    }
}

export default AdminRoute
