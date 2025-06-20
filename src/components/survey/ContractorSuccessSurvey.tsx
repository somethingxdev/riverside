import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

const ContractorSuccessSurvey = () => {
  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="text-4xl md:text-5xl font-heading leading-none uppercase">STEPS FOR SUCCESS</DialogTitle>
      </DialogHeader>
      <p className="text-sm text-gray-600 mb-6 text-center lg:text-left">
        What you need to do to scale your roofing company. <br></br> Trust us, we've seen what works.
      </p>

      <div className="space-y-10 text-sm mb-8">
        <div>
          <h3 className="font-semibold mb-3 leading-none">STEP 1: SOURCE PREMIUM MATERIALS 🛍️</h3>
          <p className="ml-2">
            •{' '}
            <a href="#" className="font-bold italic">
              Visit
            </a>{' '}
            our office or give us a{' '}
            <a href="#" className="italic font-bold">
              call
            </a>{' '}
            for FAST catalog information & availability
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 leading-none">STEP 2: SECURE EXCLUSIVE CONTRACTOR PRICING 🏷️</h3>
          <p className="ml-2">
            •{' '}
            <a href="#" className="font-bold italic">
              Visit
            </a>{' '}
            Speak personally with the owner | Plan a{' '}
            <a href="#" className="italic font-bold">
              Visit
            </a>{' '}
            to the office
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 leading-none">STEP 3: PLAN HASSLE-FREE DELIVERY</h3>
          <p className="ml-2">
            • Items too early and too late cost you money.{' '}
            <a href="#" className="italic font-bold">
              Call
            </a>{' '}
            logistics.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 leading-none">STEP 4: GRAB QUICK PICKUPS IN 6 MINUTES</h3>
          <p className="ml-2">• Lighting FAST → Get back to work without delays.</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 leading-none">STEP 5: BUILD A TRUSTED PARTNERSHIP</h3>
          <p className="ml-2">• We give referrals to Riverside Trusted Contractors ®</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <a href="/products/" className="survey-button w-full text-center">
          GO TO CATALOG
        </a>
        <a href="/contact/" className="survey-button w-full text-center">
          CONTACT RIVERSIDE
        </a>
      </div>
    </>
  );
};

export default ContractorSuccessSurvey;
