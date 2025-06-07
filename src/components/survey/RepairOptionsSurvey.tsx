import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRightIcon } from 'lucide-react';

interface RepairOptionsSurveyProps {
  onNext: (selectedOptions: string[]) => void;
}

const REPAIR_OPTIONS = [
  { id: 'fix_problem', label: 'Fix a problem (e.g., leaks, damage)' },
  { id: 'get_quote', label: 'Get a quote for roofing materials' },
  { id: 'find_contractor', label: 'Find a Riverside Trusted Contractor ®' },
  { id: 'talk_specialist', label: 'Talk with a product specialist' },
  { id: 'other', label: 'Other...' }
];

const RepairOptionsSurvey: React.FC<RepairOptionsSurveyProps> = ({ onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (optionId: string) => {
    setSelectedOptions((prevSelected) => (prevSelected.includes(optionId) ? prevSelected.filter((id) => id !== optionId) : [...prevSelected, optionId]));
  };

  const handleSubmit = () => {
    onNext(selectedOptions);
  };

  return (
    <>
      <DialogHeader className="mb-6">
        <DialogTitle className="text-3xl md:text-5xl font-heading leading-tight">WHAT ARE YOU LOOKING TO DO?</DialogTitle>
      </DialogHeader>
      <div className="space-y-3 mb-6">
        {REPAIR_OPTIONS.map((option) => (
          <div key={option.id} className="flex items-center">
            <input type="checkbox" id={option.id} name={option.id} checked={selectedOptions.includes(option.id)} onChange={() => handleCheckboxChange(option.id)} className="size-4 md:size-5  border-gray-300 rounded focus:ring-primary mr-3" />
            <label className='text-sm md:text-base' htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={selectedOptions.length === 0} className="survey-button w-full flex justify-center items-center gap-2 disabled:opacity-50">
        NEXT
        <ArrowRightIcon size={20} />
      </button>
    </>
  );
};

export default RepairOptionsSurvey;
