import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import QueryCard from "../components/QueryCard";
import axios from "axios";

function Viewqueries() {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState({});
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const API_BASE_URL = `${API_URL}/queries`;
  const token = localStorage.getItem("token");

  const fetchQueries = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQueries(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
      setLoading(false);
    }
  };

  const updateLike = async (_id, isLiked) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/like/${_id}`,
        { isLiked },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLiked(res.data.liked);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <>
      {queries.length > 0 ? (
        <div className="sm:p-16 p-0">
          {queries.map((query) => (
            <QueryCard
              key={query._id}
              query={query}
              liked={liked}
              updateLike={updateLike}
            />
          ))}
        </div>
      ) : (
        <p>No queries</p>
      )}
    </>
  );
}

export default Viewqueries;
