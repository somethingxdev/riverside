import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'; // Assuming you might want these for consistency
import { FloatingInput } from '@/components/ui/input';
import { ArrowRightIcon } from 'lucide-react';
interface ContractorFormSurveyProps {
  onNext: (details: { name: string; phone: string; email: string }) => void;
}

const ContractorFormSurvey: React.FC<ContractorFormSurveyProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="text-4xl md:text-5xl font-heading leading-none uppercase">YOU NEED A PARTNER YOU CAN RELY ON TO HELP YOU SCALE YOUR BUSINESS</DialogTitle>
      </DialogHeader>

      <div className="max-w-[440px]">
        <ul className="mb-5 space-y-1 text-sm md:text-base">
          <li className="flex items-center">
            <span className="text-primary mr-2">✔</span> Top-Quality Products
          </li>
          <li className="flex items-center">
            <span className="text-primary mr-2">✔</span> 100% Locally Owned
          </li>
          <li className="flex items-center">
            <span className="text-primary mr-2">✔</span> Guaranteed On-Time Delivery, Every Time
          </li>
          <li className="flex items-center">
            <span className="text-primary mr-2">✔</span> Exclusive Contractor Discounts
          </li>
        </ul>

        <p className="mb-7 text-sm md:text-base">Before we give you some tips, lets put a name to you.</p>

        <div className="space-y-5 mb-7.5">
          <FloatingInput id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FloatingInput id="phone" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <FloatingInput id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button onClick={() => onNext({ name, phone, email })} disabled={name === '' || phone === '' || email === ''} className="survey-button w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          NEXT <ArrowRightIcon size={20} />
        </button>
      </div>
    </>
  );
};

export default ContractorFormSurvey;
