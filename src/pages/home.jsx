import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { UpComingMovies, searchMovie, Details } from "../api/api";
import MotivateType from "../components/utilities/heroType";
// import { NowPlayingMovies } from "../api/api";

export default function Home() {
  const navigate = useNavigate();

  // empty dependency array means this effect runs once on mount

  // eslint-disable-next-line no-unused-vars
  const [upcoming, setUpcoming] = useState([]);

  // render atau bakal ngapain klo state berubah
  useEffect(() => {
    UpComingMovies().then((results) => {
      setUpcoming(results);
    });
  }, []);
  function PopularMovieList() {
    return upcoming.map((movie, i) => {
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

  const search = async (params) => {
    if (params.length > 0) {
      const query = await searchMovie(params);
      setUpcoming(query.results);
      console.log({ query: query });
    }
  };

  // handle ke move details
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
  // bg-gradient-to-r from-[#e4b5cb] to-[#722ae6]

  return (
    <>
      <Navbar />
      <div className="flex flex-col  justify-end h-[50vh] items-center bg-[#DA7086] sm:px-5 pb-10 ">
        <h1 className="mb-3 text-3xl font-bold text-[#12101D]">
          Welcome To{" "}
          <span className="text-[#DA7086] bg-[#12101D] px-2 py-1 rounded-full">
            Good Movies
          </span>
        </h1>
        <h2 className="my-2 text-lg text-center font-bold text-[#12101D]">
          <MotivateType />
        </h2>
        <h3 className="mb-2">Martin Scorsese</h3>
        <div className="search">
          <input
            placeholder="search movie"
            className="search-movie"
            onChange={({ target }) => search(target.value)}
          />
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#DA7086"
          fillOpacity="1"
          d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,192C672,171,768,85,864,64C960,43,1056,85,1152,117.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>

      <div className="movie-container">
        <PopularMovieList />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#DA7086"
          fillOpacity="1"
          d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,192C672,171,768,85,864,64C960,43,1056,85,1152,117.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}
