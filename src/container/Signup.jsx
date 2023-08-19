import React, { useState } from "react";
import { UserAuthInput } from "../components";
import { FaEnvelope } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidationStatus, setEmailValidationStatus] = useState(false);
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
        </div>
      </div>
    </div>
  );
};

export default Signup;
