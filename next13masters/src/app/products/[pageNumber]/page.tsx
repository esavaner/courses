import { getProductsCount, getProductsList } from '@/api/products';
import { Pagination } from '@/ui/molecues/Pagination';
import { ProductList } from '@/ui/organisms/ProductList';

type Props = {
  params: {
    pageNumber: string;
  };
};

const PRODUCTS_PER_PAGE = 8;

export default async function ProductsPage({ params: { pageNumber } }: Props) {
  const count = await getProductsCount();
  const pageCount = Math.ceil(count / PRODUCTS_PER_PAGE);
  const products = await getProductsList(
    PRODUCTS_PER_PAGE,
    (parseInt(pageNumber) - 1) * PRODUCTS_PER_PAGE,
  );

  return (
    <main>
      <ProductList products={products} />
      <Pagination pageCount={pageCount} link="/products" />
    </main>
  );
}
