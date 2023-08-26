import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = useSelector((state) => state.projects);
  return (
    <div className="w-full py-6 flex items-center gap-6 justify-center flex-wrap">
      {projects &&
        Object.values(projects).map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  console.log(index, project);
  return (
    <motion.div
      key={index}
      className="w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4"
    >
      <div
        className="bg-primary w-full h-full rounded-md overflow-hidden"
        style={{ overflow: 'hidden', height: '100%' }}
      >
        <iframe
          title="Result"
          srcDoc={project.code}
          style={{ border: 'none', width: '100%', height: '100%' }}
        />
      </div>

      <div className="flex items-center justfy-start gap-3 w-full">
        {/* user image */}
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-400 cursor-pointer overflow-hidden">
          {project?.user?.photoURL ? (
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={project?.user?.photoURL}
              alt={project?.user?.displayName}
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-white capitalize font-semibold text-2xl">
              {project?.user?.email?.charAt(0)}
            </p>
          )}
        </div>
        {/* project title & user name */}
        <div>
          <p className="text-white text-lg capitalize">{project?.title}</p>
          <p className="text-primaryText text-sm capitalize">
            {project?.user?.displayName
              ? project?.user?.displayName
              : `${project?.user?.email.split('@')[0]}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
