import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FloatingInput } from '@/components/ui/input';

type FormData = {
  name: string;
  lastName: string;
  employment: string;
  reason: string;
  email: string;
};

const AboutModal = ({ children }: { children: React.ReactNode }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/send-about-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.error || 'Failed to submit application. Please try again.');
        setIsSubmitted(false); // Ensure form is not hidden if there was an error
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
      setIsSubmitted(false); // Ensure form is not hidden if there was an error
    }
    setIsSubmitting(false);
  };
  return (
    <Dialog>
      <DialogTrigger className="w-full lg:w-[355px] h-12.5 lg:h-15 px-4 py-2 text-base bg-primary text-white hover:bg-primary/90  focus-visible:outline-primary inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold whitespace-nowrap uppercase">
        Apply Today
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="max-w-[500px] lg:max-w-[750px] max-h-[800px] hidden lg:block h-full">{children}</div>
          <div className="p-10">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl md:text-5xl font-heading">Thank you for your INTEREST!</DialogTitle>
              <DialogDescription className="max-w-[440px] text-sm sm:text-base">To allow us to contact you and consider your candidacy, please leave your contact information.</DialogDescription>
            </DialogHeader>

            {isSubmitted ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-primary mb-2">Application Submitted!</h3>
                <p>Thank you for your interest. We will contact you shortly.</p>
              </div>
            ) : submitError ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-red-600 mb-2">Submission Failed</h3>
                <p>{submitError}</p>
                <button 
                  onClick={() => { setSubmitError(null); /* Don't reset isSubmitted here, allow form to show */ }}
                  className="mt-4 px-4 py-2 text-base bg-primary text-white hover:bg-primary/90 rounded-xl font-semibold"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-[440px]">
                <FloatingInput {...register('name', { required: 'Name is required' })} id="name" label="Name" error={errors.name} />

                <FloatingInput {...register('lastName', { required: 'Last name is required' })} id="lastName" label="Last Name" error={errors.lastName} />

                <FloatingInput {...register('employment')} id="employment" label="Previous/Current Employment" />

                <FloatingInput {...register('reason')} id="reason" label="Why would you like to Join Riverside Roofing Materials" />

                <FloatingInput
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  id="email"
                  label="Email"
                  type="email"
                  error={errors.email}
                />

                <DialogFooter className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12.5 md:h-15 transition-colors px-4 py-2 text-base bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary inline-flex items-center justify-center gap-1.5 rounded-xl font-semibold whitespace-nowrap uppercase disabled:opacity-50"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND'}
                  </button>
                </DialogFooter>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
