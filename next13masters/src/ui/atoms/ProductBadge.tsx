import { formatPrice } from '../../utils';
import { type ProductListItemFragment } from '@/gql/graphql';

type Props = {
  product: ProductListItemFragment;
};

export const ProductBadge = ({ product: { categories, price, name, rating } }: Props) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl">{name}</h1>
      <span className="text-xs">{categories?.[0]?.name}</span>
      <div>
        <span className="text-xs">Rating: </span>
        <span className="text-xs" data-testid="product-rating">
          {rating}
        </span>
      </div>

      <span className="mt-2" data-testid="product-price">
        {formatPrice(price)}
      </span>
    </div>
  );
};
