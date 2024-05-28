import { useEffect } from "react";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useAppDispatch, useAppSelector } from "@/hooks";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import SkeletonComp from "./SkeletonComp";

import { FaBookmark } from "react-icons/fa6";

import { fetchLatestMovies } from "@/services/fetchMovies";

import { toggleBookMark } from "@/features/movieSlice";

import { useInView } from "react-intersection-observer";

function LastestMovie() {
  const { ref, inView } = useInView();

  const { data, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["lastestMovie"],
      queryFn: fetchLatestMovies,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.results.length
          ? allPages.length + 1
          : undefined;
        return nextPage;
      }
    });

  const dispatch = useAppDispatch();
  const { bookMarkArr } = useAppSelector((state) => state.movies);
  // console.log(data, "data")

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log(inView);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const loadingSign = Array.from({ length: 9 }, (_, index) => index + 1);

  // function addedToBookMarkAlert(title: string, id: number) {
  //   const isExist = bookMarkArr.find((bookmark) => bookmark.id === id);
  //   if (isExist) {
  //     alert(`${title} removed`);
  //   } else {
  //     alert(`${title} added`);
  //   }
  // }

  return (
    <section>
      <div className="top-con w-[85vw] mx-auto">
        <p className="text-lg font-bold mb-4 pl-16">Recommended for you</p>
        <div>
          <div className="">
            <div className="flex justify-center flex-wrap gap-3">
              {isFetchingNextPage ? (
                <div className="flex justify-center flex-wrap gap-3">
                  {loadingSign.map((_, i) => (
                    <div key={i}>
                      <SkeletonComp />
                    </div>
                  ))}
                </div>
              ) : (
                data?.pages.map((arr, i) => {
                  return (
                    <div key={i} ref={ref}>
                      <div className="flex justify-center flex-wrap gap-3">
                        {arr.results.map((obj) => {
                          return (
                            <Link to={`movie/${obj.id}`} key={obj.id}>
                              <Card
                                className="w-64 h-96 flex flex-col relative"
                                style={{
                                  backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${obj.backdrop_path}')`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center"
                                }}>
                                <CardHeader>
                                  <CardTitle className="title">
                                    {obj.title}
                                  </CardTitle>
                                </CardHeader>
                                <CardFooter className="absolute bottom-0">
                                  <p className="text-sm date">
                                    {obj.release_date}
                                  </p>
                                </CardFooter>
                                <div
                                  className="absolute top-3 right-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    dispatch(toggleBookMark(obj));
                                    // addedToBookMarkAlert(obj.title, obj.id);
                                  }}>
                                  {bookMarkArr.find(
                                    (bookmark) => bookmark.id === obj.id
                                  ) ? (
                                    <FaBookmark className="text-red-500" />
                                  ) : (
                                    <FaBookmark className="text-slate-500" />
                                  )}
                                </div>
                              </Card>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}

              <div>
                {isFetching && !isFetchingNextPage ? "Fetching..." : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LastestMovie;
