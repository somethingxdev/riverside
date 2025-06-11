import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRightIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

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
    const selectedLabels = selectedOptions
      .map((id) => {
        const option = REPAIR_OPTIONS.find((option) => option.id === id);
        return option?.label;
      })
      .filter((label): label is string => !!label);
    onNext(selectedLabels);
  };

  return (
    <>
      <DialogHeader className="mb-6">
        <DialogTitle className="text-4xl md:text-5xl font-heading leading-none uppercase">WHAT ARE YOU LOOKING TO DO?</DialogTitle>
      </DialogHeader>
      <div className="space-y-3 mb-6">
        {REPAIR_OPTIONS.map((option) => (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox id={option.id} name={option.id} checked={selectedOptions.includes(option.id)} onCheckedChange={() => handleCheckboxChange(option.id)} />
            <label className="text-sm md:text-base" htmlFor={option.id}>
              {option.label}
            </label>
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
