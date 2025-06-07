import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface HomeownerChecklistSurveyProps {
  onBack: () => void;
  onClose?: () => void; // Optional: if you want a specific close action from this component
  projectType?: 'Repair' | 'New Construction';
  uploadedPdfFileExists?: boolean;
}

const HomeownerChecklistSurvey: React.FC<HomeownerChecklistSurveyProps> = ({ onBack, onClose, projectType, uploadedPdfFileExists }) => {
  return (
    <>
      <DialogHeader className="mb-6 pt-12 md:pt-0">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 font-semibold leading-none">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.94366e-08 7L11.25 13.4952L11.25 0.504809L8.94366e-08 7Z" fill="#313131" />
          </svg>
          BACK
        </button>
        <DialogTitle className="text-3xl md:text-5xl font-heading leading-tight">YOUR PERSONALIZED CHECKLIST</DialogTitle>
      </DialogHeader>
      <div className="space-y-5 mb-5 text-sm">
        <div className="flex items-start gap-4">
          <span className="text-secondary font-semibold">01</span>
          <div>
            <h3 className="font-semibold mb-3">FIND A GOOD CONTRACTOR</h3>
            <p className="mb-2">Be confident that your contractor:</p>
            <ul className="list-disc list-inside pl-4 space-y-1 mb-2">
              <li>Is a trusted local specialist (licensed & insured) in your area.</li>
              <li>Has workers' compensation insurance.</li>
              <li>Carries general liability coverage.</li>
            </ul>
            <p className="mb-5">We don't provide roofing services, but we would like to recommend a few companies to you that do a quality job.</p>
            <p className="font-semibold mt-2 underline underline-offset-4">RIVERSIDE TRUSTED CONTRACTOR</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-secondary font-semibold">02</span>
          <div>
            <h3 className="font-semibold mb-3">GET A ROOFING CALCULATION</h3>
            {projectType === 'Repair' || (projectType === 'New Construction' && uploadedPdfFileExists) ? (
              <>
                <p className="mb-2">We recommend EagleView:</p>
                <a href="https://myev.eagleview.com/place-order" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://myev.eagleview.com/place-order
                </a>
              </>
            ) : projectType === 'New Construction' && !uploadedPdfFileExists ? (
              <p className="mb-2">Bring your plan to our office.</p>
            ) : (
              <p className="mb-2">Please contact us for calculation options.</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-secondary font-semibold">03</span>
          <div>
            <h3 className="font-semibold mb-3">03 PICK YOUR ROOFING MATERIALS</h3>
            <p className="mb-2">Visit the Riverside roofing showroom to touch and see in-person.</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-secondary font-semibold">04</span>
          <div>
            <h3 className="font-semibold mb-3">04 COORDINATE DELIVERY</h3>
            <ul className="list-disc list-inside pl-4 space-y-1 text-gray-700">
              <li>Get your materials delivered on-time, not to early not to late.</li>
              <li>We won't block your driveway.</li>
            </ul>
          </div>
        </div>
      </div>

      <button onClick={onClose} className="survey-button text-sm md:text-base w-full md:w-auto">
        NEED ANY HELP WITH THIS? CALL US NOW
      </button>
    </>
  );
};

export default HomeownerChecklistSurvey;
