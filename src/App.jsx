import SignIn from "./pages/SignIn";
import SignUp from "./pages/signup2";
import ChoosePath from "./pages/ChoosePath";
import { Routes, Route, Navigate } from 'react-router-dom';
import ChooseCourse from "./pages/ChooseCourse";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import WorkshopsPage from "./pages/WorkshopsPage";
//import WorkshopRegistration from "./pages/WorkshopRegistration";
//import WorkshopRegistrationSuccess from "./pages/WorkshopRegistrationSuccess";
import "./index.css";
import React from "react";
import DashboardLayout from "./routes/dashboard/_dashboardLayout";
import CoursesDashboard from "./pages/CoursesDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboardLayout from "./routes/admin-dashboard/adminDashboardLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/admin-dashboard/*" element={<AdminDashboardLayout />} >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="content" element={<AdminDashboard />} />
      </Route>
      
      {/* ✅ Protected Routes Start */}
      <Route
        path="/choosepath"
        element={
          <ProtectedRoute>
            <ChoosePath />
          </ProtectedRoute>
          
        }
      />

      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="workshops" element={<WorkshopsPage />} />
        <Route index element={<CoursesDashboard />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      {/* ✅ Protected Routes End */}

      {/*course path*/}
      <Route path="/courses" element={<ChooseCourse />} />
      
      <Route path="/registrationsuccess" element={<RegistrationSuccess />} />

      {/*workshop path*/}
       {/*
      <Route path="/workshopregistration" element={<WorkshopRegistration />} />
      <Route path="/workshopregistrationsuccess" element={<WorkshopRegistrationSuccess />} /> 
      <Route path="*" element={<Navigate to="/signin" replace />} /> */}
    </Routes>
  )       
};

export default App;
