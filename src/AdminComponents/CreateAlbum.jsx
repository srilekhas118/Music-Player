import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../utilities/Spinner'
import { addDoc, collection } from 'firebase/firestore'
import { __DB } from '../backend/firebase'

const CreateAlbum = () => {
    
    let initialAlbumState = {
        albumTitle:"",
        albumPoster:"",
        albumReleaseDate:"",
        albumLanguages:"",
        albumDescription:""
    }

    let initialSongState = {
        songName:"",
        songUrl:"",
        songThumbnail:"",
        songSingers:"",
        songMood:"",
        songMusicDirector:""
    }

    let [albumState , setAlbumState] = useState(initialAlbumState)

    let [songsState , setSongsState] = useState([initialSongState])

    let [isLoading , setIsLoading] = useState(false)

    let [albumThumbnailPoster , setAlbumThumbnailPoster] = useState(null)

    let {albumTitle , albumPoster , albumReleaseDate , albumLanguages , albumDescription} = albumState;

    // handling album {poster}

    let handleAlbumPoster = (e) =>{
        let file = e.target.files[0];
        if(file){
            setAlbumThumbnailPoster(file)
        }
    }

    // handling input changes in album form

    let handleAlbumInputChange = (e) =>{
        let {name,value} = e.target;
        setAlbumState({
            ...albumState , [name]:value
        })
    }

    // Add section method for song

    let addSongsSection = (e) =>{
        e.preventDefault()
        setSongsState([
            ...songsState, {
                songName:"",
                songUrl:"",
                songThumbnail:"",
                songSingers:"",
                songMood:"",
                songMusicDirector:""
            }
        ])
    }

    // remove song section

    let removeSongSection = (index , e) =>{
        e.preventDefault()

        if(index>0){
            setSongsState(songsState.filter((el , ind)=>{
            // console.log(ind,index);
            // console.log(ind!=index);
            
            return ind != index ;
        }))
        }

       
    }

    // handling songs input

    let handleSongsInputChange = (index , e) =>{
        let {name , value} = e.target ;

        let updatedState = [...songsState]

        updatedState[index][name] = value ;

        setSongsState(updatedState);
    }

    // handling files os songs section
    let handleSongsFilesInput = (index , inpName , e)=>{
        let updatedSongs = [...songsState];

        updatedSongs[index][inpName] = e.target.files[0];

        setSongsState(updatedSongs);

    }


    // form submit method

    let handleFormSubmit = async (e) =>{
        e.preventDefault()
        // console.log(albumState);
        // console.log(albumThumbnailPoster);
        
        try {
            setIsLoading(true);

            let AlbumPosterFormData = new FormData();
            AlbumPosterFormData.append("file" , albumThumbnailPoster)
            AlbumPosterFormData.append("upload_preset" ,"tech_haven_music_11");
            AlbumPosterFormData.append("cloud_name","dvmqzmtec")

            let cloudinaryResponse = fetch("https://api.cloudinary.com/v1_1/your-id/image/upload",{
                method:"POST",
                body:AlbumPosterFormData
            })
        
            let AlbumPosterUrlFromDB = await (await cloudinaryResponse).json()
            // console.log(AlbumPosterUrlFromDB);

            // let Payload = {
            //     ...albumState,
            //     albumPoster:AlbumPosterUrlFromDB?.url
            // }
            // console.log(Payload);

            let SongsUrl = songsState.map(async(song , index)=>{
                let songThumbnailFormData = new FormData();

                songThumbnailFormData.append("file" , song?.songThumbnail)
                songThumbnailFormData.append("upload_preset" ,"tech_haven_music_11");
                songThumbnailFormData.append("cloud_name","dvmqzmtec");

                let cloudinaryResponseOfSongThumbnailData = fetch("https://api.cloudinary.com/v1_1/your-id/upload",{
                    method:"POST",
                    body:songThumbnailFormData
                })

                let SongPosterUrlFromDB = await (await cloudinaryResponseOfSongThumbnailData).json()
                // console.log(SongPosterUrlFromDB);

                // *songPoster url ends here

                // song url starts here

                let songURLFormData = new FormData();

                songURLFormData.append("file" , song?.songUrl)
                songURLFormData.append("upload_preset" ,"tech_haven_music_11");
                songURLFormData.append("cloud_name","dvmqzmtec");

                let cloudinaryResponseOfSongURLData = fetch("https://api.cloudinary.com/v1_1/your-id/upload",{
                    method:"POST",
                    body:songURLFormData
                })

                let SongMP3UrlFromDB = await (await cloudinaryResponseOfSongURLData).json()
                // console.log(SongMP3UrlFromDB);

                // console.log("songmp3 url",SongMP3UrlFromDB);
                // console.log("song poster url",SongPosterUrlFromDB);
                

                return ({...song , songThumbnail:SongPosterUrlFromDB?.url , songUrl:SongMP3UrlFromDB?.url , songDuration:SongMP3UrlFromDB?.duration})                             //optional chaining

                // ? songstate iteratioon ends here
            })


            let SongsDataFromCloudinaryResponse = await Promise.all(SongsUrl)

            let Payload = {...albumState , 
                albumPoster:AlbumPosterUrlFromDB?.url , AllSongs :[...SongsDataFromCloudinaryResponse]
            }
            console.log("Payload",Payload);

            let album_collection_ref = collection(__DB , "album_collections");
            console.log(album_collection_ref);
            

            let albumDataForDB = await addDoc(album_collection_ref , Payload)

            toast.success("Data stored successfully")


            // console.log("Album Poster URL",AlbumPosterUrlFromDB?.url);
            
            
            

        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            
            
        } finally{
            setIsLoading(false)
        }
        
    }



  return (
    <section className='min-h-full w-full flex justify-center '>
        <article className='min-h-[400px] w-[65%] rounded-md bg-slate-800 mt-12 pt-4 px-8'>
            <header><h1 className='text-[24px] font-semibold text-center'>Create Album</h1></header>
            <hr className='my-2'/>

            {/* form starting */}

            <main>
                {/* album form starting */}
                <header className='my-4'>
                    <h1 className='text-[20px] font-semibold'>Album Details</h1>
                </header>

                <article>
                    <form action="" onSubmit={handleFormSubmit}>
                        {/* album starts */}
                        <header className='flex flex-wrap justify-between gap-y-4'>
                            
                            {/* first row album */}
                            <div className='flex flex-col gap-2 w-[48%] '>
                                <label htmlFor="albumTitle">Album Title</label>
                                <input type="text" onChange={handleAlbumInputChange} placeholder='Enter Album Title' name='albumTitle' value={albumTitle} className='outline-none rounded-md py-2 px-2 border'/>
                            </div>
                            
                            <div className='flex flex-col gap-2 w-[48%] '>
                                <label htmlFor="albumPoster">Album Poster</label>
                                <input type="file" name='albumPoster' onChange={handleAlbumPoster} className='outline-none rounded-md py-2 px-2 border file:bg-blue-600 file:px-1 file:rounded-sm'/>
                            </div>

                            {/* second row */}
                            <div className='flex flex-col gap-2 w-[48%] '>
                                <label htmlFor="albumReleaseDate">Album Release date</label>
                                <input type="date" onChange={handleAlbumInputChange} name='albumReleaseDate' value={albumReleaseDate} className='outline-none rounded-md py-2 px-2 border'/>
                            </div>
                            
                            <div className='flex flex-col gap-2 w-[48%]'>
                                <label htmlFor="albumLanguages">Album Languages</label>
                                <input type="text" onChange={handleAlbumInputChange} name='albumLanguages' value={albumLanguages} placeholder='Enter languages' className='outline-none rounded-md py-2 px-2 border'/>
                            </div>

                            {/* third row  */}
                            <div className='flex flex-col gap-2 w-[100%] '>
                                <label htmlFor="albumTitle">Album Description</label>
                                <textarea name="albumDescription" value={albumDescription} onChange={handleAlbumInputChange} id="" className='py-2 px-2 border rounded-md' placeholder='Enter the description'>

                                </textarea>
                            </div>

                        </header>
                        {/* album ends */}


                        {/* songs form starts here */}

                        <main className='py-4'>
                            <header><h1 className='text-[20px] font-semibold'>Songs Section</h1></header>

                            {/* iterating songstate */}
                            {songsState?.map((song , index )=>{
                                return <section className='bg-slate-700 py-2 px-6 w-[100%] min-h-[250px] rounded-md my-4'>
                                    <header><h1 className='text-[18px] font-semibold text-center'>Song {index+1}</h1></header>

                                    {/* songs div section */}
                                    <main className='flex flex-wrap justify-between gap-y-4'>

                                        {/* first row songs section */}
                                        <div className='flex flex-col gap-2 w-[32%] '>
                                            <label htmlFor="">Song Name</label>
                                            <input type="text" name='songName' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songName} placeholder='Enter song name' className='py-2 px-2 rounded-md outline-none border'/>
                                        </div>
                                        <div className='flex flex-col gap-2 w-[32%] '>
                                            <label htmlFor="">Song Url</label>
                                            <input type="file" name='songUrl' onChange={(e)=>handleSongsFilesInput(index , "songUrl" , e)} className='py-2 px-2 rounded-md outline-none border file:bg-blue-600 file:px-1 file:rounded-md'/>
                                        </div>
                                        <div className='flex flex-col gap-2 w-[32%] '>
                                            <label htmlFor="">Song Poster</label>
                                            <input type="file" name='songThumbnail' onChange={(e)=>handleSongsFilesInput(index , "songThumbnail" , e)}  className='py-2 px-2 rounded-md outline-none border file:bg-blue-600 file:px-1 file:rounded-md'/>
                                        </div>

                                        {/* second row songs section */}
                                        <div className='flex flex-col gap-2 w-[32%] '>
                                            <label htmlFor="">Song Singers</label>
                                            <input type="text" name='songSingers' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songSingers} placeholder='Enter singers' className='py-2 px-2 rounded-md outline-none border'/>
                                        </div>
                                        <div className='flex flex-col gap-2 w-[32%] '>
                                            <label htmlFor="">Song Mood</label>
                                            <input type="text" name='songMood' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songMood} placeholder='Enter song mood' className='py-2 px-2 rounded-md outline-none border'/>
                                        </div>
                                        <div className='flex flex-col gap-2 w-[32%] '>
                                            <label htmlFor="">Song Music Director</label>
                                            <input type="text" name='songMusicDirector' onChange={(e)=>handleSongsInputChange(index,e)} value={song?.songMusicDirector} placeholder='Enter music director' className='py-2 px-2 rounded-md outline-none border'/>
                                        </div>
                                        
                                    </main>

                                    <footer className='flex justify-between py-6'>
                                        <button onClick={(e)=>removeSongSection(index , e)} className='py-2 px-4 bg-red-600 rounded-md'>Remove Section</button>
                                        
                                        {index == songsState.length-1 && <button onClick={(e)=>addSongsSection(e)} className='py-2 px-4 bg-blue-600 rounded-md'>Add Section</button>}

                                        
                                    </footer>
                                </section>
                            })}

                            <section>

                            </section>
                        </main>
                        {/* songs form ends here */}


                        {/* submit part starts */}
                        <footer>
                            <button className='bg-blue-600 hover:bg-blue-800 w-[100%] py-2 rounded-md'>Submit</button>
                        </footer>
                        {/* submit part ends */}
                    </form>
                </article>

                {/* album form ending */}
            </main>
        </article>
        {isLoading && <Spinner/>}
    </section>
  )
}

export default CreateAlbum
