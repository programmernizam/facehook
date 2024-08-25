import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h2>Home Page</h2>
      <Link to={"/me"}>Profile</Link>
    </>
  );
};

export default HomePage;
