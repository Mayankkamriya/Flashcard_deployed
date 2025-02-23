import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Eye, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import type { Flashcard } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const convertToIST = (utcDate: string) => {
  const date = new Date(utcDate);
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(date.getTime() + istOffset);
};

function Review() {
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dueCount, setDueCount] = useState(0);

  const fetchFirstCard = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`${API_BASE_URL}/flashcards/reset`);
      setCurrentCard(response.data.card);
      setDueCount(response.data.dueCount);
    } catch (error) {
      // toast.error("Failed to load the first card.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNextCard = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`${API_BASE_URL}/flashcards/next`);
      let { card, dueCount: count } = response.data;

      if (card && card._id) {
        card = { ...card, id: card._id };
        const nextReviewDateIST = convertToIST(card.nextReviewDate);
        const todayIST = new Date();
        todayIST.setHours(0, 0, 0, 0);
        nextReviewDateIST.setHours(0, 0, 0, 0);

        if (nextReviewDateIST <= todayIST) {
          setCurrentCard(card);
        } else {
          setCurrentCard(null);
        }
      } else {
        setCurrentCard(null);
      }
      setDueCount(count);
    } catch (error) {
      toast.error("Oops! Could not fetch the next card.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNextCard();
  }, []);

  const handleResponse = async (correct: boolean) => {
    if (!currentCard || !currentCard.id) {
      toast.error("Invalid card data");
      return;
    }

    try {
      if (correct) {
        await api.post(`${API_BASE_URL}/flashcards/${currentCard.id}/review`, { correct });
        toast.success("Great job! ⭐ Moving to next card...");
        setShowAnswer(false);
        setTimeout(fetchNextCard, 1000);
      } else {
        toast.error("Wrong answer! You cannot move to next card.");
        setShowAnswer(false);

      //   setTimeout(() => {
      //     setShowAnswer(false);
      // }, 1000); 
        setTimeout(fetchFirstCard, 1000);
      }
    } catch (error) {
      toast.error("Failed to update progress");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, ease: "easeInOut" }} 
        className="max-w-2xl w-full bg-white dark:bg-black/50 dark:backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-lg text-gray-900 dark:text-white"
      >
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
          Flashcard Review
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{dueCount} cards left for today</p>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
              <RefreshCw className="w-12 h-12 text-gray-800 dark:text-white" />
            </motion.div>
          </div>
        ) : !currentCard ? (
          <div className="text-center p-6">
            <p className="text-lg font-medium">🎉 You've completed all cards for today!</p>
          </div>
        ) : (
          <motion.div 
            key={currentCard.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 1, ease: "easeInOut" }} 
            className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">{currentCard.question}</h2>
            <AnimatePresence mode="wait">
              {showAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  transition={{ duration: 0.8, ease: "easeInOut" }} 
                  className="mt-4 p-4 bg-gray-200 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700"
                >
                  <p className="text-lg">{currentCard.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
            {!showAnswer ? (
              <button onClick={() => setShowAnswer(true)} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                <Eye className="w-5 h-5" /> Show Answer
              </button>
            ) : (
              <div className="flex gap-4 mt-6">
                <button onClick={() => handleResponse(false)} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" /> Got it Wrong
                </button>
                <button onClick={() => handleResponse(true)} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Got it Right
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Review;
