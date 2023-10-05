"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { FaCamera, FaCode, FaForward, FaThumbsUp } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [latest, setLatest] = useState([]);

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
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        setPopularMovies
      ),
      fetchMovies(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        setNowPlaying
      ),
      fetchMovies(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        setTopRated
      ),
      fetchMovies(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        setLatest
      ),
    ]);
  }, []);

  const popularList = popularMovies.results?.slice(0, 8);
  const nowPlayingList = nowPlaying.results;
  const topRatedList = topRated.results?.slice(0, 9);
  const latestList = latest.results;
  console.log(latest);
  return (
    <>
      {loading ? (
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Loading...</p>
        </div>
      ) : (
        <>
          <div className="slides">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {popularList?.map((slide, index) => {
                return (
                  <SwiperSlide>
                    <div className="myslide">
                      <img
                        src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                        key={index}
                      />
                      <div className="info">
                        <h1>{slide.title}</h1>
                        <p>{slide.overview}</p>
                        <ul>
                          <li>{slide.release_date}</li>
                          <li>{slide.original_language}</li>
                          <li>{slide.vote_average}</li>
                        </ul>
                        <div className="btn-group">
                          <button className="explore"> Explore</button>
                          <button className="outline">Add to Favorire</button>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className="recommended">
            <h1>
              <FaThumbsUp />
              Recomended
            </h1>
            <div className="container">
              <div className="list">
                {nowPlayingList?.map((slide, index) => {
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
              <div className="top_rated">
                <h1>
                  <FaStar /> Top Rated
                </h1>
                {topRatedList?.map((slide, index) => {
                  return (
                    <Link href={`movie/${slide.id}`}>
                      <div className="card">
                        <img
                          src={`https://image.tmdb.org/t/p/original${slide.poster_path}`}
                          alt=""
                        />
                        <div>
                          <div className="details">
                            <h3>{slide.release_date}</h3>
                            <h3>{slide.vote_average}</h3>
                            <h3>{slide.original_language}</h3>
                          </div>
                          <h1>{slide.title}</h1>
                        </div>
                        <span class="top"></span>
                        <span class="right"></span>
                        <span class="bottom"></span>
                        <span class="left"></span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="upcoming">
            <h1>
              <FaForward /> Upcoming
            </h1>
            <div className="list">
              {latestList?.map((slide, index) => {
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
          </div>
        </>
      )}
    </>
  );
}
