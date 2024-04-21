import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { ProductList } from '@/ui/organisms/ProductList';
import { getProductsByCategorySlug } from '@/api/products';
import { Pagination } from '@/ui/molecues/Pagination';

type Props = {
  params: {
    category: string;
    pageNumber: string;
  };
};

// type CategoryProps = {
//   params: {
//     category: string;
//   };
// };

const PRODUCTS_PER_PAGE = 8;

export const generateMetadata = async ({ params: { category } }: Props): Promise<Metadata> => {
  return {
    title: `Categories - ${category}`,
  };
};

// export const generateStaticParams = async ({ params: { category } }: CategoryProps) => {
//   if (category === 't-shirts') {
//     return [{ pageNumber: '1' }, { pageNumber: '2' }];
//   } else {
//     return [{ pageNumber: '1' }];
//   }
// };

export default async function CategoryProductPage({ params: { category, pageNumber } }: Props) {
  const products = await getProductsByCategorySlug(
    category,
    PRODUCTS_PER_PAGE,
    (parseInt(pageNumber) - 1) * PRODUCTS_PER_PAGE,
  );
  if (!products) {
    notFound();
  }

  const pageCount = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <>
      <h1>Categories - {category}</h1>
      <ProductList products={products} />
      <Pagination pageCount={pageCount} link={`/categories/${category}`} />
    </>
  );
}
