'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

type Props = {
  title: string;
  image: string;
  subtitle: string;
  bottomText: string;
  description: string;
};
const ProductCard: React.FC<Props> = ({
  title,
  image,
  subtitle,
  bottomText,
  description,
}) => {
  const handleProductClick = () => {
    localStorage.setItem('pageOffset', String(window.pageYOffset));
  };

  return (
    <Link href={'/product'} passHref>
      <a onClick={handleProductClick}>
        <article className="flex justify-between gap-2 rounded-md border p-4">
          <div className="flex h-[120px] max-w-[170px] flex-col justify-between">
            <h2 className="text-base line-clamp-2">{title}</h2>

            <div className="text-xs leading-5 text-slate-500">
              <p className="line-clamp-1">{subtitle}</p>
              <p className="line-clamp-1">{description}</p>
              <span className="text-xs">{bottomText}</span>
            </div>
          </div>

          <ProductImage className="rounded-md">
            <Image
              alt={title}
              src={image}
              width={120}
              height={120}
              style={{ objectFit: 'cover' }}
            />
          </ProductImage>
        </article>
      </a>
    </Link>
  );
};

export default ProductCard;

const ProductImage = styled.div`
  overflow: hidden;
  flex: 0 0 120px;
  height: 120px;
`;
