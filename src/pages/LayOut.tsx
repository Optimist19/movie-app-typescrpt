import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import { GrMultimedia } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuBookmark } from "react-icons/lu";
import { FaFilm } from "react-icons/fa6";
import { PiTelevisionBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";

import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { motion } from "framer-motion";

const film = () => {
  toast("Not available", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    // transition: Bounce,
  });
};

const tv = () => {
  toast("Not available", {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
    // transition: Bounce,
  });
};

function LayOut() {
  return (
    <div>
      <Sidebar className="text-slate-400 navbar">
        <Menu>
          <motion.div 
          initial={{x: -400}}
          animate={{x: 0}}
          transition={{
            delay: 0.5,
            duration: 0.5,
            type: "spring",
            stiffness: 300
          }}

          >
            <div>
              <MenuItem>
                <GrMultimedia className="text-2xl" />
              </MenuItem>
            </div>
            <div>
              <MenuItem>
                <Link to="/">
                  <LuLayoutDashboard className="text-2xl" />
                </Link>
              </MenuItem>
              <MenuItem onClick={film}>
                <FaFilm className="text-2xl" />
              </MenuItem>
              <MenuItem onClick={tv}>
                <PiTelevisionBold className="text-2xl" />
              </MenuItem>
              <MenuItem>
                <Link to="/bookmarks">
                  <LuBookmark className="text-2xl" />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="" />
                <LuLogOut className="text-2xl" />
              </MenuItem>
            </div>
          </motion.div>
        </Menu>
      </Sidebar>
      <main>
        <div className="ml-[10vw]">
          <Outlet />
        </div>
      </main>
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
  );
}

export default LayOut;
