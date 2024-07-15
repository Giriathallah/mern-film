import React from "react";
import ReactDOM from "react-dom/client";
// import App from './styles/App.css'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page.jsx";
import Popular from "./pages/popular";
import NowPlaying from "./pages/nowPlaying";
import Home from "./pages/home";
import Upcoming from "./pages/upcoming.jsx";
import MovieDetails from "./pages/movieDetails";
import "animate.css";

const router = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/now-playing",
    element: <NowPlaying />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/popular",
    element: <Popular />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/upcoming",
    element: <Upcoming />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
