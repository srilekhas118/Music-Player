import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, updateProfile } from "firebase/auth";
import { useContext, useState } from "react"
import toast from "react-hot-toast";
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { NavLink, useNavigate } from "react-router-dom"
import {__AUTH } from "../../backend/firebase"
import Spinner from "../../utilities/Spinner";
import { AuthContextAPI } from "../../context/AuthContext";

let UpdatePassword = ()=>{
  let {authUser , setAuthUser} = useContext(AuthContextAPI);
    let [isLoading , setIsloading] = useState(false);
    let navigate = useNavigate()

    let initialState = {
      newPassword:"",
      confirmNewPassword:""
    }

    let [passwordData , setPasswordData] = useState(initialState)

    let handleInputChange = (e)=>{
      let {name , value} = e.target;
      setPasswordData({
        ...passwordData , [name]:value
      })
    };
    
    let {newPassword , confirmNewPassword} = passwordData;

    let handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            setIsloading(true)
            console.log(passwordData);
            

            if(newPassword == confirmNewPassword){
              await updatePassword(authUser , newPassword);
              toast.success("Password has been changed successfully")
              signOut(__AUTH);
              setAuthUser(null);
              navigate("/login");

            } else{
              toast.error("New password must match with Confirm password")
            }

            
            
        } catch (error) {
          toast.error(error.message)
        } finally{

          setIsloading(false)
        }
        
    }


    return <section className="h-[calc(100vh-70px)] w-[100%] flex justify-center items-center ">
        <article className=" w-[27%] bg-slate-700 py-4 px-6 rounded-md shadow-blackAndGray">
            <header className="text-center text-[24px] font-semibold"><h1>Update Password</h1></header>
            <main>
                <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
                    
                    <div>
                        <label htmlFor="newPassword" className="block py-1">Email</label>
                        <input type="text" placeholder="Enter your new password" required name="newPassword" value={newPassword} onChange={handleInputChange} className="outlime-none border-1 w-[100%] rounded-md pl-2 py-1" />
                    </div>
                    <div>
                        <label htmlFor="ConfirmNewPassword" className="block py-1">Email</label>
                        <input type="password" placeholder="Confirm new password" required name="ConfirmNewPassword" value={confirmNewPassword} onChange={handleInputChange} className="outlime-none border-1 w-[100%] rounded-md pl-2 py-1" />
                    </div>
                    
                    
                    <div className="mt-3">
                        <button className="bg-blue-600 w-[100%] py-1 rounded-md cursor-pointer hover:bg-blue-800">Submit</button>
                    </div>
                    
                    
                </form>
            </main>
        </article>
        { isLoading && <Spinner/>}
    </section>
}

export default UpdatePassword