"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [show, setShow] = useState(true);
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY; // Mendapatkan posisi scroll saat ini
      const isVisible = prevScroll > currentScrollPos; // Memeriksa apakah sedang menggulir ke atas

      setShow(isVisible); // Mengatur status navbar berdasarkan arah scroll
      setPrevScroll(currentScrollPos); // Memperbarui posisi scroll sebelumnya
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScroll]);

  const links = [
    {
      id: 1,
      link: "upcoming",
    },
    {
      id: 2,
      link: "now-playing",
    },
    {
      id: 3,
      link: "popular",
    },
  ];
  return (
    <>
      <div
        className={`${
          show ? "animate__slideInDown" : "animate__slideOutUp"
        } animate__animated flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav top-0 z-[9999]`}
      >
        <div>
          {/* <h1 className="text-5xl font-signature ml-2"><a className="link-underline hover:transition ease-in-out delay-150 hover:underline hover:decoration-solid" href="">Logo</a></h1> */}
          <h1 className="font-signature ml-2">
            <div className="text-2xl bold text-white bg-[#DA7086] text-[#12101D] pointer rounded-lg px-3  py-1">
              <Link to="/">Good Movies</Link>{" "}
            </div>
          </h1>
        </div>

        <ul className="hidden md:flex">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
            >
              <Link to={`/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500 bg-opacity-0">
            {links.map(({ id, link }) => (
              <li
                key={id}
                className="px-4 cursor-pointer capitalize py-6 text-4xl"
              >
                <Link onClick={() => setNav(!nav)} to={`/${link}`}>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
