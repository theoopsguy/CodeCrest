import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion } from "framer-motion";

const UserAuthInput = ({
  label,
  placeholder,
  setStateFunction,
  Icon,
  type,
  setEmailValidationStatus,
}) => {
  const [value, setValue] = useState("");
  const [showPass, setshowPass] = useState(false);
  const [isEmailValid, setisEmailValid] = useState(false);
  const handleTextChange = (e) => {
    setValue(e.target.value);
    setStateFunction(e.target.value);

    if (label === "Email") {
      const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
      const status = emailRegex.test(value);
      setisEmailValid(status);
      setEmailValidationStatus(status);
    }
  };
  return (
    <div className="flex flex-col items-start justify-start gap-1">
      <label className="text-sm text-gray-300">{label}</label>
      <div
        className={`flex items-center justify-center gap-3 w-full md:w-96 bg-gray-200 rounded-md px-4 py-1 ${
          !isEmailValid &&
          label === "Email" &&
          value.length > 0 &&
          "border-2 border-red-500"
        }`}
      >
        <Icon className="text-text-555 text-2xl" />
        <input
          type={type === "password" ? (showPass ? "text" : "password") : type}
          placeholder={placeholder}
          className="flex-1 bg-transparent w-full h-full py-2 outline-none border-none text-text-555 text-lg"
          value={value}
          onChange={handleTextChange}
        />
        {type === "password" && (
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => setshowPass(!showPass)}
            className="cursor-pointer"
          >
            {!showPass ? (
              <FaEye className="text-text-555 text-2xl" />
            ) : (
              <FaEyeSlash className="text-text-555 text-2xl" />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;
