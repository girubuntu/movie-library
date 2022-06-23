import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import movieAPI from "../../common/apis/MovieApi";
import { APIKey, i } from "../../common/apis/MovieApiKey";
import { useDispatch } from "react-redux";
import { addMovies } from "../../features/movies/movieSlice";

const Home = () => {
  const movieText = "Harry";
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await movieAPI
        .get(`?i=${i}&APIKey=${APIKey}&s=${movieText}&type=movie`)
        .catch((err) => {
          console.log("Err : ", err);
        });
      dispatch(addMovies(response.data));
    };

    fetchMovie();
  }, []);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
