import React, { useEffect, useState } from 'react';
import { FaCss3, FaHtml5, FaJs } from 'react-icons/fa6';
import SplitPane from 'react-split-pane';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../assets';
import { Link } from 'react-router-dom';
import { MdCheck, MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import UserProfileDetails from '../components/UserProfileDetails';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import Alert from '../components/Alert';

const NewProject = () => {
  const [html, setHtml] = useState('<!-- Simply enter the HTML body content here. -->');
  const [css, setCss] = useState('/* Add style to your page here */');
  const [js, setJs] = useState('// Write your JavaScript functions and logic here.');
  const [input, setInput] = useState('');
  const [showTitle, setShowTitle] = useState(true);
  const [title, setTitle] = useState('Untitled');
  const [alertStatus, setAlertStatus] = useState('');

  const user = useSelector((state) => state.user);

  useEffect(() => {
    updateInput();
  }, [html, css, js]);

  const updateInput = () => {
    const combinedInput = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body> 
        ${html}
        <script>${js}</script>
      </body>
    </html>`;
    setInput(combinedInput);
  };

  const saveCode = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      user: user,
      code: input,
      isPublic: false
    };

    await setDoc(doc(db, 'Projects', id), _doc)
      .then((res) => {
        setAlertStatus('Success');
      })
      .catch((err) => {
        setAlertStatus('Error');
      });

    setTimeout(() => {
      setAlertStatus('');
    }, 3000);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
      {/* alert area */}
      <AnimatePresence>
        {alertStatus && <Alert status={alertStatus} alertMessage={'Project saved successfully!'} />}
      </AnimatePresence>
      {/* header */}
      <header className="w-full flex items-center justify-between px-12 py-4">
        <div className="flex items-center justify-center gap-6">
          <Link to={'/home/projects'}>
            <img className="w-32 h-auto object-contain" src={Logo} alt="logo" />
          </Link>
          <div className="flex items-start justify-start flex-col">
            {/* title */}
            <div className="flex items-center justify-center gap-3">
              <AnimatePresence>
                {showTitle ? (
                  <>
                    <motion.p key={'titleDisplay'} className="px-3 py-2 text-white text-lg">
                      {title}
                    </motion.p>
                  </>
                ) : (
                  <>
                    <motion.input
                      key={'TitleInput'}
                      type="text"
                      className="px-3 py-2 text-primaryText text-base bg-transparent border-none rounded-md"
                      placeholder="Your title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showTitle ? (
                  <>
                    <motion.div
                      key={'MdEdit'}
                      className="cursor-pointer"
                      onClick={() => setShowTitle(false)}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MdEdit className="text-2xl text-emerald-500" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      key={'MdCheck'}
                      className="cursor-pointer"
                      onClick={() => setShowTitle(true)}
                      whileTap={{ scale: 0.9 }}
                    >
                      {' '}
                      <MdCheck className="text-2xl text-emerald-500" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 -mt-2">
              <p className="text-primaryText text-sm">
                {user?.displayName ? user?.displayName : `${user?.email.split('@')[0]}`}
              </p>
            </div>
          </div>
        </div>
        {/* save & user area */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md"
            whileTap={{ scale: 0.8 }}
            onClick={saveCode}
          >
            Save
          </motion.button>
          <UserProfileDetails />
        </div>
      </header>
      {/* coding area */}
      <div>
        {/* horizontal */}
        <SplitPane split="horizontal" minSize={100} maxSize={-100} defaultSize={'50%'}>
          {/* top coding section */}
          <SplitPane split="vertical" minSize={300} maxSize={600}>
            {/* html section */}
            <div className="w-full h-full flex flex-col items-start justify-start">
              <div className="w-full flex items-center justify-between">
                <div className="bg-secondary border-t-4 flex items-center justify-center gap-3 px-4 py-2 border-t-gray-500">
                  <FaHtml5 className="text-xl text-red-500" />
                  <p className="text-primaryText font-semibold">HTML</p>
                </div>
              </div>
              <div className="w-full px-2">
                <CodeMirror
                  value={html}
                  height="600px"
                  extensions={[javascript({ jsx: true })]}
                  theme={'dark'}
                  onChange={(value, viewUpdate) => {
                    setHtml(value);
                  }}
                />
              </div>
            </div>
            <SplitPane split="vertical" minSize={300} maxSize={600}>
              {/* css section */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary border-t-4 flex items-center justify-center gap-3 px-4 py-2 border-t-gray-500">
                    <FaCss3 className="text-xl text-sky-500" />
                    <p className="text-primaryText font-semibold">CSS</p>
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={css}
                    height="600px"
                    extensions={[javascript({ jsx: true })]}
                    theme={'dark'}
                    onChange={(value, viewUpdate) => {
                      setCss(value);
                    }}
                  />
                </div>
              </div>
              {/* js section */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary border-t-4 flex items-center justify-center gap-3 px-4 py-2 border-t-gray-500">
                    <FaJs className="text-xl text-yellow-500" />
                    <p className="text-primaryText font-semibold">Js</p>
                  </div>
                </div>
                <div className="w-full px-2">
                  <CodeMirror
                    value={js}
                    height="600px"
                    extensions={[javascript({ jsx: true })]}
                    theme={'dark'}
                    onChange={(value, viewUpdate) => {
                      setJs(value);
                    }}
                  />
                </div>
              </div>
            </SplitPane>
          </SplitPane>
          {/* bottom result section */}
          <div className="bg-white" style={{ overflow: 'hidden', height: '100%' }}>
            <iframe
              title="Result"
              srcDoc={input}
              style={{ border: 'none', width: '100%', height: '100%' }}
            />
          </div>
        </SplitPane>
      </div>
    </div>
  );
};

export default NewProject;
