import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom';
import {Logo} from '../assets';

const Home = () => {
  const [isSideMenu, setisSideMenu] = useState(false);
  return (
    <>
      <div
        className={`w-2 ${
          isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"
        } min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}
      >
        {/* anchor */}
        <motion.div
          whileTap={{ scale: 0.8 }}
          // onClick={() => setisSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          <HiChevronDoubleLeft className="text-white text-xl" />
        </motion.div>

        <div className="overflow-hidden w-full flex flex-col gap-4">
          {/* logo */}
          <Link to ="/home">
            <img src={Logo} alt="logo" className="object-contain w-72 h-auto" />
          </Link>

          {/* start coding */}

          {/* Home nav */}
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Home;
