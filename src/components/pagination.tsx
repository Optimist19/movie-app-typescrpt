import { useInfiniteQuery } from "@tanstack/react-query";
import { sample } from "@/services/fetchMovies";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";


// This component is for reference for infinite scroll pagination

export default function Sample() {
  const { ref, inView } = useInView();

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: sample,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.results.length
        ? allPages.length + 1
        : undefined;
      return nextPage;
    }
  });

  const result = data?.pages.map((arr, i) => {
    return (
      <div key={i}>
        {arr.results.map((obj) => {
          return <div key={obj.id}>{obj.original_title}</div>;
        })}
      </div>
    );
  });

  console.log(data, status, error);

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log(inView);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }


  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div>
        {result}
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage
            ? "Loading more.."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      {/* {isFetchingNextPage && <h3>Loading...</h3>} */}


      {/* {you can remove the 'ref={ref}' here and put it on the div where we map our results so that we will not be needing the button above to fetch the next page for us, the third party library has handled it for us with the useEffect. So we will comment out th button and uncomment the '{isFetchingNextPage && <h3>Loading...</h3>} */}'} */}
    </div>
  );
}
