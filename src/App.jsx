import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import ChoosePath from "./Components/ChoosePath";
import { Routes, Route, Navigate } from 'react-router-dom';
import ChooseCourse from "./Components/ChooseCourse";
import RegistrationSuccess from "./Components/RegistrationSuccess";


const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/choosepath" element={<ChoosePath />} />
      <Route path="/courses" element={<ChooseCourse />} />
      <Route path="/registrationsuccess" element={<RegistrationSuccess />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  )       
};

export default App;
