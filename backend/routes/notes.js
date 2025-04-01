import express from "express";
import jwt from "jsonwebtoken";
import Note from "../models/note.js";

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token" });
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// Create Note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    // console.log(title, content);
    const note = await Note.create({
      title,
      content,
      userId: req.userId, // Logged-in user
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Cannot create note" });
  }
});

// Get All Notes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch notes" });
  }
});

// Update Note
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, content },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Cannot update note" });
  }
});

// Delete Note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId, 
    });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Cannot delete note" });
  }
});

export default router;
