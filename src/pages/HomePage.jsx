
import Header from "../components/Header";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Collaboration from "../components/Collaboration";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";
import { AuthZContext } from "../context/AuthZContext";
import SignUp from "../components/SignUp";
import { useContext, useEffect } from "react";
import {mentorContext} from '../context/MentorContext'
import {UserProfileContext} from '../context/UserProfileContext'

const HomePage = () => {
  const {isLogin}=useContext(AuthZContext);
  const {getAllMentorData}=useContext(mentorContext);
  const {getUserData}=useContext(UserProfileContext);

  useEffect(()=>{
    getAllMentorData();
    getUserData();
  },[]);


  return (
    <div>
          {/* lander page */}
        <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
          <Header/>
          {
           isLogin? 
              (<SignUp/>):
              (<div></div>)
          }
          <Hero/>
          <Benefits/>
          <Collaboration/>
          <Services/>
          <Pricing/>
          <Roadmap/>
          <Footer/>
        </div>
      <ButtonGradient />
    </div>
  )
}

export default HomePage;

