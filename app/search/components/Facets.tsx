'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Checkbox } from '@/ui/Checkbox';
import { ToggleButton } from '@/ui/ToggleButton';

const CATEGOEIS = [
  { label: 'کتاب', value: 73270 },
  { label: 'کیف', value: 73006 },
  { label: 'کفش', value: 73036 },
  { label: 'ساعت', value: 73354 },
];

export default function Facets() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [hasDelivery, setDelivery] = useState<boolean>(false);
  const [categories, setCategories] = useState<number[]>([]);

  useEffect(() => {
    setDelivery(searchParams.get('ready') === 'true');

    const cats = searchParams.get('categories')?.split(',');
    setCategories(
      cats?.length === 0 ? [] : (cats || []).map((cat) => Number(cat)),
    );
  }, [searchParams]);

  const handleDeliveryChange = () => {
    router.push(
      `/search${
        searchParams.has('categories')
          ? `?ready=${
              searchParams.get('ready') === 'false'
            }&categories=${searchParams.get('categories')}`
          : `?ready=${searchParams.get('ready') === 'false'}`
      }`,
    );
  };

  const handleCategoryChange = (value: number) => {
    const prevCats = searchParams.has('categories')
      ? (searchParams.get('categories') || '')
          .split(',')
          .map((cat) => Number(cat))
      : [];

    const newCats = prevCats.some((cat) => cat === value)
      ? prevCats.filter((prev) => prev !== value)
      : [...prevCats, value];

    router.push(
      `/search?ready=${searchParams.get('ready') === 'true'}${
        newCats.length > 0 ? `&categories=${newCats.join(',')}` : ''
      }`,
    );
  };

  return (
    <div>
      <div className="rounded-md border">
        <div className="border-b p-4">
          <p>جستجوی دقیق‌تر</p>
        </div>

        <div className="space-y-2 p-4">
          {CATEGOEIS.map((category) => (
            <Checkbox
              label={category.label}
              key={`category-${category.value}`}
              onChange={() => handleCategoryChange(category.value)}
              checked={categories.some((cat) => cat === category.value)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-md border p-4">
        <ToggleButton
          label="آماده ارسال"
          value={hasDelivery}
          onChange={handleDeliveryChange}
        />
      </div>
    </div>
  );
}
