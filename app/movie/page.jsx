"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const moviespage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(20);
  const [isMobileView, setIsMobileView] = useState(false);

  const fetchMovies = async (url, setter) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzU1ZTc3YjhjNDhmNGM4NTA2M2Q5NTdmZjJhMTg1MSIsInN1YiI6IjYzOWNiMmVmYWE3ODk4MDA5MTE1Y2JkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nvbNZqq6sSlkF-lFxn-bq9MIhfV4FK8BTPLsZHX_vxg",
      },
    };
    setLoading(true);
    const response = await fetch(url, options);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const data = await response.json();
    setter(data);
    setLoading(false);
    return data;
  };
  useEffect(() => {
    Promise.all([
      fetchMovies(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${currentPage}`,
        setMovies
      ),
    ]);
  }, [currentPage]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };
  const pageRangeDisplayed = isMobileView ? 3 : 5;
  console.log(movies);
  return (
    <>
      {loading ? (
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading...</p>
        </div>
      ) : (
        <div className="movies">
          <h1>Movies</h1>
          <div className="list">
            {movies.results?.map((slide, index) => {
              return (
                <Link href={`movie/${slide.id}`}>
                  <div className="card">
                    <img
                      src={`https://image.tmdb.org/t/p/original${slide.poster_path}`}
                      alt=""
                    />
                    <div className="details">
                      <h3>{slide.original_language}</h3>
                      <h3>{slide.vote_average}</h3>
                      <h3>{slide.release_date}</h3>
                    </div>
                    <h1>{slide.title}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={pageRangeDisplayed}
            marginPagesDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
};

export default moviespage;
