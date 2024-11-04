import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //for style toast
import axios from 'axios';
import { AuthZContext } from "./AuthZContext";

// Step 1
export const mentorContext = createContext();

export default function MentorContextProvider({ children }) {
    const { userLogedin } = useContext(AuthZContext);

    const baseUrl = "http://localhost:4000/api/v1";
    const [allMentor, setAllMentor] = useState([]);
    const [searchMentor, setSearchMentor] = useState([]);
    const [mentorAboutData, setMentorAboutData] = useState({});
    const [myBookingData,setMyBookingData]=useState([]);
    const [allJobPortal,setAllJobPortal] = useState([]);
    function formatDate(date) {
        // Ensure the input is a Date object
        const validDate = new Date(date);
        if (isNaN(validDate)) {
          return 'Invalid Date'; // Handle invalid date input
        }
        const day = String(validDate.getDate()).padStart(2, '0');
        const month = String(validDate.getMonth() + 1).padStart(2, '0');
        const year = validDate.getFullYear();
        
        let hours = validDate.getHours();
        const minutes = String(validDate.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
      
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
      }
      

    const getAllMentorData = async () => {
        try {
            const response = await axios.post(`${baseUrl}/mentor/getAllMentorProfiles`, {});
            const Allmentor = response.data.AllMentor
            setAllMentor(Allmentor);
            setSearchMentor(Allmentor);
        } catch (error) {
            console.log(error);
        }
    }

    const getMentorAboutData=async () => {
        try{
            const Id=localStorage.getItem('about_id');
            const response = await axios.post(`${baseUrl}/mentor/getprofile`,{Id});
            const mentorProfile=response.data.mentorProfile;
            setMentorAboutData(mentorProfile);
        }catch(error){
            console.log(error);
        }
    }

    const bookAppointment = async (mentorAboutData, selectedDate, selectedTime) => {
        if (!userLogedin) {
            toast.error('Please login to proceed.');
            return;
        }
    
        const slot = selectedDate + ' ' + selectedTime;
        try {
            const response = await axios.post(`${baseUrl}/appointment/book-appointment`, {
                mentorProfile: mentorAboutData,
                slot: slot
            }, { withCredentials: true });
            toast.success('Appointment booked successfully!');
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    };


    const getMyBooking=async()=>{
        try{
            const response = await axios.post(`${baseUrl}/appointment/getmy-booking`, {}, {withCredentials: true,});            
            const myBooking = response.data.myBookings;
            setMyBookingData(myBooking);
        }catch(error){
            console.log(error);
        }
    }

    const searchHandler=async(searchValue)=>{
        try{
            console.log(searchValue);
            if(searchValue=='ALL'){
                searchValue='';
                console.log('hello');
            }
            const response = await axios.post(`${baseUrl}/mentor/searchMentor`,{searchValue:searchValue});
            const searchmentors=response.data.searchMentors;
            setSearchMentor(searchmentors);
        }catch(error){
            console.log(error);
        }
    }

    const getAllJobPortal=async()=>{
        try{
            const response = await axios.post(`${baseUrl}/mentor/get-all-job-posts`,{});
            const alljobPortal=response.data.AllPostedJob;
            setAllJobPortal(alljobPortal);
        }catch(error){
            console.log(error);
        }
    }

    const value = {
        allMentor,
        getAllMentorData,
        mentorAboutData,
        setMentorAboutData,
        bookAppointment,
        getMyBooking,
        formatDate,
        myBookingData,
        getMentorAboutData,
        searchMentor,
        searchHandler,
        getAllJobPortal,
        allJobPortal
    }

    // Step 2
    return <mentorContext.Provider value={value}>
        {children}
    </mentorContext.Provider>
}
