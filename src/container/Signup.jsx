import React, { useState } from 'react';
import { UserAuthInput } from '../components';
import { FaEnvelope, FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { MdPassword } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { signInWithGithub, signInWithGoogle } from '../utils/helpers';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidationStatus, setEmailValidationStatus] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState('');

  const auth = getAuth();
  const createNewUser = async () => {
    if (emailValidationStatus) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          setDoc(
            doc(db, 'users', userCredential.user.uid),
            userCredential.user.providerData[0]
          ).then(() => {
            // dispatch the action to redux store
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.message.includes('weak-password')) setAlert('Weak Password.');
          else if (error.message.includes('email-already-in-use'))
            setAlert('Email already in use. Please login.');
          else setAlert('Signup failed. Please try again later.');

          setTimeout(() => {
            setAlert('');
          }, 3000);
        });
    }
  };

  const loginWithEmailPassword = async () => {
    if (emailValidationStatus) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          console.log(error);
          if (error.message.includes('user-not-found')) setAlert('User not found. Please sign up.');
          else if (error.message.includes('wrong-password')) setAlert('Wrong password');
          else setAlert('Login failed. Please try again later.');

          setTimeout(() => {
            setAlert('');
          }, 3000);
        });
    }
  };

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
          <AnimatePresence>
            {alert && (
              <motion.p
                key={'AlertMessage'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-red-500"
              >
                {alert}
              </motion.p>
            )}
          </AnimatePresence>

          {isLogin ? (
            <motion.div
              onClick={loginWithEmailPassword}
              whileTap={{ scale: 0.8 }}
              className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emeral-400 cursor-pointer bg-emerald-500"
            >
              <p className="text-xl text-white">Log in</p>
            </motion.div>
          ) : (
            <motion.div
              onClick={createNewUser}
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
