import LastestMovie from "@/components/LastestMovie";
import SearchBar from "@/components/SearchBar";
import TopRatedComp from "@/components/TopRatedComp";


function Home() {


  return (
    <section>
      <div className="">
        <SearchBar />
        <TopRatedComp />
        <LastestMovie />
      </div>
    </section>
  );
}

export default Home;
