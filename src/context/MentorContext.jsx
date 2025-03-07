import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; //for style toast
import axios from 'axios';
import { AuthZContext } from "./AuthZContext";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";



// Step 1
export const mentorContext = createContext();

export default function MentorContextProvider({ children }) {
    const navigate=useNavigate()
    const { userLogedin } = useContext(AuthZContext);

    const baseUrl =import.meta.env.VITE_BASE_URL;
    const [allMentor, setAllMentor] = useState([]);
    const [searchMentor, setSearchMentor] = useState([]);
    const [mentorAboutData, setMentorAboutData] = useState({});
    const [myBookingData,setMyBookingData]=useState([]);
    const [allJobPortal,setAllJobPortal] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

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
        setIsLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/v1/mentor/getAllMentorProfiles`);
            const Allmentor = response.data.AllMentor;
            setAllMentor(Allmentor);
            setSearchMentor(Allmentor);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    const getMentorAboutData=async () => {
        setIsLoading(true);
        try{
            const Id=localStorage.getItem('about_id');
            const response = await axios.post(`${baseUrl}/api/v1/mentor/getprofile`,{Id});
            const mentorProfile=response.data.mentorProfile;
            setMentorAboutData(mentorProfile);
        }catch(error){
            console.log(error);
        }
        setIsLoading(false);
    }

    const bookAppointment = async (mentorAboutData, selectedDate, selectedTime) => {
        if (!userLogedin) {
            toast.error('Please login to proceed.');
            return;
        }
    
        const slot = selectedDate + ' ' + selectedTime;
        try {
            const response = await axios.post(`${baseUrl}/api/v1/appointment/book-appointment`, {
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
        setIsLoading(true);
        const token = Cookies.get("token");
        if(!token){
            console.log('No token!!!');
        }

        try{
            const response = await axios.get(`${baseUrl}/api/v1/appointment/getmy-booking`, {
                withCredentials: true, // Ensures cookies (including tokens) are sent
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in headers (if applicable)
                }
            });            
            const myBooking = response.data.myBookings;
            
            setMyBookingData(myBooking);
        }catch(error){
            console.log(error);
        }
        setIsLoading(false);
    }

    const searchHandler=async(searchValue)=>{
        setIsLoading(true);
        try{
            console.log(searchValue);
            if(searchValue=='ALL'){
                searchValue='';
                console.log('hello');
            }
            const response = await axios.post(`${baseUrl}/api/v1/mentor/searchMentor`,{searchValue:searchValue});
            const searchmentors=response.data.searchMentors;
            setSearchMentor(searchmentors);
        }catch(error){
            console.log(error);
        }
        setIsLoading(false);
    }

    const getAllJobPortal=async()=>{
        setIsLoading(true);
        try{
            const response = await axios.post(`${baseUrl}/api/v1/mentor/get-all-job-posts`,{});
            const alljobPortal=response.data.AllPostedJob;
            setAllJobPortal(alljobPortal);
        }catch(error){
            console.log(error);
        }
        setIsLoading(false);
    }


    const CheckoutHandler = async (name, amount, mentorAboutData, selectedDate, selectedTime) => {
        try {
            console.log(name+ ' '+ amount+' '+selectedDate+' '+selectedTime);
            console.log('CheckOutHandler Called');
            const { data: { order } } = await axios.post(`${baseUrl}/api/v1/payment/payment-checkout`, { name, amount });

            if (!order || !order.id || !order.amount || !order.currency) {
                throw new Error("Order data is incomplete");
            }

            const options = {
                key: `${import.meta.env.VITE_RAZORPAY_KEY}`,
                amount: order.amount,
                currency: order.currency,
                name: 'Rohit Kumar',
                description: 'Test Transaction',
                order_id: order.id,
                callback_url: `${baseUrl}/api/v1/payment/payment-verification`,
                prefill: {
                    name: name,
                    email: 'gaurav.kumar@example.com',
                    contact: '91+ 7903769260'
                },
                theme: {
                    color: '#F37254'
                },
                handler: async function (response) {
                    try {
                        await bookAppointment(mentorAboutData, selectedDate, selectedTime);
                        navigate(`/success?payment_id=${response.razorpay_payment_id}`);
                    } catch (error) {
                        toast.error('Error booking appointment');
                    }
                },
            };
            const rzp = new window.Razorpay(options);

            rzp.on('payment.failed', function (response) {
                toast.error('Payment failed');
                navigate('/failed');
            });

            rzp.open();
        } catch (error) {
            toast.error('Checkout failed');
        }
    };


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
        allJobPortal,
        isLoading,
        CheckoutHandler
    }

    // Step 2
    return <mentorContext.Provider value={value}>
        {children}
    </mentorContext.Provider>
}
