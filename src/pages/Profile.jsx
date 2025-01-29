import {  useNavigate } from "react-router-dom";
import { UserProfileContext } from '../context/UserProfileContext';
import { AuthZContext } from "../context/AuthZContext";
import { useContext, useEffect } from "react";
import Header from '../components/Header'
import Loader from "../components/Loader";


const Profile = () => {
  const { userData,getUserData,isLoading } = useContext(UserProfileContext);
  const {logOut}=useContext(AuthZContext);
  const { name, address, description, email, phone, profilePicUrl } = userData;

  // useEffect(() => {
  //   getUserData();
  // }, []);
  
  const navigate = useNavigate();

  if(isLoading){
    return <Loader/>
  }
  
  return (
    <div>
      <Header/>
      <div className="flex min-h-screen mt-20 bg-[#020617] mt-2">
        {/* Left Column */}
        <div className="w-1/3 bg-gradient-to-b bg-[#020617] border-r-[1px] border-gray-800 p-8 flex flex-col items-center">
          <img src={profilePicUrl} alt="Profile" className="w-40 h-40 rounded-full mb-4 shadow-lg hover:shadow-2xl transform transition-transform duration-500 hover:rotate-6" />
          <h2 className="text-3xl font-extrabold text-white mb-2">{name}</h2>
          <p className="text-center mb-4 text-white text-sm">{address}</p>
          <p className="text-center text-white text-md italic">{description}</p>
          <div className=''>
            <button onClick={()=>logOut()} className='bg-blue-700 text-white px-4 mt-4 py-2 rounded-md shadow-lg hover:bg-blue-800 transform transition-all duration-300'>Logout</button>
          </div>
        </div>
        {/* Right Column */}

        <div className="w-2/3 bg-[#020617] p-8 rounded-l-lg shadow-xl relative">
          <div className='flex justify-between'>
            <h1 className="text-4xl font-extrabold mb-6 text-blue-500">Profile Details</h1>
            <button
              onClick={() => {
                // console.log('edit navigate call');
                navigate('/editprofile');
              }}
              className='bg-blue-500 text-white px-4 py-1 rounded-md shadow-lg hover:bg-blue-600 transform transition-all duration-300'>
              Edit Profile
            </button>
          </div>
          <div className="space-y-4 text-white">
            <p className="text-lg"><strong>Name:- </strong> {name}</p>
            <p className="text-lg"><strong>Email:- </strong> {email}</p>
            <p className="text-lg"><strong>Address:- </strong>{address}</p>
            <p className="text-lg"><strong>Phone:- </strong> {phone}</p>
            <p className="text-lg"><strong>Description:- </strong> {description}</p>
            <p className="text-lg"><strong>Skill Set:- </strong> Skill</p>
            <p className="text-lg"><strong>Language:- </strong> Language</p>
            <p className="text-lg"><strong>Qualification:- </strong> Qualification</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;