import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { BookOpen, Layers, Rocket } from "lucide-react";

const Home = () => {
    const [isDark, setIsDark] = useState(
        localStorage.getItem("theme") === "dark" ? true : false
    );
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const login = () => {
        window.location.href = "/login";
    };
    const register = () => {
        window.location.href = "/register";
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <>
            <nav className="w-full bg-white dark:bg-black shadow-md border-b border-gray-200 dark:border-black transition-all">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <span className="text-2xl font-bold text-black dark:text-white tracking-wide">
                                BrainBoost
                            </span>
                        </div>

                        {/* Hamburger Menu for mobile */}
                        <div className="flex md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-black dark:text-white focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
                            {/* Auth Buttons */}
                            <button
                                className="px-4 py-2 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                onClick={login}
                            >
                                Login
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                                onClick={register}
                            >
                                Sign Up
                            </button>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full bg-gray-200 dark:bg-black text-black dark:text-white transition hover:scale-110"
                            >
                                {isDark ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
                >
                    <div className="flex flex-col items-center space-y-4 bg-gray-200 dark:bg-gray-800 py-4 px-6">
                        <button
                            className="w-full px-4 py-2 rounded-lg text-black dark:text-white hover:bg-gray-100 dark:hover:bg-back"
                            onClick={login}
                        >
                            Login
                        </button>
                        <button
                            className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                            onClick={register}
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="w-full p-2 rounded-full bg-gray-200 dark:bg-black text-black dark:text-white transition hover:scale-110"
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
                {/* Hero Section */}
                <section className="flex flex-col items-center text-center py-20 px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Master Anything with <span className="text-indigo-600">BrainBoost </span>
                    </h1>
                    <p className="text-lg md:text-xl text-black dark:text-gray-300 max-w-2xl">
                        The smartest way to learn and retain knowledge. Use our flashcards to improve your memory.
                    </p>
                    <div className="mt-6 flex space-x-4 flex-wrap justify-center">
                        <Link
                            to="/register"
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition mb-4 md:mb-0"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition mb-4 md:mb-0"
                        >
                            Log In
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
                    <div className="flex flex-col items-center text-center">
                        <BookOpen className="w-12 h-12 text-indigo-600" />
                        <h3 className="text-xl font-semibold mt-4">Smart Flashcards</h3>
                        <p className="text-black dark:text-gray-400 mt-2">
                            Our intelligent flashcards adapt to your learning pace.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Layers className="w-12 h-12 text-indigo-600" />
                        <h3 className="text-xl font-semibold mt-4">Leitner System</h3>
                        <p className="text-black dark:text-gray-400 mt-2">
                            Proven method to optimize memory retention efficiently.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Rocket className="w-12 h-12 text-indigo-600" />
                        <h3 className="text-xl font-semibold mt-4">Get Insights</h3>
                        <p className="text-black dark:text-gray-400 mt-2">
                            Track progress and get recommendations for better learning.
                        </p>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-12 bg-indigo-600 text-white">
                    <h2 className="text-3xl font-bold">Start Learning Smarter Today</h2>
                    <p className="text-lg mt-2">Join thousands of learners who are mastering new skills every day.</p>
                    <Link
                        to="/register"
                        className="mt-6 inline-block px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-200 transition"
                    >
                        Sign Up Now
                    </Link>
                </section>
            </div>
        </>
    );
};

export default Home;
