import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FloatingInput } from '@/components/ui/input';

interface IFormInput {
  name: string;
  phone: string;
  email: string;
}

interface HomeownerFormSurveyProps {
  onNext: (details: IFormInput) => void;
}

const HomeownerFormSurvey: React.FC<HomeownerFormSurveyProps> = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IFormInput>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onNext(data);
  };

  return (
    <>
      <DialogHeader className="mb-7.5">
        <DialogTitle className="text-4xl md:text-5xl font-heading leading-none uppercase">ONE LAST THING...</DialogTitle>
        <p>Let's fill the form with the name:)</p>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-7.5 max-w-[440px]">
        <fieldset className="mb-7.5 space-y-5 md:space-y-7.5">
          <FloatingInput id="name" label="Name" {...register('name', { required: 'Name is required' })} error={errors.name} />
          <FloatingInput
            id="phone"
            label="Phone"
            type="tel"
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^(\+?[\d\s()-]+)$/,
                message: 'Invalid phone number format'
              }
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
                message: 'Invalid email address'
              }
            })}
            error={errors.email}
          />
        </fieldset>
        <button type="submit" disabled={!isValid} className="survey-button w-full disabled:opacity-50">
          GET MY CHECKLIST
        </button>
      </form>
    </>
  );
};

export default HomeownerFormSurvey;
