import { Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Usage from "./pages/Usage";
function App() {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/email-verify" element={<EmailVerify/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/usage" element={<Usage/>} />
      </Routes>
    </div>
  );
}

export default App;
