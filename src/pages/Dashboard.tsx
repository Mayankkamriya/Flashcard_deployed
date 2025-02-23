import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import api from "../lib/axios";
import type { Flashcard } from "../types";

const cardColors = [
  "bg-gradient-to-r from-purple-400 to-blue-500 dark:from-purple-700 dark:to-blue-900",
  "bg-gradient-to-r from-teal-400 to-cyan-500 dark:from-teal-700 dark:to-cyan-900",
  "bg-gradient-to-r from-rose-400 to-pink-500 dark:from-rose-700 dark:to-pink-900",
  "bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-700 dark:to-orange-900",
];

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
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
    } catch {
      toast.error("Failed to fetch flashcards");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCard) {
        await api.put(`${API_BASE_URL}/flashcards/${editingCard._id}`, formData);
        toast.success("Flashcard updated successfully!");
      } else {
        const response = await api.post(`${API_BASE_URL}/flashcards`, formData);
        toast.success("New flashcard created!");
        setFlashcards([...flashcards, response.data]);
      }
      setFormData({ question: "", answer: "" });
      setIsCreating(false);
      setEditingCard(null);
      fetchFlashcards();
    } catch {
      toast.error("Failed to save flashcard");
    }
  };

  const handleDelete = async (_id: string) => {
    if (!window.confirm("Are you sure you want to delete this flashcard?")) return;
    try {
      await api.delete(`${API_BASE_URL}/flashcards/${_id}`);
      toast.success("Flashcard deleted successfully");
      setFlashcards(flashcards.filter((card) => card._id !== _id));
    } catch {
      toast.error("Failed to delete flashcard");
    }
  };

  const handleEdit = (card: Flashcard) => {
    setEditingCard(card);
    setFormData({ question: card.question, answer: card.answer });
    setIsCreating(true);
  };

  return (
<div className="max-w-5xl mx-auto py-12 px-8 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white rounded-3xl shadow-2xl transition-all mt-20">
<motion.div 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex justify-between items-center mb-8"
>
  <h1 className="text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 dark:from-cyan-300 dark:to-blue-500">🚀 UltraFlash</h1>
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => { setIsCreating(true); setEditingCard(null); setFormData({ question: "", answer: "" }); }}
    className="bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-700 dark:to-purple-800 px-6 py-3 rounded-xl shadow-lg text-white font-bold flex items-center space-x-3 hover:opacity-80 transition-all"
  >
    <Plus className="w-6 h-6" />
    <span>Create</span>
  </motion.button>
</motion.div>

<AnimatePresence>
  {isCreating && (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/30 p-8 rounded-xl shadow-lg mb-6 border border-gray-300 dark:border-gray-700 transition-all"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          placeholder="Enter your question..."
          className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-400 transition-all"
          required
        />
        <input
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          placeholder="Enter the answer..."
          className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-4 focus:ring-green-400 transition-all"
          required
        />
        <div className="flex justify-end space-x-4">
          <button type="button" onClick={() => setIsCreating(false)} className="bg-red-500 px-6 py-3 rounded-xl text-white font-bold hover:bg-red-400 transition-all">Cancel</button>
          <button type="submit" className="bg-green-500 px-6 py-3 rounded-xl text-white font-bold hover:bg-green-400 transition-all">  {editingCard ? "Update" : "Save"}</button>
        </div>
      </form>
    </motion.div>
  )}
</AnimatePresence>

<div className="grid gap-8 md:grid-cols-2">
  {flashcards.map((card, index) => (
    <motion.div
      key={card._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`p-8 rounded-xl shadow-2xl text-white ${cardColors[index % cardColors.length]} transition-all backdrop-blur-md`}
    >
      <h3 className="text-2xl font-bold">❓ {card.question}</h3>
      <p className="mt-3 text-sm opacity-80">📅 Review: {format(new Date(), "PP")}</p>
      <p className="mt-5 text-lg font-medium">💡 {card.answer}</p>
      <div className="flex justify-end space-x-3 mt-6">
        <button onClick={() =>{ handleEdit(card); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 150);}} className="p-3 bg-gray-900/60 dark:bg-gray-600 rounded-lg hover:bg-gray-800 transition-all">
          <Pencil />
        </button>
        <button onClick={() => handleDelete(card._id)} className="p-3 bg-red-600 dark:bg-red-500 rounded-lg hover:bg-red-500 transition-all">
          <Trash2 />
        </button>
      </div>
    </motion.div>
  ))}
</div>
</div>

  );
};

export default Dashboard;