import { Input } from "@/components/ui/input";

import { CiSearch } from "react-icons/ci";
import { useAppDispatch } from "@/hooks";

import { searchText ,searchMovieFtn } from "@/features/movieSlice";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

function SearchBar() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate()


  return (
    <div>
      <motion.div className="py-4 flex items-center gap-x-3 pl-16 top-con w-[85vw] mx-auto" 
      initial={{y: -300}}
      animate={{y: 0}}
      transition={{
        delay: 1,
        duration: 1
      }}
      >
        <label htmlFor="text">
          <CiSearch className="text-2xl" />
        </label>
        <Input id="text"
          className="w-[40vw] sm:w-[20vw]"
          placeholder="Search Movies"
          onKeyDown={(e) => {
            const target = e.target as HTMLInputElement
            if(target.value === ""){
              console.log("none")
              return;
            }else if (e.key === "Enter") {
              const target = e.target as HTMLInputElement;
              dispatch(searchMovieFtn(target.value));
              navigate("/search-results")
            }
          }}

          onChange={(e)=>{
            const target = e.target as HTMLInputElement;
            dispatch(searchText(target.value));
            
          }}
        />
      </motion.div>
    </div>
  );
}

export default SearchBar;
