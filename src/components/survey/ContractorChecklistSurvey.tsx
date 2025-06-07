import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ContractorChecklistSurveyProps {
  onNext: (selectedOptions: string[]) => void;
}

const checklistOptions = [
  { id: 'quality', label: 'Quality Products' },
  { id: 'consultation', label: 'Professional Consultation' },
  { id: 'delivery', label: 'On-Time Delivery' },
  { id: 'pricing', label: 'Material Pricing' },
  { id: 'trusted', label: 'Become a Trusted Contractor ®' },
  { id: 'other', label: 'Other...' }
];

const ContractorChecklistSurvey: React.FC<ContractorChecklistSurveyProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckboxChange = (optionId: string) => {
    setSelected((prevSelected) => (prevSelected.includes(optionId) ? prevSelected.filter((id) => id !== optionId) : [...prevSelected, optionId]));
  };

  const handleSubmit = () => {
    onNext(selected);
  };

  return (
    <>
      <DialogHeader className="mb-6">
        <DialogTitle className="text-3xl md:text-5xl font-heading leading-tight">WHAT MATTERS MOST TO YOU?</DialogTitle>
      </DialogHeader>

      <div className="space-y-3 mb-8">
        {checklistOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <input type="checkbox" id={`survey-checklist-${option.id}`} checked={selected.includes(option.id)} onChange={() => handleCheckboxChange(option.id)} className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
            <label htmlFor={`survey-checklist-${option.id}`} className="text-sm font-medium leading-none">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={selected.length === 0} className="survey-button disabled:opacity-50 disabled:cursor-not-allowed">
        GET MY CHECKLIST
      </button>
    </>
  );
};

export default ContractorChecklistSurvey;
