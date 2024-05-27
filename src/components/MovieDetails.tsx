import { useState } from "react";

import { movieDetails, movieTriller } from "@/services/fetchMovies";

import { MovieDetail, TrialerVid } from "@/utils/types";

import { Link, useLoaderData, type LoaderFunction } from "react-router-dom";

import { MdCloudDownload } from "react-icons/md";
import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useAppSelector } from "@/hooks";

import YouTube, { YouTubeProps } from "react-youtube";
import SkeletonComp from "./SkeletonComp";

function MovieDetails() {
  const data = useLoaderData() as MovieDetail;

  const a = useAppSelector((state) => state.movies);

  console.log(a);

  const [videoData, setVideoData] = useState<TrialerVid[]>([]);

  console.log(videoData, "videoData");

  function noVideo() {
    toast("No video Available!", {
      position: "top-center",
      autoClose: 2999,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
   
  }

  function download() {
    toast("Ooops, sorry", {
      position: "top-center",
      autoClose: 2999,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce
    });
  }

  async function videoTriller() {
    const videoResult = await movieTriller(data.id);
    setVideoData(videoResult);
  }

  function renderTrailer() {
    const trailer = videoData[0];

    const opts: YouTubeProps["opts"] = {
      height: "390",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div className="you">{trailer && <YouTube videoId={trailer.key} opts={opts} />}</div>
    );
  }

  return (
    <section className="w-full">
      <div className="">

        {
          data ? (<div
          className="w-full h-[100vh] relative bg-blend-multiply my-css-custom"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${data.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "80vw",
            height: "100vh",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-around"
          }}>
          <div className="absolute top-0 right-0 left-0">
            {videoData ? renderTrailer() : null}
          </div>
          <div className="sm:flex sm:gap-10 px-3">
            <div>
              <h1 className="text-slate-300 text-2xl font-bold title">
                {data.original_title}
              </h1>
              <h2 className="text-slate-300">{data.release_date}</h2>

              <div>
                {data.genres.map((genre, i) => (
                  <button key={i} className="text-slate-300">
                    {genre.name}
                  </button>
                ))}
              </div>
              <div className="leading-6 sm:w-[30vw] sm:text-justify">
                <p className="text-slate-300">{data.overview}</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Link to="/bookmarks">
                  <button className="py-2 px-4 rounded-[25px] border border-orange-800 text-slate-300 cursor-pointer">
                    My List
                  </button>
                  </Link>
                  <button
                    className="py-1 px-1 rounded-full text-slate-300 bg-slate-500 cursor-pointer"
                    onClick={download}>
                    <MdCloudDownload className="text-1xl" />
                  </button>
                </div>
                <div>
                  <p className="text-slate-300 mb-1">
                    {Math.floor(data.vote_average)}0%
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="font-bold text-slate-300"
                    onClick={()=>videoTriller()}>
                    PLAY TRAILER
                  </button>
                  <button className="py-3 px-6 rounded-[25px] font-bold text-slate-300 bg-orange-800 cursor-pointer" onClick={() =>noVideo()}>
                    PLAY MOVIE
                  </button>
                </div>
              </div>
              {data.production_companies &&
                data.production_companies.length > 0 && (
                  <p className="w-[30vw] text-orange-800 font-bold drop-shadow-lg">
                    {data.production_companies[0].name}
                  </p>
                )}
            </div>
          </div>
        </div>) : <SkeletonComp /> 
        }
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2999}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </section>
  );
}

export const loader: LoaderFunction = async ({
  params
}): Promise<MovieDetail> => {
  const data = await movieDetails(params.id as string);
  return data as MovieDetail;
};

export default MovieDetails;
