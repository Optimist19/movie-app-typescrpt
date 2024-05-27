import { Skeleton } from "./ui/skeleton";
import { useAppSelector } from "@/hooks";

function SkeletonComp() {
  const a = useAppSelector((store) => store.movies);
  console.log(a, "a");

  return (
    <div>
      <div >
        <Skeleton className="mt-6 w-64 h-20 flex flex-col"
        />
      </div>
    </div>
  );
}

export default SkeletonComp;
