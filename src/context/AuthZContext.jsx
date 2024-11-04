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
    const baseUrl = "http://localhost:4000/api/v1";
    const [isLogin, setIsLogin] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [userLogedin, setUserLogedin] = useState(false);
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
        e.preventDefault();
        const { name, email, password, confirmPassword, role } = inputData;

        if (isSignUp) {
            // SignUp logic
            if (password === confirmPassword) {
                try {
                    setIsLogin(false);
                    const response = await axios.post(`${baseUrl}/user/signup`, { name, email, password, role });
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
                    console.log(error.message);
                }
            } else {
                toast.error("Confirm Password does not match!");
            }
        } else {
            // Login logic
            try {
                const response = await axios.post(`${baseUrl}/user/login`, { email, password },{ withCredentials: true });
                console.log(response.data);
                toast.success("You have successfully logged in!");
                // Navigate to a different page if needed
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
            }
        }
        setIsLogin(false);
    }

    async function handleOtpSubmit(e) {
        e.preventDefault();
        if (otp.includes("")) {
            setError("Please fill in all the OTP fields.");
            return;
        }
        setError("");
        const finalOtp = otp.join("");

        console.log("Entered OTP:", finalOtp);
        setOtp(["", "", "", ""]);
        
        try {
            if (email !== '') {
                const response = await axios.post(`${baseUrl}/user/verify-otp`, { email, otp: finalOtp });
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
    }

    async function resendOtp(){
        try{
            const email=inputData.email;
            const response = await axios.post(`${baseUrl}/resend-otp`,{email: email});
            console.log(response.data);
        }catch(error){
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong!");
            }
            console.log(error.message);
        }
    }

    function logOut(){
        setUserLogedin(false);
        localStorage.removeItem('userlogin');
        Cookies.remove('token');
        navigate('/');
        window.location.reload();
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
        logOut
    }

    // Step 2
    return <AuthZContext.Provider value={value}>
        {children}
    </AuthZContext.Provider>
}
