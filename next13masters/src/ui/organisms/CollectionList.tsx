import { CollectionListItemFragment } from '@/gql/graphql';
import { CollectionListItem } from '../molecues/CollectionListItem';

type Props = {
  collections: CollectionListItemFragment[];
};

export const CollectionList = ({ collections }: Props) => {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {collections.map((collection) => (
        <CollectionListItem key={collection.id} collection={collection} />
      ))}
    </ul>
  );
};
