import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";
import PostProvider from "../providers/PostProvider";
import ProfileProvider from "../providers/ProfileProvider";

export default function PrivateRoutes() {
  const { auth } = useAuth();
  return (
    <>
      {auth.authToken ? (
        <PostProvider>
          <ProfileProvider>
            <Header />
            <main>
              <div className="container">
                <Outlet />
              </div>
            </main>
          </ProfileProvider>
        </PostProvider>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
