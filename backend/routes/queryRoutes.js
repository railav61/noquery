const express = require("express");
const Query = require("../models/Query");
const User = require("../models/User");

const router = express.Router();

// Create a new query
router.post("/", async (req, res) => {
  const { subject, message } = req.body;

  const user = await User.findById({ _id: req.userId });

  try {
    const query = await Query.create({
      userId: req.userId, 
      name: user.username,
      email: user.email,
      subject,
      message,
    });
    res.status(201).json({ message: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all queries for the logged-in user for admin
router.get("/all", async (req, res) => {
  try {
    const allQueries = await Query.find(
      {},
      {
        _id: 1,
        createdAt: 1,
        email: 1,
        name: 1,
        isLiked: 1,
        message: 1,
        status: 1,
        subject: 1,
        solution: 1,
        isDeleted: 1,
      }
    );

    res.status(200).json(allQueries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all queries for the logged-in user for user
router.get("/", async (req, res) => {
   try {
    const allQueries = await Query.find({
      userId: req.userId,
      isDeleted: false,
    });
    const queries = allQueries.map((query) => ({
      _id: query._id,
      createdAt: query.createdAt,
      email: query.email,
      username: query.name,
      isLiked: query.isLiked,
      message: query.message,
      status: query.status,
      subject: query.subject,
      solution: query.solution,
    }));

    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a specific query's solution
router.put("/solution/:id", async (req, res) => {
  const { id } = req.params;
  const { solution } = req.body;

  try {
    const query = await Query.findOneAndUpdate(
      { _id: id },
      { solution },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update a specific query's status
router.put("/status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const query = await Query.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//update a specific query's like
router.put("/like/:id", async (req, res) => {
  const { id } = req.params;
  const { isLiked } = req.body;

  try {
    const query = await Query.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { isLiked },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ liked: false });
    }

    res.status(200).json({ liked: isLiked });
  } catch (error) {
    res.status(400).json({ liked: false });
  }
});

router.put("/admin/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { isDeleted } = req.body;

  try {
    const query = await Query.findOneAndUpdate(
      { _id: id },
      { isDeleted },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { isDeleted } = req.body;

  try {
    const query = await Query.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { isDeleted },
      { new: true }
    );

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a specific query
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = await Query.findOneAndDelete({ _id: id, userId: req.userId });

    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.status(200).json({ message: "Query deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
