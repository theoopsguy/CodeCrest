import React, { useState } from "react";
import { UserAuthInput } from "../components";
import { FaEnvelope, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdPassword } from "react-icons/md";
import { motion } from "framer-motion";
import { signInWithGithub, signInWithGoogle } from "../utils/helpers";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidationStatus, setEmailValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="w-full py-6">
      <div className="w-full flex flex-col items-center justify-center py-8">
        <p className="py-12 text-2xl text-primaryText">Join us!</p>
        <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
          <UserAuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            key="Email"
            setStateFunction={setEmail}
            Icon={FaEnvelope}
            setEmailValidationStatus={setEmailValidationStatus}
          />
          <UserAuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            key="Password"
            setStateFunction={setPassword}
            Icon={MdPassword}
            setEmailValidationStatus={setEmailValidationStatus}
          />
          {isLogin ? (
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emeral-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Log in</p>
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emeral-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Sign up</p>
            </motion.div>
          )}
          {isLogin ? (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Don't have an account?
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Signup here
              </span>
            </p>
          ) : (
            <p className="text-sm text-primaryText flex items-center justify-center gap-3">
              Already have an account?
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          )}

          <div className="flex items-center justify-center gap-12">
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
            <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
            <div className="h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
          </div>

          <motion.div
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.8 }}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl cursor-pointer hover:bg-[rgba(256,256,256,0.4)] bg-[rgba(256,256,256,0.2)] backdrop-blur-md"
          >
            <FcGoogle className="text-3xl" />
            <p className="text-xl text-white">Sign in with Google</p>
          </motion.div>

          <motion.div
            onClick={signInWithGithub}
            whileTap={{ scale: 0.8 }}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl cursor-pointer hover:bg-[rgba(256,256,256,0.4)] bg-[rgba(256,256,256,0.2)] backdrop-blur-md"
          >
            <FaGithub className="text-3xl text-white" />
            <p className="text-xl text-white">Sign in with Github</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
