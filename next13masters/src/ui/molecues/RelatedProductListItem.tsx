import Link from 'next/link';
import { ImageContainer } from '../atoms/ImageContainer';
import { RelatedProductBadge } from '../atoms/RelatedProductBadge';
import { type ProductListItemFragment } from '@/gql/graphql';

type Props = {
  product: ProductListItemFragment;
};

export const RelatedProductListItem = ({ product }: Props) => {
  return (
    <li>
      <Link href={`/product/${product.id}`}>
        <article>
          {product?.images?.[0] && (
            <ImageContainer url={product.images[0].url} alt={product.name} />
          )}
          <RelatedProductBadge product={product} />
        </article>
      </Link>
    </li>
  );
};
