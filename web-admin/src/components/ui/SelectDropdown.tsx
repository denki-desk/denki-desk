import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@denki-desk/ui/select';
import { Label as UILabel } from '@denki-desk/ui/label';
import { ComponentProps } from 'react';

type Primitive = string | number;

type Option<T extends Primitive = string> = T | { label: string; value: T };

type SelectDropdownProps<T extends Primitive = string> = ComponentProps<
  typeof Select
> & {
  options: Option<T>[];
  placeholder: string;
};

export function SelectDropdown<T extends Primitive = string>({
  options,
  placeholder,
  ...props
}: SelectDropdownProps<T>) {
  return (
    <div className="relative">
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            const value = typeof option === 'object' ? option.value : option;
            const label = typeof option === 'object' ? option.label : option;

            return (
              <SelectItem key={value.toString()} value={value.toString()}>
                {label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <UILabel className="absolute left-2 -top-2.5 bg-background px-1 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:left-2 peer-focus:text-xs">
        {placeholder}
      </UILabel>
    </div>
  );
}
