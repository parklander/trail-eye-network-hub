
import React from "react";

interface ProjectContextBarProps {
  projectName: string;
}

const ProjectContextBar: React.FC<ProjectContextBarProps> = ({ projectName }) => (
  <div className="w-full bg-accent/50 rounded-md px-4 py-2 mb-4 flex items-center text-base font-medium text-accent-foreground shadow border border-accent">
    Project: <span className="ml-2 font-semibold">{projectName}</span>
  </div>
);

export default ProjectContextBar;
