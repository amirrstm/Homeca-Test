import Image from 'next/image';
import React from 'react';

const EmptyProducts: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        width={200}
        height={200}
        alt="empty-image"
        src={'/images/empty.svg'}
      />

      <div className="pt-4">
        <p>نتیجه‌ای برای این جستجو یافت نشد.</p>
      </div>
    </div>
  );
};

export default EmptyProducts;
