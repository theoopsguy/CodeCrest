import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Home, NewProject, ExistingProject } from './container';
import { auth, db } from './config/firebase.config';
import Spinner from './components/Spinner';
import { useDispatch } from 'react-redux';
import { doc, orderBy, setDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { SET_USER } from './context/actions/userActions';
import { SET_PROJECTS } from './context/actions/projectActions';

const App = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setDoc(doc(db, 'users', user.uid), user?.providerData[0]).then(() => {
          dispatch(SET_USER(user?.providerData[0]));
          navigate('/home/projects', { replace: true });
        });
      } else {
        navigate('/home/auth', { replace: true });
      }

      setIsLoading(false);
    });

    // clean up the listener event
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const projectsQuery = query(collection(db, 'Projects'), orderBy('id', 'desc'));

    const unsubscribe = onSnapshot(projectsQuery, (snapshot) => {
      const projects = snapshot.docs.map((doc) => doc.data());
      dispatch(SET_PROJECTS(projects));
    });

    return unsubscribe;
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
