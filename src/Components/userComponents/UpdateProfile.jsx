// import React, { useContext } from 'react'
// import { AuthContextAPI } from '../../context/AuthContext'

// const UpdateProfile = () => {
//   let { authUser } = useContext(AuthContextAPI);
//   return (
//     <section className='h-full w-full flex items-center justify-center'>
//       <article className='h-[450px] w-[33%]  bg-slate-700 rounded-md py-4 px-8 flex flex-col gap-4 items-center'></article>
//       <header>
//         <h1 className='text-[24px] font-semibold text-center'>Update Profile</h1>
//       </header>
//       <main>
//         <picture>
//           <img src={authUser?.photoURL} alt="" className='h-[250px] w-[250px] rounded-full' />
//         </picture>
//       </main>
//       <footer>
       
//           <form action="">
//             <div>
//               <label htmlFor="image" className='block border text-center py-2 rounded-md font-semibold'>Choose Picture</label>
//               <input type="file" id='image' className='hidden'/>
//             </div>
//             <div>
//               <button className='bg-blue-600 w-full py-2 rounded-md'>Upload Picture</button>
//             </div>
//           </form>
        
//       </footer>
      
//     </section>
//   )
// }

// export default UpdateProfile



import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../context/AuthContext'
import Spinner from '../../utilities/Spinner';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';

const UpdateProfile = () => {
  let {authUser ,setAuthuser}=useContext(AuthContextAPI);
  let [imageFile , setImageFile] = useState(null);
  let [imagePreview , setImagePreview] = useState(null);
  let [isLoading, setIsLoading]=useState(false)

  let handleInputChange = (e) =>{
    let file = e.target.files[0];

    if (file){
      let imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl);
      setImageFile(file)
    }
    
  }

  let handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      setIsLoading(true);
      let imageFormData = new FormData();

    imageFormData.append("file", imageFile);
    imageFormData.append("upload_preset", "your-project");
    imageFormData.append("cloud_name","your-id")

    let cloudinaryResponse = fetch("https://api.cloudinary.com/v1_1/your-id/image/upload",{
      method:"POST",
      body:imageFormData
    })

    let ImageResponseFromDB = await (await cloudinaryResponse).json()

    console.log(ImageResponseFromDB);

    updateProfile(authUser ,{
      photoURL:ImageResponseFromDB?.url
    })

    setAuthuser({
      ...authUser,photoURL:ImageResponseFromDB?.url
    })
    
  
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <section className='h-full w-full flex items-center justify-center'>
      <article className='h-[450px] w-[35%] bg-slate-700 rounded-md py-4 px-8 flex flex-col gap-4 items-center shadow-blackAndGray'>
        <header>
          <h1 className='text-[24px] font-semibold text-center'>Update Profile</h1>
        </header>
        <main>
          <picture>
            <img src={imagePreview ==null ? authUser?.photoURL : imagePreview} alt=""  className='h-[250px] w-[250px] border rounded-full'/>
          </picture>
        </main>
        <footer>
          <form action="" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="image" className='block border text-center py-2 rounded-md font-semibold  px-20'>Choose Picture</label>
              <input type="file" id='image' className='hidden' onClick={handleInputChange}/>
            </div>
            <div className='mt-4'>
              <button className='bg-blue-600 w-full py-2 rounded-md'>Upload Picture</button>
            </div>
          </form>
        </footer>
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default UpdateProfile
