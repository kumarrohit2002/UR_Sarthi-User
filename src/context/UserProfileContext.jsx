import { useContext, useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import ProfilePic from '../assets/ProfilePic.jpeg';
import { toast } from 'react-toastify';
import { AuthZContext } from "../context/AuthZContext";

// Create the context
export const UserProfileContext = createContext();

export default function UserProfileContextProvider({ children }) {
  const { setUserLogedin, userLogedin } = useContext(AuthZContext);
  const[isLoading,setIsLoding]=useState(false);
  const BaseUrl=import.meta.env.VITE_BASE_URL;

  const [userData, setUserData] = useState({
    name: 'Xyzbc Singh',
    email: 'xyz@gmail.com',
    address: 'India, Panjab (841415)',
    phone: '+91 xxxxxxxxxxx',
    description: 'This is description',
    profilePicUrl: ProfilePic,
    skills: [],
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    address: false,
    phone: false,
    description: false,
    skills: false, 
  });

  useEffect(() => {
    getUserData();
  }, [userLogedin]);

  const getUserData = async () => {
    setIsLoding(true);  
    const isLoggedIn = localStorage.getItem('userlogin');
    if (isLoggedIn) {
      let UserData=localStorage.getItem('userData');
      if(UserData) {
        setUserData(UserData);
        return;
      }
      try {
        const response = await axios.post(`${BaseUrl}/api/v1/user/getuser-profile`, {}, { withCredentials: true });
        const user = response.data.userProfile;
        setUserData({
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phoneNo,
          description: user.aboutSection,
          profilePicUrl: user.profilePic || ProfilePic,
          skills: user.skills || [], 
        });
        localStorage.setItem('useData',userData);
      } catch (error) {
        console.log(error);
        // toast.error('Failed to fetch user data.');
      }
    }else{
      console.log("User not Login");
    }
    setIsLoding(false);
  };

  const handleProfilePicChange = async (e) => {
    setIsLoding(true);
    const file = e.target.files[0];
    if (!file) {
        toast.error('Please select a file.');
        return;
    }
    const formData = new FormData();
    formData.append('imageFile', file); 
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]); // Should log: imageFile, [object File]
    // }
    try {
        const response = await axios.post(`${BaseUrl}/api/v1/upload-profile-pic`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const imageUrl = response.data.url;
        setUserData((prev) => ({
            ...prev,
            profilePicUrl: imageUrl,
        }));
        toast.success('Profile picture updated successfully!');
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        toast.error('Error uploading profile picture.');
    }
    setIsLoding(false);
};


  const handleSubmit = async () => {
    setIsLoding(true);
    const { name, email, address, phone, description, skills } = userData;
    try {
      await axios.post(`${BaseUrl}/api/v1/user/create-user-profile`, 
        { name, email, address, phoneNo: phone, aboutSection: description, skills }, { withCredentials: true });
      toast.success('Profile updated successfully!');
      setEditMode({
        name: false,
        email: false,
        address: false,
        phone: false,
        description: false,
        skills: false,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
    }
    setIsLoding(false);
  };

  const handleEdit = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle adding a new skill
  const addSkill = () => {
    setUserData((prev) => ({
      ...prev,
      skills: [...prev.skills, ''],
    }));
  };

  // Handle removing a skill
  const removeSkill = (index) => {
    setUserData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Handle changing a skill
  const handleSkillChange = (index, value) => {
    setUserData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = value;
      return { ...prev, skills: updatedSkills };
    });
  };

  const value = {
    userData,
    setUserData,
    editMode,
    setEditMode,
    handleSubmit,
    handleProfilePicChange,
    handleEdit,
    toggleEditMode,
    getUserData,
    addSkill,
    removeSkill,
    handleSkillChange,
    isLoading
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}
