import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";

export default function PrivateRoutes() {
  const { auth } = useAuth();
  return (
    <>
      {auth.user ? (
        <main>
          <Header />
          <div className="container">
            <Outlet />
          </div>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
