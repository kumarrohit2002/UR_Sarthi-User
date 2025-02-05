import { useState } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Step 1
export const AuthZContext = createContext();

export default function AuthZContextProvider({ children }) {
    const baseUrl =import.meta.env.VITE_BASE_URL;
    const [isLogin, setIsLogin] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [userLogedin, setUserLogedin] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER'
    });
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Initialize navigate

    // Step 3    
    async function handleSubmit(e) {
        setIsLoading(true);
        e.preventDefault();
        const { name, email, password, confirmPassword, role } = inputData;

        if (isSignUp) {
            // SignUp logic
            if (password === confirmPassword) {
                try {
                    setIsLogin(false);
                    const response = await axios.post(`${baseUrl}/api/v1/user/signup`, { name, email, password, role });
                    setEmail(email);
                    console.log(response.data);
                    toast.success(response.data.message);
                    localStorage.setItem('tempUserId',response.data.user._id);
                    navigate('/otp'); 
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error("Something went wrong!");
                    }
                    console.log(error);
                }
            } else {
                toast.error("Confirm Password does not match!");
            }
        } else {
            // Login logic
            try {
                const response = await axios.post(`${baseUrl}/api/v1/user/login`, { email, password },{ withCredentials: true });
                console.log(response.data);
                toast.success("You have successfully logged in!");
                const role=response.data.user.role;
                if(role==='MENTOR'){
                    window.location.href = 'http://localhost:5174/';
                }
                localStorage.setItem('userlogin',true);
                setUserLogedin(true);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Something went wrong!");
                }
                console.log(error.message);
                console.log(error);
            }
        }
        setIsLogin(false);
        setIsLoading(false);
    }

    async function handleOtpSubmit(e) {
        setIsLoading(true);
        e.preventDefault();
        if (otp.includes("")) {
            setError("Please fill in all the OTP fields.");
            return;
        }
        setError("");
        const finalOtp = otp.join("");

        console.log("Entered OTP:", finalOtp);
        setOtp(["", "", "", ""]);
        
        try{
            if (email !== '') {
                const response = await axios.post(`${baseUrl}/api/v1/user/verify-otp`, { email, otp: finalOtp });
                console.log(response.data);
                toast.success(response.data.message);
                navigate('/'); 
            } else {
                console.log('Email not assigned');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong!");
            }
            console.log(error.message);
        }
        setIsLoading(false);
    }

    async function resendOtp(){
        setIsLoading(true);
        try{
            const email=inputData.email;
            const response = await axios.post(`${baseUrl}/api/v1/resend-otp`,{email: email});
            console.log(response.data);
        }catch(error){
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong!");
            }
            console.log(error.message);
        }
        setIsLoading(false);
    }

    function logOut(){
        setIsLoading(true);
        setUserLogedin(false);
        localStorage.removeItem('userlogin');
        Cookies.remove('token');
        navigate('/');
        window.location.reload();
        setIsLoading(false);
    }

    const value = {
        handleSubmit,
        isLogin,
        setIsLogin,
        isSignUp,
        setIsSignUp,
        inputData,
        setInputData,
        handleOtpSubmit,
        error,
        setError,
        otp,
        setOtp,
        resendOtp,
        userLogedin,
        setUserLogedin,
        logOut,
        isLoading
    }

    // Step 2
    return <AuthZContext.Provider value={value}>
        {children}
    </AuthZContext.Provider>
}
