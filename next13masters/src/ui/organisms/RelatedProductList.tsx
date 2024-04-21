import { RelatedProductListItem } from '../molecues/RelatedProductListItem';
import { type ProductListItemFragment } from '@/gql/graphql';

type Props = {
  products: ProductListItemFragment[];
};

export const RelatedProductList = ({ products }: Props) => {
  return (
    <ul
      data-testid="related-products"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((product) => (
        <RelatedProductListItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
