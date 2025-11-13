type InputTextProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
};

export function InputText({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  maxLength,
}: InputTextProps) {
  return (
    <div>
      <label
        htmlFor={label}
        className='mb-1 ml-4 block text-sm font-medium text-[#1D3557]'
      >
        {label}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        maxLength={maxLength}
        className='w-full rounded-full bg-[#A8DADC] px-6 py-3 text-[#1D3557] placeholder-[#1D3557] placeholder-opacity-70 outline-none transition-all focus:ring-2 focus:ring-[#1D3557]'
      />
    </div>
  );
}

type InputCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function InputCheckbox({
  label,
  checked,
  onChange,
}: InputCheckboxProps) {
  return (
    <label
      htmlFor={label}
      className='flex items-center justify-start gap-2 rounded-full bg-[#A8DADC] px-6 py-3 font-medium text-[#1D3557]'
    >
      <input
        id={label}
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className='h-5 w-5 rounded text-[#1D3557] focus:ring-[#1D3557]'
      />
      {label}
    </label>
  );
}
