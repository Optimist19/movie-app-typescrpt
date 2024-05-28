import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toggleBookMark } from "@/features/movieSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import SkeletonComp from "./SkeletonComp";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";

function SearchResults() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movieSearchResult, status, bookMarkArr } = useAppSelector(
    (store) => store.movies
  );

  // function addedToBookMarkAlert(title: string, id: number) {
  //   const isExist = bookMarkArr.find((bookmark) => bookmark.id === id);
  //   if (isExist) {
  //     alert(`${title} removed`);
  //   } else {
  //     alert(`${title} added`);
  //   }
  // }

  const loadingSign = Array.from({ length: 9 }, (_, index) => index + 1);

  return (
    <section>
      <div className="text-lg font-bold mb-4 flex gap-3 items-center">
        <IoMdArrowRoundBack
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p>
          {movieSearchResult.length === 1
            ? "Your Search result"
            : "Your Search results"}
        </p>
      </div>
      <div>
        <div className="">
          {status === "pending" ? (
            <div className="flex justify-center flex-wrap gap-3">
              {loadingSign.map((_, i) => {
                return (
                  <div key={i}>
                    <SkeletonComp />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center flex-wrap gap-3">
              {Array.isArray(movieSearchResult) &&
                movieSearchResult.map((latest) => (
                  <Link to={`/movie/${latest.id}`} key={latest.id}>
                    <Card
                      className="w-64 h-96 flex  relative flex-col"
                      style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${latest.backdrop_path}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}>
                      <CardHeader>
                        <CardTitle className="title">{latest.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="absolute bottom-0">
                        <p className="text-sm date">{latest.release_date}</p>
                      </CardFooter>
                      <div
                        className="absolute top-3 right-3"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          dispatch(toggleBookMark(latest));
                          // addedToBookMarkAlert(obj.title, obj.id);
                        }}>
                        {bookMarkArr.find(
                          (bookmark) => bookmark.id === latest.id
                        ) ? (
                          <FaBookmark className="text-red-500" />
                        ) : (
                          <FaBookmark className="text-slate-500" />
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SearchResults;
