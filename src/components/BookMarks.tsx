import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "@/hooks";

import { Link } from "react-router-dom";

import { LuBookmark } from "react-icons/lu";
import { toggleBookMark } from "@/features/movieSlice";
import { IoMdArrowRoundBack } from "react-icons/io";



function BookMarks() {
  const { bookMarkArr } = useAppSelector((state) => state.movies);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // console.log(bookMarkArr, "bookMarkArr");

  if (bookMarkArr.length === 0) {
    return <p>No Bookmarks yet</p>;
  }


  return (
    <section>
      <div className="text-lg font-bold mb-4 flex gap-3 items-center">
        <IoMdArrowRoundBack className="text-2xl cursor-pointer" onClick={() => navigate(-1)} />
        <p>{ bookMarkArr.length === 1 ? "Your bookmark" : "Your bookmarks"}</p>
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
                      <LuBookmark
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch(toggleBookMark(latest));
                        }}
                        className="text-xl"
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
