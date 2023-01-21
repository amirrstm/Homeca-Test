import clsx from 'clsx';
import React, { KeyboardEvent } from 'react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

type Props = {
  value: string;
  placeholder?: string;
  onSubmit: (e: string) => void;
  onChange: (e: string) => void;
};

export const Input: React.FC<Props> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value) {
      onSubmit(value);
    }
  };

  const handleClearSearch = () => {
    onChange('');
    onSubmit('');
  };

  return (
    <div
      className={clsx(
        'relative flex items-center gap-3 rounded border-2',
        'border-gray-200 bg-gray-200 px-4 text-gray-700',
        'focus-within:border-red-600 focus-within:bg-white',
      )}
    >
      <FiSearch className="text-xl" />

      <input
        type="text"
        value={value}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none  bg-transparent py-2 text-sm outline-none"
      />

      {value && (
        <div
          onClick={handleClearSearch}
          className="absolute left-2 top-2 cursor-pointer"
        >
          <FiXCircle />
        </div>
      )}
    </div>
  );
};
