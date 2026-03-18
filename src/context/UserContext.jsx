import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextAPI } from "./AuthContext";
import toast from "react-hot-toast";
import { doc, onSnapshot } from "firebase/firestore";
import { __DB } from "../backend/firebase";

export let UserContextAPI = createContext(null);

let UserContext = ({children}) =>{
    let {authUser} = useContext(AuthContextAPI)

    let [userDataFromDB , setUserDataFromDB] = useState(null);

    let fetchDataFromDB = async () =>{

        if(authUser!=null){
            try {
                let userDataReference = doc(__DB,"user_profile",authUser?.uid)

                onSnapshot(userDataReference , (user)=>{              //    //user any variable

                    if(user.exists){

                        setUserDataFromDB(user?.data())
                        // console.log(user?.data());
                        
                    }
                    
                })
                
            } catch (error) {
                
                toast.error(error.message)
            }
        }

    }

    useEffect(()=>{
        fetchDataFromDB()
    },[authUser])

    return <UserContextAPI.Provider value={{userDataFromDB}}>
        {children}
    </UserContextAPI.Provider>

}

export default UserContext