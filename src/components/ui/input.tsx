import React, { forwardRef } from 'react';
import { type FieldError } from 'react-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const FloatingInput = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => {
  return (
    <div className="relative">
      <input ref={ref} className={`block py-2.5 px-0 w-full bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 peer ${error ? 'border-red-500' : ''} ${className}`} placeholder="" {...props} />
      <label  htmlFor={props.id}  className={`absolute duration-300  transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:text-gray-400 peer-placeholder-shown:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto`}>
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
});

FloatingInput.displayName = 'FloatingInput';

export { FloatingInput };
