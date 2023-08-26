import React from 'react';
import { motion } from 'framer-motion';

const Alert = ({ status, alertMessage }) => {
  return (
    <motion.div
      className="fixed top-24 right-5 z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      {status === 'Success' && (
        <div className="px-4 py-2 rounded-md bg-emerald-400 shadow-md shadow-emerald-500">
          <p className="text-lg text-primary">{alertMessage}</p>
        </div>
      )}
      {status === 'Warning' && (
        <div className="px-4 py-2 rounded-md bg-yellow-400 shadow-md shadow-yellow-500">
          <p className="text-lg text-primary">{alertMessage}</p>
        </div>
      )}
      {status === 'Error' && (
        <div className="px-4 py-2 rounded-md bg-red-400 shadow-md shadow-red-500">
          <p className="text-lg text-primary">{alertMessage}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
