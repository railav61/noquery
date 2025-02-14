import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="text-center flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Our query resolving platform
      </h1>
      <p className="mb-4">Find the best solutions here.</p>
      {user &&
        !user.isAdmin &&(
          <Link
            to="/query"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Query
          </Link>
        )}
      {!user && (
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
      )}
      {user && user.isAdmin && (
        <Link
          to="/admin"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Admin DashBoard
        </Link>
      )}
    </div>
  );
}

export default Home;
