import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem("token");

    return token ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;

// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { FallingLines } from "react-loader-spinner";

// const ProtectedRoute = ({ children }) => {
//   const [authChecked, setAuthChecked] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(
//           "https://skillitgh-lms-backend.onrender.com/api/v1/auth/check-session",
//           {
//             withCredentials: true,
//           }
//         );
//         if (res.data?.authenticated) {
//           setIsAuthenticated(true);
//         }
//       } catch (err) {
//         console.error("Auth check failed:", err);
//       } finally {
//         setAuthChecked(true);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (!authChecked) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <FallingLines color="#08C76A" width="100" visible={true} />
//       </div>
//     );
//   }

//   return isAuthenticated ? children : <Navigate to="/signin" replace />;
// };

// export default ProtectedRoute;

// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { FallingLines } from "react-loader-spinner";

// const ProtectedRoute = ({ children }) => {
//   const [authChecked, setAuthChecked] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(
//           "https://skillitgh-lms.onrender.com/api/v1/signin",
//           {
//             withCredentials: true, // Ensure cookies are sent
//           }
//         );

//         // Backend should return some indicator of success (e.g. user object or success flag)
//         if (res.status === 200 && res.data?.user) {
//           setIsAuthenticated(true);
//         }
//       } catch (err) {
//         console.error("Auth check failed:", err);
//         setIsAuthenticated(false);
//       } finally {
//         setAuthChecked(true);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (!authChecked) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <FallingLines color="#08C76A" width="100" visible={true} />
//       </div>
//     );
//   }

//   return isAuthenticated ? children : <Navigate to="/signin" replace />;
// };

// export default ProtectedRoute;
