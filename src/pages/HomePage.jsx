import { useEffect, useReducer } from "react";
import { actions } from "../actions";
import PostList from "../components/post/PostList";
import useAxios from "../hooks/useAxios";
import { initialState, postReducer } from "../reducers/PostReducer";

const HomePage = () => {
  const { api } = useAxios();
  const [state, dispatch] = useReducer(postReducer, initialState);

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchedPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );
        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
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
      <PostList posts={state?.posts} />
    </>
  );
};

export default HomePage;
