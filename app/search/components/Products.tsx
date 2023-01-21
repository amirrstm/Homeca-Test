'use client';

import EmptyProducts from '@/ui/EmptyProducts';
import ProductCard from '@/ui/ProductCard';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { getProducts } from 'services/product.service';

const Products = () => {
  const searchParams = useSearchParams();
  const [pageFrom, setPageFrom] = useState(0);
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: [
      'get-products',
      searchParams.get('q'),
      searchParams.get('ready'),
      searchParams.get('categories'),
    ],
    queryFn: ({ pageParam = 0 }) =>
      getProducts(
        {
          q: searchParams.get('q')
            ? (searchParams.get('q') as string)
            : undefined,
          isReady: searchParams.get('ready')
            ? (searchParams.get('ready') as string)
            : undefined,
          namedTags: searchParams.get('categories')
            ? (searchParams.get('categories') as string)
            : undefined,
        },
        pageParam,
      ),
  });

  useEffect(() => {
    if (data?.pageParams) {
      setPageFrom(
        (data?.pageParams[data.pageParams.length - 1] as number) / 24,
      );
    }

    if (localStorage.getItem('pageOffset')) {
      window.scrollTo(0, Number(localStorage.getItem('pageOffset')));
    }
  }, []);

  useEffect(() => {
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPageFrom((prev) => prev + 1);
        fetchNextPage({ pageParam: (pageFrom + 1) * 24 });
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [pageFrom]);

  console.log(data);

  return (
    <>
      {isLoading && !data && (
        <div className="flex h-56 w-full items-center justify-center">
          <Image
            width={100}
            height={100}
            alt="image-loader"
            src="/images/loader.gif"
          />
        </div>
      )}

      {!isLoading && data && (
        <div className="grid grid-cols-9 gap-3">
          {data.pages.map((group) => (
            <Fragment>
              {group.products.length === 0 ? (
                <div className="col-span-9">
                  <EmptyProducts />
                </div>
              ) : (
                group.products.map((product) => (
                  <div className="col-span-3" key={`product-${product.id}`}>
                    <ProductCard
                      title={product.title}
                      image={product.image}
                      subtitle={product.category}
                      bottomText={product.status}
                      description={product.vendor}
                    />
                  </div>
                ))
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
