import { useEffect } from "react";
import { actions } from "../actions";
import NewPost from "../components/post/NewPost";
import PostList from "../components/post/PostList";
import useAxios from "../hooks/useAxios";
import usePost from "../hooks/usePost";

const HomePage = () => {
  const { api } = useAxios();
  const { state, dispatch } = usePost();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchedPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          const sortedPosts = response.data.sort(
            (a, b) => new Date(b.createAt) - new Date(a.createAt)
          );
          dispatch({ type: actions.post.DATA_FETCHED, data: sortedPosts });
        }
      } catch (error) {
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchedPost();
  }, []);

  if (state?.loading) {
    return <div>We are working...</div>;
  }
  if (state?.error) {
    return <div>Error in fetching posts {state?.error?.message}</div>;
  }
  return (
    <>
      <NewPost />
      <PostList posts={state?.posts} />
    </>
  );
};

export default HomePage;
