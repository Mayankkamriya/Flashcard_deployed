import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { BookOpen, Layers, Rocket } from "lucide-react";
// import Navbar from '../components/Navbar'

const Home = () => {
    const [isDark, setIsDark] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return (
<>
{/* <Navbar></Navbar> */}
    <nav className="w-full bg-gradient-to-r from-teal-500 to-blue-600 dark:from-gray-900 dark:to-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                 {/* <div className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 dark:from-cyan-300 dark:to-blue-500">
                    🚀 
                </div> */}
                <div className="text-2xl font-black tracking-tight text-white dark:text-gray-300 bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 dark:from-cyan-300 dark:to-blue-500">
                🚀  UltraFlash 1
                </div> 

                {/* <div className="flex items-center space-x-2">
    {/* Rocket with Gradient */}
     {/* <div className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 dark:from-cyan-300 dark:to-blue-500">
        🚀
    </div>
</div>  */}

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

                
                <div className="hidden md:flex items-center space-x-6 lg:space-x-12">
                    <Link to="/login" className="text-white text-lg font-semibold hover:underline">Login</Link>
                    <Link to="/register" className="px-4 py-2 bg-white text-teal-600 font-semibold rounded-lg shadow-md hover:bg-teal-100">Sign Up </Link>
                    {/* <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-teal-500 hover:to-blue-700 transition">Sign Up </Link> */}
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition hover:scale-110">
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile Menu - Only visible when isMobileMenuOpen is true */}
        {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center space-y-4 py-4">
                <Link 
                    to="/login" 
                    className="text-gray-900 dark:text-white text-lg font-semibold hover:underline"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Login
                </Link>
                <Link 
                    to="/register" 
                    className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-teal-500 hover:to-blue-700 transition"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Sign Up
                </Link>
                <button 
                    onClick={() => {toggleTheme(); setIsMobileMenuOpen(false)}} 
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition hover:scale-110"
                >
                    {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            </div>
        )}

    </nav>

    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-white flex flex-col items-center py-20 px-6">
        <h1 className="text-5xl font-extrabold text-center leading-tight bg-gradient-to-r from-teal-400 to-blue-600 text-transparent bg-clip-text dark:from-cyan-300 dark:to-blue-500">
            Supercharge Your Learning with UltraFlash ⚡
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-2xl text-center">
            The ultimate flashcard experience designed for maximum retention and smart learning.
        </p>
        <div className="mt-6 flex space-x-4 flex-wrap justify-center">
            <Link to="/register" className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-teal-500 hover:to-blue-700 transition">
                Get Started
            </Link>
            <Link to="/login" className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                Log In
            </Link>
        </div>

        <section className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
            <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <BookOpen className="w-12 h-12 text-indigo-500" />
                <h3 className="text-xl font-semibold mt-4">Smart Flashcards</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Adaptive flashcards tailored to your learning speed.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <Layers className="w-12 h-12 text-indigo-500" />
                <h3 className="text-xl font-semibold mt-4">Leitner System</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Scientifically proven to enhance memory retention.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <Rocket className="w-12 h-12 text-indigo-500" />
                <h3 className="text-xl font-semibold mt-4">Performance Insights</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Track progress and optimize your learning journey.</p>
            </div>
        </section>

        <section className="text-center py-12 bg-gradient-to-r from-teal-400 to-blue-600 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold">Start Your Journey Today</h2>
            <p className="text-lg mt-2">Join thousands of learners mastering new skills every day.</p>
            <Link to="/register" className="mt-6 inline-block px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg shadow-md hover:bg-teal-100 transition">
                Sign Up Now
            </Link>
        </section>
    </div>
</>
    );
};

export default Home;
