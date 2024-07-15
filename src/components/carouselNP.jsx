import { useState, useEffect } from "react";
import { NowPlayingMovies, Details } from "../api/api";
import { Carousel } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function NowPlaying() {
  const [nowPlay, setNowPlay] = useState([]);
  const navigate = useNavigate();
  const handleDetailClick = async (movieId) => {
    try {
      await Details(movieId);

      // Use the navigate function to redirect to the details page
      navigate(`/movie/${movieId}`);
    } catch (error) {
      console.error("Failed to fetch movie details:", error.message);
    }
  };
  useEffect(() => {
    NowPlayingMovies().then((results) => {
      setNowPlay(results);
    });
  }, []);

  function NowPlayingMovieList() {
    const top10Movies = nowPlay.slice(0, 10);
    console.log(top10Movies);
    return (
      <Carousel className="rounded-xl relative overflow-hidden z-[50] mt-10">
        {top10Movies.map((movie, i) => (
          <div key={i} className="movie-wrapper w-full h-full ">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={`Movie ${i}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="p-4 absolute top-0 w-full h-full flex flex-col justify-center ">
              <div className="mt-60">
                <h1 className="text-3xl font-bold text-white mb-5 outline-1">
                  {movie.title}
                </h1>
                <div className="flex items-center gap-5 mb-3">
                  <div className="flex items-center border border-white w-20 hover:bg-red-700 rounded pointer justify-center gap-2">
                    <div className="">
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
                    <p className="text-white text-2xl  text-center">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDetailClick(movie.id)}
                    className="bg-red-700 px-5 py-1 rounded text-white"
                  >
                    View
                  </button>
                </div>
                <p className="text-white line-clamp-4 ...">{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    );
  }

  return (
    <div className="app h-[100vh]">
      <div className="h-4/5 w-4/5 flex justify-center mx-auto">
        <NowPlayingMovieList />
      </div>
    </div>
  );
}
