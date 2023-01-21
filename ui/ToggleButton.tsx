'use client';

import styled from 'styled-components';
import React, { ComponentProps, ReactElement } from 'react';

export function ToggleButton({
  name,
  label,
  value,
  onChange,
  ...inputProps
}: Omit<ComponentProps<'input'>, 'onChange' | 'value'> & {
  label: string;
  value: boolean;
  onChange: (e: boolean) => void;
}): ReactElement {
  return (
    <MainContainer>
      {label}
      <div
        onClick={() => onChange(!value)}
        className="relative w-12 cursor-pointer"
      >
        <input
          {...inputProps}
          type="checkbox"
          checked={!!value}
          className="sr-only"
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="track block h-6 w-12 rounded-full bg-gray-600 bg-opacity-30" />
        <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition" />
      </div>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input:checked ~ .dot {
    transform: translateX(160%);
  }

  input:checked ~ .track {
    background: rgba(220, 38, 38, 1);
  }
`;
