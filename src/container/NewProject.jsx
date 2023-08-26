import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa6';
import { FcSettings } from 'react-icons/fc';
import SplitPane from 'react-split-pane';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const NewProject = () => {
  const [html, setHtml] = useState('<!-- Simply enter the HTML body content here. -->');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [input, setInput] = useState('');

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
      {/* alert area */}

      {/* header */}

      {/* coding area */}

      <div>
        {/* horizontal */}
        <SplitPane split="horizontal" minSize={100} maxSize={-100} defaultSize={'50%'}>
          {/* top coding section */}
          <SplitPane split="vertical" minSize={300}>
            {/* html section */}
            <div className="w-full h-full flex flex-col items-start justify-start">
              <div className="w-full flex items-center justify-between">
                <div className="bg-secondary border-t-4 flex items-center justify-center gap-3 px-4 py-2 border-t-gray-500">
                  <FaHtml5 className="text-xl text-red-500" />
                  <p className="text-primaryText font-semibold">HTML</p>
                </div>

                {/* icons */}
                <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                  <FcSettings className="text-xl" />
                  <FaChevronDown className="text-xl text-primaryText" />
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
            <SplitPane split="vertical" minSize={300}>
              {/* css section */}
              <div className="w-full h-full flex flex-col items-start justify-start">
                <div className="w-full flex items-center justify-between">
                  <div className="bg-secondary border-t-4 flex items-center justify-center gap-3 px-4 py-2 border-t-gray-500">
                    <FaCss3 className="text-xl text-sky-500" />
                    <p className="text-primaryText font-semibold">CSS</p>
                  </div>

                  {/* icons */}
                  <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
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

                  {/* icons */}
                  <div className="cursor-pointer flex items-center justify-center gap-5 px-4">
                    <FcSettings className="text-xl" />
                    <FaChevronDown className="text-xl text-primaryText" />
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
