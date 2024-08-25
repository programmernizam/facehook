import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        );
        setUser(response?.data?.user);
        setPost(response?.data?.posts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  if (loading) {
    return <div>Fetching Profile Data...</div>;
  }

  return (
    <div>
      Welcome {user?.firstName} {user?.lastName}
      <p>You have {post.length} posts.</p>
    </div>
  );
};

export default ProfilePage;
