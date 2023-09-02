import React, { useEffect, useState } from 'react';
import { FaCss3, FaHtml5, FaJs } from 'react-icons/fa6';
import SplitPane from 'react-split-pane';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { motion } from 'framer-motion';
import { Logo } from '../assets';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfileDetails from '../components/UserProfileDetails';

const ExistingProject = () => {
  const project = useSelector((state) => state.projectContent);
  const [html, setHtml] = useState(project?.html);
  const [css, setCss] = useState(project?.css);
  const [js, setJs] = useState(project?.js);
  const [input, setInput] = useState(project?.code);

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

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
      {/* header */}
      <header className="w-full flex items-center justify-between px-12 py-4">
        <div className="flex items-center justify-center gap-6">
          <Link to={'/home/projects'}>
            <img className="w-32 h-auto object-contain" src={Logo} alt="logo" />
          </Link>
          <div className="flex items-start justify-start flex-col">
            {/* title */}
            <div className="flex items-center justify-center gap-3">
              <motion.p key={'titleDisplay'} className="px-3 py-2 text-white text-lg">
                {project?.title}
              </motion.p>
            </div>
            <div className="flex items-center justify-center gap-2 px-3 -mt-2">
              <p className="text-primaryText text-sm">
                {project?.user?.displayName
                  ? project?.user?.displayName
                  : `${project?.user?.email.split('@')[0]}`}
              </p>
            </div>
          </div>
        </div>
        {/* user area */}
        <div className="flex items-center justify-center gap-4">
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
                  value={project?.html}
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
                    value={project?.css}
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
                    value={project?.js}
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

export default ExistingProject;
