import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { Link } from "react-router-dom";

import { TiDelete } from "react-icons/ti";
import { toggleBookMark } from "@/features/movieSlice";
import { IoMdArrowRoundBack } from "react-icons/io";

import bookmarkImg from "../assets/bookmark.png";

function BookMarks() {
  const { bookMarkArr } = useAppSelector((state) => state.movies);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // console.log(bookMarkArr, "bookMarkArr");

  if (bookMarkArr.length === 0) {
    return (
      <div className="relative">
        <IoMdArrowRoundBack
          className="text-3xl cursor-pointer absolute top-3 left-2"
          onClick={() => navigate(-1)}
        />
        <div className="flex justify-center items-center h-[100vh]">
          <div>
            <img
              src={bookmarkImg}
              alt="bookmark image"
              className="rounded-full"
            />
            <p className="text-center font-bold pt-1">NO BOOKMARK YET</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="text-lg font-bold mb-4 flex gap-3 items-center">
        <IoMdArrowRoundBack
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className=" ">
        <div className="flex justify-center flex-wrap gap-3">
          {Array.isArray(bookMarkArr) &&
            bookMarkArr.map((latest) => (
              <Link to={`/movie/${latest.id}`} key={latest.id}>
                <div>
                  <Card
                    className="w-64 h-96 flex flex-col relative"
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
                      <TiDelete
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch(toggleBookMark(latest));
                        }}
                        className="text-xl text-red-600"
                      />
                    </div>
                  </Card>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

export default BookMarks;
