import { FetchMoviesResponse, Movie, TrialerVid } from "@/utils/types";
import { MovieDetail } from "@/utils/types";


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDAzZmIyYmM5ZDE3NjhiMDZmMDAzYzUyNWM0NmMyYyIsInN1YiI6IjY0YjgyNDdjNTViMGMwMDBmZmIwZGZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n0Cuf1zswhdiK3E4m5ZEdbDUimZcX8AWZWBnJC3e6WI"
  }
};


//Top Rated Movies
export async function fetchMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );
    const data = await response.json(); // Type assertion for Zod
    // console.log(data)
    return data.results;
  } catch (err) {
    console.error('Error fetching movies:', err);
    throw err; // Re-throw to reject the promise
  }
}

//Lastest Movies


export async function fetchLatestMovies({pageParam}: {pageParam: number}): Promise<FetchMoviesResponse> {

  // console.log(props, "props")
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageParam}`,
    options
  );
  const data: FetchMoviesResponse = await response.json();

  // console.log(data, "first")
  return data
}

// export async function fetchLatestMovies(): Promise<Movie[]>{

//   const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
//   const data = await response.json()
//   return data.results
// }



//Movie Details

export async function movieDetails(id:string): Promise<MovieDetail>{

  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  const data = await response.json()
  // console.log(data, "dat")
  return data
}


//search
export async function searchMovie(title: string):Promise<Movie[]>{
 const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`, options)

 const data =  await response.json()

 return data.results
}


export async function movieTriller(id:number): Promise<TrialerVid[]>{
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=e003fb2bc9d1768b06f003c525c46c2c&append_to_response=videos`
      // options
    );
    const data = await response.json();
    console.log(data);
    // Access trailers through data.videos.results (assuming that's the structure)
    return data.videos.results || []; // Return empty array if no results
  } catch (err) {
    console.error("Error fetching trailers:", err);
    return []; // Return empty array here too
  }
}


// interface 


// interface Movie {
//   id: number;
//   title: string;
//   backdrop_path: string;
//   release_date: string;
// }



export async function pagination({pageParam}: {pageParam: number}): Promise<FetchMoviesResponse> {

  // console.log(props, "props")
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageParam}`,
    options
  );
  const data: FetchMoviesResponse = await response.json();

  console.log(data, "first")
  return data
}
