import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "../../common/apis/MovieApi";
import { APIKey, i } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieAPI.get(
      `?i=${i}&APIKey=${APIKey}&s=${term}&type=movie`
    );

    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await movieAPI.get(
      `?i=${i}&APIKey=${APIKey}&s=${term}&type=series`
    );

    return response.data;
  }
);
export const fetchAsyncMovieOrShows = createAsyncThunk(
  "movies/fetchAsyncMovieOrShows",
  async (id) => {
    const response = await movieAPI.get(`?&APIKey=${APIKey}&i=${id}&Plot=full`);

    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, shows: payload };
    },
    [fetchAsyncMovieOrShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectMovieOrShow: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected!");
    },
  },
});
export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllMovieOrShowsDetail = (state) =>
  state.movies.selectMovieOrShow;
export default movieSlice.reducer;
