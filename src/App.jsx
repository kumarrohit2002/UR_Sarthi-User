import EditUserProfile from "./components/EditUserProfile";
import HomePage from "./pages/HomePage";
import Room from "./pages/Room";
import SignUp from "./components/SignUp";
import OtpInput from "./components/OtpInput";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import MentorAboutPage from "./pages/MentorAboutPage";
import MyBooking from "./pages/MyBooking";
import SearchPage from "./pages/SearchPage";
import JobPortal from "./pages/JobPortal";
import JobApply from "./pages/JobApply";
import FreeResource from "./pages/FreeResource";
import Category from "./pages/Category";
import Failed from "./pages/Failed";
import Success from "./pages/Success";
import AboutSection from "./pages/AboutSection";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/editprofile" element={<EditUserProfile/>}/>
        <Route path="/mentorabout" element={<MentorAboutPage/>}/>
        <Route path="/otp" element={<OtpInput/>}/>
        <Route path="/mybooking" element={<MyBooking/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/login" element={<SignUp/>}/>
        <Route path="/jobportal" element={<JobPortal/>}/>
        <Route path="/job-apply" element={<JobApply/>}/>
        <Route path="/free-resource" element={<FreeResource/>}/>
        <Route path="/failed" element={<Failed/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/room/:roomId" element={<Room/>}/>
        <Route path="/aboutsection" element={<AboutSection/>}/>
      </Routes>
    </div>
  );
}

export default App;
  