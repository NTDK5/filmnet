"use client";
import Image from "next/image";
import "./movie_detail.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import YouTube from "react-youtube";

const Moviepage = ({ params: { id } }) => {
  const [movies, setMovies] = useState([]);
  const [videos, setVideos] = useState([]);
  const [casts, setCast] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState([]);
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
      fetchMovies(`https://api.themoviedb.org/3/movie/${id}`, setMovies),
      fetchMovies(
        `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
        setCast
      ),
      fetchMovies(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1'`,
        setRecommendation
      ),
      fetchMovies(
        `https://api.themoviedb.org/3/movie/${id}/videos?&language=en-US&page=1`,
        setVideos
      ),
    ]);
  }, []);
  console.log(movies);
  const Cast = casts.cast;
  console.log(Cast);
  console.log(recommendation);
  console.log(videos);
  const Official = videos.results?.find(
    (vid) => vid.name === "Official Trailer"
  );
  console.log(Official);
  return (
    <>
      {loading ? (
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading...</p>
        </div>
      ) : (
        <>
          <div className="hero">
            {playTrailer ? (
              <YouTube
                videoId={Official.key}
                className="trailer"
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />
            ) : null}
            <img
              src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
              alt={movies.title}
            />
          </div>
          <div className={playTrailer ? "down" : "movie_container "}>
            <div className="movie_details">
              <img
                src={`https://image.tmdb.org/t/p/original${movies.poster_path} `}
                alt=""
              />
              <div className="movie-details_content">
                <h1>{movies.title}</h1>
                <p>{movies.overview}</p>
                <div className="outlines_details">
                  {movies.genres?.map((gener) => {
                    return <h3>{gener.name}</h3>;
                  })}
                </div>
                <div className="btn-group">
                  {playTrailer ? (
                    <button onClick={() => setPlayTrailer(false)}>
                      Close Trailer
                    </button>
                  ) : (
                    <button
                      onClick={() => setPlayTrailer(true)}
                      class="btn btn-primary"
                    >
                      Watch Trailer
                    </button>
                  )}
                  <button>Add to Favorites</button>
                </div>
                <div className="movie_details_list">
                  <h2>
                    <strong>Original Title:</strong> {movies.original_title}
                  </h2>
                  <h2>
                    <strong>Release Date:</strong> {movies.release_date}
                  </h2>
                  <h2>
                    <strong>Runtime:</strong> {movies.runtime}s
                  </h2>
                  <h2>
                    <strong>Rating: </strong>
                    {movies.vote_average?.toFixed(1)}
                  </h2>
                  <h2>
                    <strong>Revenue:</strong> {movies.revenue}$
                  </h2>
                  <h2>
                    <strong>Status:</strong> {movies.status}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="cast">
            <h1>Top Cast </h1>
            <div className="cast_list">
              {Cast?.map((cast) => {
                return (
                  <Link href={`/people/${cast.id}`}>
                    <div className="cast_card">
                      <img
                        src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                      />
                      <div className="cast_details">
                        <h3>{cast.name}</h3>
                        <p>character {cast.character}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="production">
            <h1>Production Companies</h1>

            <div className="production_list">
              {movies.production_companies?.map((company, index) => {
                // console.log(company.logo_path);
                return (
                  <div className="production_card" key={index}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="recommendation">
            <h1>Reccommendaton</h1>
            <div className="list">
              {recommendation.results?.map((movie, index) => {
                return (
                  <Link href={`/movie/${movie.id}`}>
                    <div className="card">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt=""
                      />
                      <div className="details">
                        <h3>{movie.original_language}</h3>
                        <h3>{movie.vote_average}</h3>
                        <h3>{movie.release_date}</h3>
                      </div>
                      <h1>{movie.title}</h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Moviepage;
