import { getProductsBySearchQuery } from '@/api/products';
import { ProductList } from '@/ui/organisms/ProductList';

type Props = {
  searchParams: {
    query?: string;
  };
};

export default async function SearchPage({ searchParams: { query } }: Props) {
  const products = await getProductsBySearchQuery(query || '');
  return <ProductList products={products} />;
}
