import React, { useContext } from 'react'
import { AlbumContextAPI } from '../../context/AlbumContext'

const TrendingSongs = () => {

  let { allAlbums } = useContext(AlbumContextAPI);

  return (
    <section>
      <article>
      <header><h1 className='text-[24px] font-semibold '>Trending Songs</h1></header>
      <main>
        {allAlbums?.map((album , index) => {
          album.map((song,ind)=>{
            return <div key={index} className="h-[260px] w-[200px] p-3 bg-slate-800 rounded-md">
              <NavLink to={"/album-details"} state={album}>
                <picture>
                  <img src={song?.albumPoster} alt="" className='h-[200px] w-[180px] rounded-sm'/>
                </picture>
                <p className='text-[18px] font-semibold text-center py-2'>{album?.albumTitle}</p>
              </NavLink>
            </div>
          })
          
        })}
      </main>
      </article>
      
    </section>
  )
}

export default TrendingSongs
