import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-600 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-gray-600 mb-6">This feature is currently under development. Please check back later.</p>
        <button 
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-blue-700 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;


// const ForgotPassword = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-600 p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm text-center">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
//         <p className="text-gray-600 mb-6">This feature is currently under development. Please check back later.</p>
//         <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-blue-700 transition duration-300">
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

// // import React from "react";

// const ForgotPassword = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm text-center">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Forgot Password</h2>
//         <p className="text-gray-600 mb-6">This feature is currently under development. Please check back later.</p>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
//           Back to Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
