import SignIn from "./pages/SignIn";
import SignUp from "./pages/signup2";
import ChoosePath from "./pages/ChoosePath";
import { Routes, Route, Navigate } from 'react-router-dom';
import ChooseCourse from "./pages/ChooseCourse";
import RegistrationSuccess from "./pages/RegistrationSuccess";


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
