import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState(null); 
  const navigate = useNavigate();

  // Fetch user and notes on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user info
    axios
      .get("http://localhost:3000/api/auth/me", { headers: { Authorization: token } })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

    // Fetch notes
    axios
      .get("http://localhost:3000/api/notes", { headers: { Authorization: token } })
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, [navigate]);

  // Create Note
  const handleCreateNote = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:3000/api/notes",
        newNote,
        { headers: { Authorization: token } }
      );
      setNotes([...notes, res.data]); 
      setNewNote({ title: "", content: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // Update Note
  const handleUpdateNote = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:3000/api/notes/${id}`,
        editNote,
        { headers: { Authorization: token } }
      );
      setNotes(notes.map((note) => (note._id === id ? res.data : note))); // Update list
      setEditNote(null); // Edit mode off
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Note
  const handleDeleteNote = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`, {
        headers: { Authorization: token },
      });
      setNotes(notes.filter((note) => note._id !== id)); // Delete from list
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 flex"
    >
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl mb-6">Notes App</h2>
        <ul>
          <li className="mb-4 hover:bg-gray-600 py-3 px-2 rounded cursor-pointer">Dashboard</li>
          <li className="mb-4 hover:bg-gray-600 py-3 px-2 rounded cursor-pointer">Notes</li>
          <li onClick={handleLogout} className="cursor-pointer hover:bg-gray-600 py-3 px-2 rounded ">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl">Welcome, {user?.username || "User"} 👋</h1>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Create Note Form */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded w-full mb-2"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="p-2 border rounded w-full mb-2"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          />
          <button
            onClick={handleCreateNote}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Note
          </button>
        </div>

        {/* Notes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <motion.div
              key={note._id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg"
              whileHover={{ scale: 1.05 }} 
            >
              {editNote?._id === note._id ? (
                <>
                  <input
                    type="text"
                    value={editNote.title}
                    onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                    className="p-2 border rounded w-full mb-2"
                  />
                  <textarea
                    value={editNote.content}
                    onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                    className="p-2 border rounded w-full mb-2"
                  />
                  <button
                    onClick={() => handleUpdateNote(note._id)}
                    className="p-2 bg-green-500 text-white rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditNote(null)}
                    className="p-2 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-xl">{note.title}</h3>
                  <p>{note.content}</p>
                  <button
                    onClick={() => setEditNote(note)}
                    className="p-2 bg-yellow-500 text-white rounded mr-2 mt-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="p-2 bg-red-500 text-white rounded mt-2"
                  >
                    Delete
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;