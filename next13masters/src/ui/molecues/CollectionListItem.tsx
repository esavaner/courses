import Link from 'next/link';
import { CollectionListItemFragment } from '@/gql/graphql';

type Props = {
  collection: CollectionListItemFragment;
};

export const CollectionListItem = ({ collection }: Props) => {
  return (
    <li>
      <Link href={`/collections/${collection.slug}`}>
        <article>
          <h1>{collection.name}</h1>
        </article>
      </Link>
    </li>
  );
};
