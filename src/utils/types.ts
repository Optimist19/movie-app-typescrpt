export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieState {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  isBookMarked: boolean;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type origin_country = string

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: undefined;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    },
    {
      id: number;
      name: string;
    },
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: origin_country[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    },
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    },
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    },
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

//Our payload, the type it is having

export type TextString = ""


export interface TrialerVid {
	id: string;
iso_639_1: string;
iso_3166_1: string;
key: string;
name: string;
official: boolean
published_at: string;
site: string,
  size: number,
  type: string;
}

export interface FetchMoviesResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}