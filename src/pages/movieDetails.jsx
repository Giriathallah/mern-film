// MovieDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Details, DetailCredits, DetailVideos } from '../api/api';
import Navbar from '../components/navbar';



const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [credit, setCredit] = useState(null)
  const [video, setVideo] = useState(null)
  
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await Details(id);
        const credits = await DetailCredits(id)
        const movieVideos = await DetailVideos(id)
        setMovieDetails(details);
        setCredit(credits)
        setVideo(movieVideos)
        // console.log(trailer.key);
        
        
      } catch (error) {
        console.error('Failed to fetch movie details:', error.message);
      }
    };
    
    fetchDetails();
  }, [id]);
  if (!movieDetails) {
    return <div className='d-flex items-center'>
                <h1 className='text-center text-3xl text-white items-center'>Loading...</h1>
            </div>;
  }
  const trailer = video.results.find(item => item.type === "Trailer")
  


  return (
    <>
    
      <Navbar/>
      <div className='w-full'>
        {/* image backdrop */}
        <img src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`} alt="coba" className='w-full h-[70vh] bg-cover brightness-50 bg-white/30'/>
      </div>  
        {/* image backdrop */}
        {/* body */}
      <div className='flex md:w-4/5 mx-auto sm:w-full  shadow-[0px_-20px_5px_4px_#12101D] mt-10 z-50'>
        <div className="poster w-[20%] rounded-lg ">
            <img src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} alt="" className='rounded-lg w-full h-auto backdrop-brightness-50 aspect-[3/4] ml-5'/>
        </div>
        <div className='w-[70%] ml-10'>

          <h1 className='text-3xl text-white'>{movieDetails.title}</h1>
          <p className='text-lg text-white'>{movieDetails.release_date.substring(0, 4)}</p>
          <p className='text-white font-bold'>Director : {credit.crew.find(({ job }) => job === "Director")?.name}</p>
          <div className="genres flex gap-5 mt-3">
          {movieDetails.genres.map((genre) => (
            <div key={genre.id} className="genre px-3 py-1 bg-slate-800 rounded-full hover:bg-[#DA7086] hover:text-[#12101D] ease-in-out duration-300 cursor-pointer">
              {genre.name}
            </div>
          ))}
          </div>
          <p className='px-6 py-2 bg-[#DA7086] font-bold rounded-lg mt-8 text-[#12101D]'>{movieDetails.overview}</p>
          <div className=' w-full h-[360px] mt-10'>
          <iframe className='video w-full h-full bg-cover'
            title='Trailer'
            sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
            src={`https://youtube.com/embed/${trailer.key}?autoplay=0`}>
          </iframe>
          </div>
          <h1 className='text-2xl mt-10 bold text-white'>Cast</h1>
          <div className="flex gap-3 flex-row w-full flex-wrap mt-5">
            {credit.cast.filter((actor) => actor.order < 19).map((actor) => (
              <div className="body w-[100px] rounded-lg" key={actor.id} >
                <div className="w-full">
                  <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt={actor.name} className='w-full h-auto ratio-[1/1] rounded-lg'/>
                </div>
                <div className="bio mt-5 ">
                  <p className='text-center font-bold text-slate-300 w-full '>{actor.name}</p>
                  <p className='text-center text-slate-400'>{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
      
        </div>
        <div className='w-[10%] flex items-center justify-center h-10 gap-2 px-1'>
          <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"



                    fill="currentColor"
                    className="bi bi-star-fill text-yellow-500 text-2xl"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
          <p className='text-2xl text-white font-bold '>{movieDetails.vote_average.toFixed(1)}</p>
        </div>   
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#DA7086" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,192C672,171,768,85,864,64C960,43,1056,85,1152,117.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        {/* body */}
    </>
  );
};

export default MovieDetails;
