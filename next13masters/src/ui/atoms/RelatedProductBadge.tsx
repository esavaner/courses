import { formatPrice } from '../../utils';
import { type ProductListItemFragment } from '@/gql/graphql';

type Props = {
  product: ProductListItemFragment;
};

export const RelatedProductBadge = ({ product: { price, name } }: Props) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl">{name}</h2>
      <h3 className="mt-2">{formatPrice(price)}</h3>
    </div>
  );
};
