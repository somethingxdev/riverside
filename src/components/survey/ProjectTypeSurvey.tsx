import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectTypeSurveyProps {
  onNext: (answer: string) => void;
}

const ProjectTypeSurvey: React.FC<ProjectTypeSurveyProps> = ({ onNext }) => {
  return (
    <>
      <DialogHeader className="mb-6">
        <DialogTitle className="text-3xl md:text-5xl font-heading leading-tight text-center lg:text-left">WHAT TYPE OF PROJECT ARE YOU PLANNING?</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
        <button onClick={() => onNext('Repair')} className="survey-button w-full md:w-1/2">
          REPAIR
        </button>
        <button onClick={() => onNext('New Construction')} className="survey-button w-full md:w-1/2">
          NEW CONSTRUCTION
        </button>
      </div>
    </>
  );
};

export default ProjectTypeSurvey;
