import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import AdminCard from "../components/AdminCard";

function Viewqueries() {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const API_BASE_URL = `${API_URL}/queries`;
  const token = localStorage.getItem("token");
  const fetchQueries = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQueries(res.data);

      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const updateStatus = async (e, _id) => {
    try {
      const status = e.target.value;
      const res = await axios.put(
        `${API_BASE_URL}/status/${_id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchQueries();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
      setLoading(false);
    }
  };

  const updateSolution = async (_id, solution) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/solution/${_id}`,
        { solution },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchQueries();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
      setLoading(false);
    }
  };

  const updateDelete = async (_id, isDeleted) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/admin/delete/${_id}`,
        { isDeleted },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchQueries();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch queries");
      setLoading(false);
    }
  };
  return (
    <>
      {queries.length > 0 ? (
        <div className="sm:p-16 p-0">
          {queries.map((query) => (
            <AdminCard
              key={query._id}
              query={query}
              updateStatus={updateStatus}
              updateSolution={updateSolution}
              updateDelete={updateDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-black text-2xl">No queries</p>
      )}
    </>
  );
}

export default Viewqueries;
