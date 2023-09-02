import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home, NewProject, ExistingProject } from './container';
import { auth, db } from './config/firebase.config';
import Spinner from './components/Spinner';
import { useDispatch } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { SET_USER } from './context/actions/userActions';

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setDoc(doc(db, 'users', user.uid), user?.providerData[0])
          .then(() => {
            dispatch(SET_USER(user?.providerData[0]));
            navigate('/home/projects', { replace: true });
          })
          .then(() => {
            setIsLoading(false);
          });
      } else {
        navigate('/home/auth', { replace: true });
      }
    });

    setInterval(() => {
      setIsLoading(false);
    }, 5000);

    // clean up the listener event
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/newProject" element={<NewProject />} />
            <Route path="/project/*" element={<ExistingProject />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
