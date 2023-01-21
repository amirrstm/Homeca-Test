'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/ui/Input';

const Header: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (searchParams.has('q')) {
      setSearchValue(searchParams.get('q') as string);
    }
  }, []);

  const handleInputSubmit = (value: string) => {
    if (value) {
      router.push(`/search?q=${value}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <div className="p-4 shadow-sm">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-4">
        <div className="border-l pl-4">
          <Image
            width={48}
            height={48}
            alt="main-logo"
            src="/images/logo.svg"
          />
        </div>

        <div className="min-w-[320px]">
          <Input
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={handleInputSubmit}
            placeholder="در اینجا جتسجو کنید"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
