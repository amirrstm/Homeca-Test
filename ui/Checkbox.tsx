import { ComponentProps, forwardRef, ReactNode } from 'react';

type Props = ComponentProps<'input'> & { label?: ReactNode };
export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <div className="form-check">
        <label className="inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            ref={ref}
            className="h-4 w-4 rounded accent-red-600"
            {...props}
          />
          <span className="font-geometria mr-2">{label}</span>
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
