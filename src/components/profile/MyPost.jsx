import { useProfile } from "../../hooks/useProfile";
import PostList from "../post/PostList";

export default function MyPost() {
  const { state } = useProfile();
  const posts = state?.posts;
  return (
    <>
      <PostList posts={posts} />
    </>
  );
}
