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


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/choosepath" element={<ChoosePath />} />

      <Route path="/dashboard/*" element={<DashboardLayout />}> 

      <Route path="workshops" element={<WorkshopsPage />} />
      </Route>

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
