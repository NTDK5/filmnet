"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const page = ({ params: { id } }) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState([]);
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
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = await response.json();
    setter(data);
    setLoading(false);
    return data;
  };
  useEffect(() => {
    Promise.all([
      fetchMovies(
        `https://api.themoviedb.org/3/person/${id}?language=en-US`,
        setDetails
      ),
      fetchMovies(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
        setCredits
      ),
    ]);
  }, []);
  console.log(details, credits);
  return (
    <>
      {loading ? (
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading...</p>
        </div>
      ) : (
        <div className="people_container">
          <div className="bio">
            <div className="row">
              <div className="mobile_title">
                <h1 className="desktop">{details.name}</h1>
                <h3>{details.known_for_department}</h3>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original${details.profile_path}`}
              />
              <div className="biography">
                <div className="desktop_title">
                  <h1 className="desktop">{details.name}</h1>
                  <h3>{details.known_for_department}</h3>
                </div>
                <p>{details.biography}</p>
                <div className="outlinesdetails">
                  <h3>
                    Bithplace : <span>{details.place_of_birth}</span>
                  </h3>
                  <h3>
                    Birthday : <span>{details.birthday}</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="credits">
            <h1>Known for</h1>
            <div className="list">
              {credits.cast?.map((movie, index) => {
                return (
                  <Link
                    href={
                      movie.media_type === "movie"
                        ? `/movie/${movie.id}`
                        : `/tvshow/${movie.id}`
                    }
                  >
                    <div className="card">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt=""
                      />
                      <div className="details">
                        <h3>{movie.original_language}</h3>
                        <h3>{movie.vote_average}</h3>
                        <h3>{movie.media_type}</h3>
                      </div>
                      <h1>{movie.title}</h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
