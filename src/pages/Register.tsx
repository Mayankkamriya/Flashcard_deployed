import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { useAuth } from "../contexts/AuthContext";
import DarkModeToggle from "../components/DarkModeToggle";

// Validation Schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const API_BASE_URL = import.meta.env.VITE_API_URL;

type RegisterForm = z.infer<typeof registerSchema>;

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await api.post(`${API_BASE_URL}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        login(response.data.token);
        toast.success("Account created successfully!");
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create account. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Flashcard Styled Gradient Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-teal-500 to-blue-600 dark:from-gray-900 dark:to-gray-800 items-center justify-center p-12">
        <div className="text-center text-white space-y-6">
          <h1 className="text-4xl font-bold">Flash Cards</h1>
          <p className="text-lg opacity-80">
            Enhance your learning with interactive flash cards.
          </p>
          <img
            src="/images/illustration.png"
            alt="Register Illustration"
            className="w-80"
          />
        </div>
      </div>

      {/* Right Side - Registration Form with Gradient Border (Flash Card UI) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 bg-gray-100 dark:bg-gray-900">
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>

        {/* Flash card styled container with a gradient border */}
        <div className="max-w-md w-full p-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                Create Your Account
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
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
                    {...register("password")}
                    type="password"
                    id="password"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Create a password"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    id="confirmPassword"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
>
  {isSubmitting ? "Creating account..." : "Sign Up"}
</button>
            </form>

            <p className="text-gray-600 dark:text-gray-400 text-center">
              Already have an account?{" "}
              {/* <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Sign in
              </Link> */}
              <Link
                to="/login"
                className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 transition duration-300 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
