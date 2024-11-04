import { useContext} from "react";
import { AuthZContext } from "../context/AuthZContext";
import Header from './Header';

const OtpInput = () => {
    const {otp, setOtp,error,handleOtpSubmit,resendOtp}=useContext(AuthZContext);

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    return (
        <div>
            <Header/>
            <div className="max-w-md mx-auto border max-w-sm mt-40 rounded">
            <h1 className="text-center text-2xl mt-2">Verify Your Email</h1>
            <form className="shadow-md px-4 py-6" onSubmit={handleOtpSubmit}>
                <div className="flex justify-center gap-2 mb-6">
                    {otp.map((digit, index) => (
                        <input key={index} id={`otp-input-${index}`}
                            className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            type="text" maxLength="1" pattern="[0-9]" inputMode="numeric"
                            autoComplete="one-time-code" value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            required
                        />
                    ))}
                </div>
                {error && (
                    <div className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </div>
                )}
                <div className="flex items-center gap-8 justify-center">
                    <p className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800 ml-4"
                        onClick={()=>resendOtp()}>
                        Resend OTP
                    </p>
                    <button
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Verify
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default OtpInput;
