import { useState } from 'react'
import '../styles/App.css'
import { NowPlayingMovies} from '../api/api'
import { useEffect } from 'react';
// import Navbar from '../components/navbar';

export default function NowPlaying() {
    const [nowPlay, setNowPlay] = useState([]);

  // render atau bakal ngapain klo state berubah
  useEffect(() => {
    NowPlayingMovies().then((results) => {
      setNowPlay(results)
    })
  }, []);
  function NowPlayingMovieList(){
    const top10Movies = nowPlay.slice(0, 10);

    return top10Movies.map((movie, i) => {
    console.log(movie)
      return (
        <div className="movie-wrapper" key={i}>
                
              <img className='' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="coba lek" />
               <h1 className='text-2xl bold text-white'>{movie.title}</h1> 
               <span>Overview </span>
               <p>{movie.overview}</p>
               <span>Rating</span>
               <p>{movie.vote_average}/10</p>
             
        </div>
        
      )
    })
  }

  
  
  return (
    <>
      <div className="app">
        <div className="top">
          <header><h1>moviein aja</h1></header>
          <p>gk ada bokep anj</p>
          
        </div>
        <div className="app-header">
      </div>
        <div className="movie-container">
          <NowPlayingMovieList/>
        </div>
      </div>
    </>
  )
}

