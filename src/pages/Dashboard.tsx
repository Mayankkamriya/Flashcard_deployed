import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import api from "../lib/axios";
import type { Flashcard } from "../types";

const cardColors = [
  "bg-red-500 dark:bg-red-700",
  "bg-green-500 dark:bg-green-700",
  "bg-blue-500 dark:bg-blue-700",
  "bg-yellow-500 dark:bg-yellow-700",
  "bg-purple-500 dark:bg-purple-700",
  "bg-pink-500 dark:bg-pink-700",
  "bg-teal-500 dark:bg-teal-700",
];

const API_BASE_URL = import.meta.env.VITE_API_URL 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const formVariants = {
  hidden: { 
    opacity: 0,
    y: -50,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.2
    }
  }
};

function Dashboard() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/flashcards`);
      setFlashcards(response.data);
    } catch (error) {
      toast.error("Failed to fetch flashcards");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCard) {
        await api.put(`${API_BASE_URL}/flashcards/${editingCard._id}`, formData);
        toast.success("✨ Flashcard updated successfully!");
      } else {
        const response = await api.post(`${API_BASE_URL}/flashcards`, formData);
        toast.success("🎉 New flashcard created!");
        setFlashcards((prev) => [...prev, response.data]);
      }
      setFormData({ question: "", answer: "" });
      setIsCreating(false);
      setEditingCard(null);
      fetchFlashcards();
    } catch (error) {
      toast.error(editingCard ? "❌ Failed to update flashcard" : "❌ Failed to create flashcard");
    }
  };

  const handleDelete = async (_id: string) => {
    if (!window.confirm("🗑️ Are you sure you want to delete this flashcard?")) return;
    try {
      await api.delete(`${API_BASE_URL}/flashcards/${_id}`);
      toast.success("🗑️ Flashcard deleted successfully");
      setFlashcards((prev) => prev.filter((card) => card._id !== _id));
    } catch (error) {
      toast.error("❌ Failed to delete flashcard");
    }
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setFormData({ question: card.question, answer: card.answer });
    setIsCreating(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 bg-white dark:bg-black text-black dark:text-white rounded shadow-sm">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-xl sm:text-3xl font-bold">📚 My Flashcards</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsCreating(true);
            setEditingCard(null);
            setFormData({ question: "", answer: "" });
          }}
          className="bg-white text-black px-4 py-2 rounded-lg shadow-md flex items-center space-x-2 hover:bg-gray-300 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create ✨</span>
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {isCreating && (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-black p-6 rounded-lg shadow-md mb-8 border border-black"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">❓ Question</label>
                <textarea 
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full p-2 rounded bg-gray-400 dark:bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 transition-shadow resize-none" 
                  rows={3} 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">💡 Answer</label>
                <textarea 
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full p-2 rounded bg-gray-400 dark:bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 transition-shadow resize-none" 
                  rows={3} 
                  required 
                />
              </div>
              <div className="flex justify-end space-x-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button" 
                  onClick={() => setIsCreating(false)} 
                  className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-500 transition-colors"
                >
                  Cancel ❌
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-400 transition-colors"
                >
                  Save ✅
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {flashcards.map((card, index) => (
            <motion.div
              key={card._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              className={`p-6 rounded-lg shadow-md transition-all ${cardColors[index % cardColors.length]} backdrop-blur-sm text-white`}
            >
              <h3 className="text-xl font-semibold">❓ {card.question}</h3>
              <p className="mt-2 text-sm opacity-90">
                📦 Box {card.box} • 📅 Next review: {format(new Date(card.nextReviewDate), "PP")}
              </p>
              <p className="mt-4">💡 {card.answer}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(card)} 
                  className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                >
                  <Pencil />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(card._id)} 
                  className="p-2 bg-red-600 rounded hover:bg-red-500 transition-colors"
                >
                  <Trash2 />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Dashboard;