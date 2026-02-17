import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Blogs from "./pages/blags.jsx";
// import { useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute.jsx';
import SignupForm from "./pages/SignupForm.jsx";
import { useSelector } from "react-redux";

const App = () => {
  const { details } = useSelector((s) => s.auth);
  const role = details?.role;


  return (
    <div>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />


        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>

            {role === "Admin" && (
              <Route path="user" element={<User />} />
            )}

            {(role === "Admin" || role === "Editor") && (
              <Route path="blogs" element={<Blogs />} />
            )}

          </Route>
        </Route>
        <Route path="*" element={<Login/>}/>
      </Routes>
    </div>
  );
};

export default App;
