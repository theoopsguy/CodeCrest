import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';
import { Menus, signOutAction } from '../utils/helpers';
import { Link } from 'react-router-dom';

const UserProfileDetails = () => {
  const user = useSelector((state) => state.user);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-400 cursor-pointer overflow-hidden">
        {user?.photoURL ? (
          <motion.img
            whileHover={{ scale: 1.2 }}
            src={user?.photoURL}
            alt={user?.displayName}
            referrerPolicy="no-referrer"
            className="object-cover w-full h-full"
          />
        ) : (
          <p className="text-white capitalize font-semibold text-2xl">{user?.email?.charAt(0)}</p>
        )}
      </div>

      <motion.div
        whileTap={{ scale: 0.8 }}
        className="p-4 rounded-md flex items-center justify-center
bg-secondary cursor-pointer"
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      >
        <FaChevronDown className="text-primaryText" />
      </motion.div>
      <AnimatePresence>
        {showProfileMenu && (
          <motion.div
            className="bg-secondary absolute top-16 right-0 px-4 py-3
rounded-xl shadow-md z-10 flex flex-col items—start justify—start gap-4 min-w-[225px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {Menus &&
              Menus.map((menu) => (
                <Link
                  to={menu.uri}
                  key={menu.id}
                  className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md"
                >
                  {menu.name}
                </Link>
              ))}
            <motion.p
              onClick={signOutAction}
              whileTap={{ scale: 0.8 }}
              className="text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer"
            >
              Sign Out
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDetails;
