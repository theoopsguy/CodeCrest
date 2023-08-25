import React from 'react';
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa6';
import { FcSettings } from 'react-icons/fc';
import SplitPane from 'react-split-pane';
const NewProject = () => {
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
              <div>Code mirror</div>
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
                <div>Code mirror</div>
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
                <div>Code mirror</div>
              </div>
            </SplitPane>
          </SplitPane>
          {/* bottom result section */}
          <div></div>
        </SplitPane>
      </div>
    </div>
  );
};

export default NewProject;
