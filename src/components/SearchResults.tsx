import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toggleBookMark } from "@/features/movieSlice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { LuBookmark } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import SkeletonComp from "./SkeletonComp";
import { IoMdArrowRoundBack } from "react-icons/io";

function SearchResults() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { movieSearchResult, status, bookMarkArr } = useAppSelector(
    (store) => store.movies
  );


  function addedToBookMarkAlert(title: string, id: number) {
    const isExist = bookMarkArr.find((bookmark) => bookmark.id === id);
    if (isExist) {
      // console.log("gooo");
      toast(`${title} removed`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
        // transition: Bounce,
      });
    } else {
      // console.log("gooo");
      toast(`${title} added`, {
        position: "top-center",
        autoClose: 5000,
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

  const loadingSign = Array.from({ length: 9 }, (_, index) => index + 1);

  return (
    <section>
     <div className="text-lg font-bold mb-4 flex gap-3 items-center">
        <IoMdArrowRoundBack className="text-2xl cursor-pointer" onClick={() => navigate(-1)} />
        <p>{ movieSearchResult.length === 1 ? "Your Search result" : "Your Search results"}</p>
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
                      <div className="absolute top-3 right-3">
                        <LuBookmark
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            dispatch(toggleBookMark(latest));
                            addedToBookMarkAlert(latest.title, latest.id);
                          }}
                          className="text-xl"
                        />
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          )}
        </div>
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

export default SearchResults;
