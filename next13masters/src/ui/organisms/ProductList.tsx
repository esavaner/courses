'use client';

import { ProductListItem } from '../molecues/ProductListItem';
import { type ProductListItemFragment } from '@/gql/graphql';
import { useState } from 'react';
import { SortByRating } from '../molecues/SortByRating';
import { SortByPrice } from '../molecues/SortByPrice';

type Props = {
  products: ProductListItemFragment[];
};

export const ProductList = ({ products }: Props) => {
  const [sortPrice, setSortPrice] = useState<string>();
  const [sortRating, setSortRating] = useState<string>();

  const sortedProducts = products
    .sort((a, b) => {
      if (sortPrice === 'price_ASC') {
        return a.price - b.price;
      }
      if (sortPrice === 'price_DESC') {
        return b.price - a.price;
      }
      return 0;
    })
    .sort((a, b) => {
      if (sortRating === 'rating_ASC') {
        return a.rating && b.rating ? a.rating - b.rating : 0;
      }
      if (sortRating === 'rating_DESC') {
        return a.rating && b.rating ? b.rating - a.rating : 0;
      }
      return 0;
    });

  return (
    <>
      <SortByPrice handleSort={(value) => setSortPrice(value)} />
      <SortByRating handleSort={(value) => setSortRating(value)} />
      <ul
        data-testid="products-list"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {sortedProducts.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
};
