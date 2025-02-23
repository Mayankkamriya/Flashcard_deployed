import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { useAuth } from "../contexts/AuthContext";
// import DarkModeToggle from "../components/DarkModeToggle";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const API_BASE_URL = import.meta.env.VITE_API_URL;

type LoginForm = z.infer<typeof loginSchema>;

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await api.post(`${API_BASE_URL}/auth/login`, data);
      login(response.data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-teal-500 to-blue-600 dark:from-gray-900 dark:to-gray-800 items-center justify-center p-12">
        <div className="text-center text-white space-y-6">
          <h1 className="text-4xl font-bold">Boost Your Learning</h1>
          <p className="text-lg opacity-80">Join thousands mastering new skills every day.</p>
          <img src="/images/illustration.png" alt="Learning Illustration" className="w-80" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center h-screen max-w-md w-full mx-auto p-4">
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-1">
          <div className=" bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Sign in to continue your journey.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  {...register("password", { required: "Password is required" })}
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Forgot Password & Signup Link */}
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <Link to="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
              <Link
                to="/register"
                className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 transition duration-300 font-semibold"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
