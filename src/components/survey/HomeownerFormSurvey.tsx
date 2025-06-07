import React, { useState } from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRightIcon } from 'lucide-react';
import { FloatingInput } from '@/components/ui/input';

interface HomeownerFormSurveyProps {
  onNext: (details: { name: string; phone: string; email: string }) => void;
}

const HomeownerFormSurvey: React.FC<HomeownerFormSurveyProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ name, phone, email });
  };

  const isFormValid = name.trim() !== '' && phone.trim() !== '' && email.trim() !== '';

  return (
    <>
      <DialogHeader className="mb-7.5">
        <DialogTitle className="text-4xl md:text-5xl font-heading leading-none uppercase">ONE LAST THING...</DialogTitle>
        <p>Let's fill the form with the name:)</p>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4 mb-7.5 max-w-[440px]">
        <fieldset className="mb-7.5 space-y-5 md:space-y-7.5">
          <FloatingInput id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FloatingInput id="phone" label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <FloatingInput id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </fieldset>
        <button type="submit" disabled={!isFormValid} className="survey-button w-full disabled:opacity-50">
          GET MY CHECKLIST
        </button>
      </form>
    </>
  );
};

export default HomeownerFormSurvey;
