import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ThumbsUp, ThumbsDown, CalendarDays, BoxIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import type { Flashcard } from "../types";

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

  const fetchNextCard = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("http://localhost:3000/flashcards/next");
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
      toast.error("Failed to fetch next card");
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
      await api.post(`http://localhost:3000/flashcards/${currentCard.id}/review`, { correct });
      toast.success(correct ? "Great job!" : "Keep practicing!");
      setShowAnswer(false);
      fetchNextCard();
    } catch (error) {
      toast.error("Failed to update card progress");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center py-12 bg-black text-white">
        <BoxIcon className="mx-auto h-12 w-12 text-white" />
        <h3 className="mt-2 text-lg font-medium">No cards left</h3>
        <p className="mt-1 text-gray-400">Great job! You've viewed all the cards.</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-black text-white p-6 rounded-lg shadow-lg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Review Cards</h1>
        <p className="mt-2">{dueCount} card{dueCount !== 1 ? "s" : ""} left to review today</p>
      </motion.div>

      <motion.div key={currentCard.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="card bg-black border border-gray-700 rounded-lg p-6">
        <div className="min-h-[200px] flex items-center justify-center">
          <h2 className="text-xl text-center">{currentCard.question}</h2>
        </div>

        <AnimatePresence mode="wait">
          {showAnswer && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="border-t border-gray-700">
              <div className="p-6">
                <div className="min-h-[100px] flex items-center justify-center">
                  <p className="text-center">{currentCard.answer}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-6 py-4 border-t border-gray-700">
          {!showAnswer ? (
            <button onClick={() => setShowAnswer(true)} className="btn-primary w-full bg-white text-black py-2 rounded-lg hover:bg-gray-300">Show Answer</button>
          ) : (
            <div className="flex space-x-4">
              <button onClick={() => handleResponse(false)} className="flex-1 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
                <ThumbsDown className="w-5 h-5 mr-2" />
                Got it Wrong
              </button>
              <button onClick={() => handleResponse(true)} className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                <ThumbsUp className="w-5 h-5 mr-2" />
                Got it Right
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Review;
