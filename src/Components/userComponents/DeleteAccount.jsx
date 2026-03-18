import { deleteUser } from 'firebase/auth';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { AuthContextAPI } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {

  let { authUser } = useContext(AuthContextAPI)

  let [inputText , setInputText] = useState("");

  let navigate = useNavigate();

  let handleInputChange = (e) =>{
    let inputText = e.target.value
    setInputText(inputText);
  }

  let handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(inputText);
    await deleteUser(authUser);

    toast.success("User Deleted Successfully");
    navigate("/Register")
    
  }

  return (
    <section className='h-full w-full flex justify-center items-center'>

      <article className='w-[60%] h-[300px] bg-slate-700 rounded-md p-6 flex flex-col gap-6 shadow-blackAndGray'>
        <header><h1 className='text-[32px] font-semibold'>Deleting account</h1></header>
        <main>
          <p className='w-[80%]'>Deleting Account will remove all information and <b> it can't be reverted</b></p>
        </main>
        <footer>
          <form action="" onSubmit={handleSubmit} className='flex justify-center items-end gap-5'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">To delete this account type <b>DELETE</b></label>
              <input type="text" className='outline-none border py-1 px-2 rounded-md bg-white text-red-600 w-[255px] font-semibold ' onChange={handleInputChange} />
            </div>
            <div>
              <button disabled={inputText!="DELETE"} className={`px-16 py-2 rounded-md ${inputText!="DELETE" ? "bg-slate-500 cursor-not-allowed" : "bg-red-600 cursor-pointer"}`}>Delete Account</button>
            </div>
          </form>
        </footer>
      </article>

      
      
    </section>
  )
}

export default DeleteAccount
