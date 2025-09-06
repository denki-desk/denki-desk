import { ComponentProps, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ ...props }, ref) => {
    return (
      <div className="s-base">
        <div className="!flex justify-between s-label w-full gap-1">
          <label className="truncate flex items-center gap-1">
            {props.title}
            {props.required ? ' *' : ''}
          </label>
        </div>
        <input ref={ref} className="s-input" {...props} />
      </div>
    );
  }
);

Input.displayName = 'Input';
