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
import BookAppointmentPage from "./pages/BookAppointmentPage";
import { useContext } from "react";
import { AuthZContext } from "./context/AuthZContext";
import { useEffect } from "react";
import axios from "axios";
import NotFoundPage from "./pages/NotFoundPage";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const {userLogedin,setUserLogedin}=useContext(AuthZContext);

  const checkUserLogin =async () => {
    try {
      const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/isuser`, {withCredentials: true,})
      // console.log(res.ok);
      if(res.data.success){
        setUserLogedin(true);
      }else{
        setUserLogedin(false);
      }      
    } catch (error) {
      console.error("Error checking user login status:", error.message);
      setUserLogedin(false);
      
    }
  };

  useEffect(()=>{
    checkUserLogin();
  },[userLogedin])

  // toast.success('hello, welcome to UR Sarthi!');


  console.log('User Login??: ',userLogedin);

  if(!userLogedin){
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/otp" element={<OtpInput />} />
          <Route path="/mentorabout" element={<MentorAboutPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="*" element={<SignUp />} />
        </Routes>
      </div>
    );
  }



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
        <Route path="/bookAppointment" element={<BookAppointmentPage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </div>
  );
}

export default App;
  