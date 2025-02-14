import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Query = () => {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const API_BASE_URL = `${API_URL}/queries`;
  const token = localStorage.getItem("token");

  // Fetch user's queries
  useEffect(() => {
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
    fetchQueries();
  }, [API_BASE_URL, token]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit a new query
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(API_BASE_URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: "", email: "", subject: "", message: "" }); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit query");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{`Hey ${user.username} manage your queries here ...`}</h1>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Query Form */}
      <form className="mb-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            required
            className="p-2 border rounded"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Query"
            required
            className="p-2 border rounded col-span-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Query
        </button>
      </form>

      {/* Queries List */}
      {/* {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Subject</th>
              <th className="border border-gray-300 p-2">Message</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query) => (
              <tr key={query._id}>
                <td className="border border-gray-300 p-2">{query.subject}</td>
                <td className="border border-gray-300 p-2">{query.message}</td>
                <td className="border border-gray-300 p-2">{query.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
      <Link to="/yourqueries">
        <Button variant="contained">See Your Queries</Button>
      </Link>
    </div>
  );
};

export default Query;
