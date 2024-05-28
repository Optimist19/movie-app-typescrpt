import { useState } from "react";

import { movieDetails, movieTriller } from "@/services/fetchMovies";

import { MovieDetail, TrialerVid } from "@/utils/types";

import {
  Link,
  useLoaderData,
  useNavigate,
  type LoaderFunction
} from "react-router-dom";

import { MdCloudDownload } from "react-icons/md";
import { FaStar } from "react-icons/fa";

import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import { useAppSelector } from "@/hooks";

import YouTube, { YouTubeProps } from "react-youtube";
import SkeletonComp from "./SkeletonComp";
import { IoMdArrowRoundBack } from "react-icons/io";

function MovieDetails() {
  const navigate = useNavigate();
  const data = useLoaderData() as MovieDetail;

  // const a = useAppSelector((state) => state.movies);

  const [videoData, setVideoData] = useState<TrialerVid[]>([]);

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
      transition: Bounce
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
      <div className="you">
        {trailer && <YouTube videoId={trailer.key} opts={opts} />}
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className=" w-full h-full relative">
        <div>
          <IoMdArrowRoundBack
            className="text-3xl cursor-pointer absolute top-3 left-4 z-10"
            onClick={() => navigate(-1)}
          />
        </div>
        {data ? (
          <div
            className="background  h-[100vh]  bg-blend-multiply my-css-custom relative"
            // style={{
            //   backgroundImage: `url("https://image.tmdb.org/t/p/w1280/${data.backdrop_path}")`,
            //   backgroundSize: "fill",
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center",
            //   width: "100vw",
            //   height: "100vh",
            //   // display: "flex",
            //   // alignItems: "end",
            //   // justifyContent: "space-around"
            // }}
          >
            <div className="w-full ">
              <img
                className="w-full h-[100vh] object-cover"
                src={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`}
                alt="background image"
              />
              <div className="absolute top-0 right-0 left-0 z-10">
                {videoData ? renderTrailer() : null}
              </div>
              <div className="py-3 sm:flex sm:justify-center sm:gap-10 px-3 pb-4 absolute bottom-0 ">
                <div>
                  <h1 className="text-2xl font-bold text-slate-300">
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
                  <div className="leading-6 sm:text-justify">
                    <p className="py-2 text-slate-300">{data.overview}</p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2 text-slate-300">
                      <Link to="/bookmarks">
                        <button className="py-2 px-4 rounded-[25px] border border-orange-800 cursor-pointer ">
                          My List
                        </button>
                      </Link>
                      <button
                        className="py-1 px-1 rounded-full  bg-slate-500 cursor-pointer"
                        onClick={download}>
                        <MdCloudDownload className="text-1xl" />
                      </button>
                    </div>
                    <div className="flex">
                      {Array.from(
                        { length: data.vote_average },
                        (_, i) => i + 1
                      ).map((_, i) => {
                        return (
                          <div key={i}>
                            <FaStar />
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                      <button
                        className="font-bold "
                        onClick={() => videoTriller()}>
                        PLAY TRAILER
                      </button>
                      <button
                        className="py-3 px-6 rounded-[25px] font-bold  bg-orange-800 cursor-pointer"
                        onClick={() => noVideo()}>
                        PLAY MOVIE
                      </button>
                    </div>
                  </div>
                  {data.production_companies &&
                    data.production_companies.length > 0 && (
                      <p className="text-slate-300 w-[30vw] text-orange-800 font-bold drop-shadow-lg">
                        {data.production_companies[0].name}
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SkeletonComp />
        )}
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
