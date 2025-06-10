import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FloatingInput } from '@/components/ui/input';
import { ArrowRightIcon } from 'lucide-react';

interface IFormInput {
  name: string;
  phone: string;
  email: string;
}

interface ContractorFormSurveyProps {
  onNext: (details: IFormInput) => void;
}

const ContractorFormSurvey: React.FC<ContractorFormSurveyProps> = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onNext(data);
  };

  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="text-4xl md:text-5xl font-heading leading-none uppercase">YOU NEED A PARTNER YOU CAN RELY ON TO HELP YOU SCALE YOUR BUSINESS</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[440px]">
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

        <fieldset className="space-y-5 mb-7.5">
          <FloatingInput
            id="name"
            label="Name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name}
          />
          <FloatingInput
            id="phone"
            label="Phone"
            type="tel"
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^(\+?[\d\s()-]+)$/,
                message: 'Invalid phone number format',
              },
            })}
            error={errors.phone}
          />
          <FloatingInput
            id="email"
            label="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email}
          />
        </fieldset>

        <button type="submit" disabled={!isValid} className="survey-button w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          NEXT <ArrowRightIcon size={20} />
        </button>
      </form>
    </>
  );
};

export default ContractorFormSurvey;
