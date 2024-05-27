import { useNavigate } from "react-router-dom";
import pageNotFound from "../assets/404-page-not-found-illustration-2048x998-yjzeuy4v.png";
import { LuArrowLeft } from "react-icons/lu";

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className="relative">
      <LuArrowLeft className="font-bold absolute text-4xl top-2 left-3 cursor-pointer" onClick={()=> navigate(-1)}/>
      <div className="">
        <img src={pageNotFound} alt="page not found" />
      </div>
    </div>
  );
}

export default PageNotFound;
