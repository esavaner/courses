import { PostItem } from "./PostItem";

type Props = {
  posts?: any[];
  admin?: boolean;
};
export const PostFeed = ({ posts, admin }: Props) => {
  return (
    <>
      {posts
        ? posts.map((post) => (
            <PostItem key={post.slug} post={post} admin={admin} />
          ))
        : null}
    </>
  );
};
