import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

// import { LuBookmark } from "react-icons/lu";

import { fetchMovies } from "../services/fetchMovies";
import { useQuery } from "@tanstack/react-query";
// import { FaFilm } from "react-icons/fa6";

import SkeletonComp from "./SkeletonComp";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { LuBookmark } from "react-icons/lu";
import { toggleBookMark } from "@/features/movieSlice";
import { ToastContainer, toast } from "react-toastify";

function TopRatedComp() {
  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies
  });

  const { bookMarkArr } = useAppSelector((state) => state.movies);

  console.log(bookMarkArr, "bookMarkArr");

  const dispatch = useAppDispatch();
  console.log(bookMarkArr, "selector");

  const loadingSign = Array.from({ length: 2 }, (_, index) => index + 1);

  function addedToBookMarkAlert(title: string, id: number) {
    const isExist = bookMarkArr.find((bookmark) => bookmark.id === id);
    if (isExist) {
      console.log("gooo");
      toast(`${title} removed`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        // transition: Bounce,
      });
    } else {
      console.log("gooo");
      toast(`${title} added`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        // transition: Bounce,
      });
    }
  }

  return (
    <section className="w-full py-4">
      <div className="top-con w-[80vw] mx-auto">
        {isLoading ? (
          <div className="flex gap-3">
            {loadingSign.map((_, i) => (
              <div key={i}>
                <SkeletonComp />
              </div>
            ))}
          </div>
        ) : (
          <Marquee pauseOnClick={true} pauseOnHover={true} className="">
            <div className="flex gap-2 ">
              {Array.isArray(data) &&
                data.map((top) => (
                  <Link to={`movie/${top.id}`} key={top.id}>
                    <Card
                      className=" w[30vw] h-[36vh] relative  sm:w-[30vw] sm:h-[36vh] md:w-[50vw] md:h-[36vh] "
                      style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${top.backdrop_path}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}>
                      {/* <Link> */}
                      <CardHeader>
                        <CardTitle className="title">{top.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="absolute bottom-0">
                        <p className="text-sm date">{top.release_date}</p>
                      </CardFooter>
                      {/* </Link> */}
                      <div className="absolute top-3 right-3">
                        <LuBookmark
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(toggleBookMark(top));
                            addedToBookMarkAlert(top.title, top.id);
                          }}
                          className="text-xl"
                        />
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </Marquee>
        )}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition: Bounce,
        />
      </div>
    </section>
  );
}

export default TopRatedComp;
