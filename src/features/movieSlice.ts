import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { searchMovie } from "@/services/fetchMovies";

import { Movie } from "../utils/types";
import { TextString } from "../utils/types";

interface MoviesState {
  movieSearchResult: Movie[];
  text: string;
  err: string;
  status: string;
  bookMarkArr: Movie[];
}

const initialState: MoviesState = {
  movieSearchResult: [],
  text: "",
  err: "",
  status: "",
  bookMarkArr: []
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchText(state, actions: PayloadAction<TextString>) {
      state.text = actions.payload;
    },
    toggleBookMark(state, action: PayloadAction<Movie>) {
      const obj = action.payload;

      const existingMovie = state.bookMarkArr.find(
        (mark) => mark.id === obj.id
      );

      if (existingMovie) {
       const theRemainingBackToBookMarkArr = state.bookMarkArr.filter((del) =>  del.id !==obj.id);

		state.bookMarkArr = theRemainingBackToBookMarkArr
      } else {
        state.bookMarkArr.push(obj);
      }
    }
  },

  extraReducers: (builder) =>
    builder
      .addCase(searchMovieFtn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovieFtn.fulfilled, (state, action) => {
        if (action?.payload) {
          state.movieSearchResult = action?.payload;

          state.status = "";
        }
      })
      .addCase(searchMovieFtn.rejected, (state) => {
        state.status = "Sorry, nothing to fetch";
      })
});

export const searchMovieFtn = createAsyncThunk(
  "movies/movieSearch",
  async (userInput: string) => {
    try {
      //search
      const payload = await searchMovie(userInput);

      return payload;
    } catch (error) {
      // console.log(error.message)
    }
  }
);

export const { searchText, toggleBookMark } = movieSlice.actions;

export default movieSlice.reducer;
