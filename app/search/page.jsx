"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
// import './SearchBar.css'; // Import the CSS file for styling

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("multi");
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setsearch] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await fetchMovies(
      `https://api.themoviedb.org/3/search/${filter}?query=${searchText}&include_adult=false&language=en-US&page=1`,
      setResult
    ),
      setsearch(true);
    console.log("Searching for:", searchText);
    // setSearchText("");
  };
  const handlePageChange = async (selectedPage) => {
    const newPage = selectedPage.selected + 1;
    setCurrentPage(newPage);
    return await fetchMovies(
      `https://api.themoviedb.org/3/search/${filter}?query=${searchText}&include_adult=false&language=en-US&page=${newPage}`,
      setResult
    );
  };
  console.log(result);

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="multi">all</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
          <option value="person">Person</option>
        </select>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="results_container">
        {loading ? (
          <div class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading...</p>
          </div>
        ) : (
          <div className="list">
            {result.results?.map((slide, index) => {
              let linkUrl = "";
              if (slide.media_type === "movie") {
                linkUrl = `movie/${slide.id}`;
              } else if (slide.media_type === "tv") {
                linkUrl = `tvshow/${slide.id}`;
              } else if (slide.media_type === "person") {
                linkUrl = `people/${slide.id}`;
              }
              return (
                <Link href={linkUrl}>
                  <div className="card">
                    <img
                      src={`https://image.tmdb.org/t/p/original${
                        slide.poster_path || slide.profile_path
                      }`}
                      alt=""
                    />
                    <div className="details">
                      <h3>{slide.original_language}</h3>
                      <h3>{slide.vote_average}</h3>
                      <h3>{slide.media_type}</h3>
                    </div>
                    <h1>{slide.title || slide.name}</h1>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <ReactPaginate
        pageCount={result.total_pages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={search ? "pagination" : "none"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default SearchBar;
