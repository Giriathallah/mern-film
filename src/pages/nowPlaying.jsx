import { useState, useEffect } from "react";
import { NowPlayingMovies, Details } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Carousel from "../components/carouselNP";

export default function NowPlaying() {
  const [nowPlay, setNowPlay] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    NowPlayingMovies().then((results) => {
      setNowPlay(results);
    });
  }, []);

  const handleDetailClick = async (movieId) => {
    try {
      const movieDetails = await Details(movieId);
      console.log(movieDetails);

      // Use the navigate function to redirect to the details page
      navigate(`/movie/${movieId}`);
    } catch (error) {
      console.error("Failed to fetch movie details:", error.message);
    }
  };

  function NowPlayingMovieList() {
    return nowPlay.map((movie, i) => {
      return (
        <div className="movie-wrapper flex-wrap" key={i}>
          <div className="movie-card hover:scale-110 group ease-in-out duration-300 pointer ">
            <div className="card-image relative">
              <img
                className="image"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt="coba lek"
              />
              <div className="absolute hidden group-hover:inline-block px-6 py-2 text-xl font-bold rounded-lg hover:bg-[#DA70D6]  transtion-1 ease-in-out ">
                <button
                  onClick={() => handleDetailClick(movie.id)}
                  className="text-white hover:text-[#12101D]"
                >
                  view
                </button>
              </div>
              <div className="flex absolute top-0 right-0 items-center w-16 hover:bg-[#12101D] rounded-lg mr-2 pointer justify-center mr-1 mt-1 hover:border-0 transition-1 group-hover:bg-[#DA70D6] overflow-hidden ">
                <div className="mr-1">
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
                </div>
                <p className="text-white text-xl text-center font-bold group-hover:text-[#12101D]">
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="card-title  ease-in-out duration-300">
              {movie.title}
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="app">
        <Navbar />
        <Carousel />
        <div className="movie-container">
          <NowPlayingMovieList />
        </div>
      </div>
    </>
  );
}
