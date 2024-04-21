import { getCollectionList } from '@/api/collections';
import { getProductsList } from '@/api/products';
import { CollectionList } from '@/ui/organisms/CollectionList';
import { ProductList } from '@/ui/organisms/ProductList';

export default async function Home() {
  const products = await getProductsList();
  const collections = await getCollectionList();

  return (
    <main>
      <CollectionList collections={collections} />
      <ProductList products={products} />
    </main>
  );
}
