import * as React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, className, ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`pl-2 pr-2 border border-transparent focus:border focus:border-blue-500 rounded focus:outline-none ${className}`}
      {...props}
    />
  );
};

export { TextInput };
