import { getCollectionBySlug } from '@/api/collections';
import { ProductList } from '@/ui/organisms/ProductList';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    collectionSlug: string;
  };
};

export const generateMetadata = async ({
  params: { collectionSlug },
}: Props): Promise<Metadata> => {
  const collection = await getCollectionBySlug(collectionSlug);
  return {
    title: `${collection?.name}`,
  };
};

export default async function CollectionsPage({ params: { collectionSlug } }: Props) {
  const collection = await getCollectionBySlug(collectionSlug);

  if (!collection?.products) {
    notFound();
  }

  return (
    <main>
      <h1>{collection.name}</h1>
      <ProductList products={collection.products} />
    </main>
  );
}
