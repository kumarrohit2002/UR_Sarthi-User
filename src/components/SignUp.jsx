import { useContext } from "react";
import { AuthZContext } from "../context/AuthZContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const { setIsLogin, isSignUp, setIsSignUp, handleSubmit, inputData, setInputData } = useContext(AuthZContext);

    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRadioChange = (e) => {
        setInputData({
            ...inputData,
            role: e.target.value,
        });
    };


    return (
        <div id="login-popup " tabIndex="-1"
            className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
            <div className="relative p-4 text-black w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow">
                    <button type="button" onClick={() => {
                        navigate('/');
                        setIsLogin(false);
                    }}
                        className="absolute top-3 right-6 font-bold rounded-md bg-slate-200 px-2 py-1 ml-auto inline-flex items-center popup-close">
                        X
                    </button>
                    <div className="p-5 pt-10">
                        <div className="text-center">
                            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                                {isSignUp ? "Create an Account" : "Login to your account"}
                            </p>
                            <p className="mt-2 text-sm leading-4 text-slate-600">
                                {isSignUp ? "Sign up to get started." : "You must be logged in to perform this action."}
                            </p>
                        </div>
                        <div className="mt-7 flex flex-col gap-2">
                            <button
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                                    className="h-[18px] w-[18px]" />
                                Continue with Google
                            </button>
                        </div>

                        <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                            <div className="h-px w-full bg-slate-200"></div>
                            OR
                            <div className="h-px w-full bg-slate-200"></div>
                        </div>

                        {/* for input form */}
                        <form className="w-full" onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div>
                                    <input name="name" type="text" autoComplete="name" required
                                        className="block w-full rounded-lg border bg-white border-gray-300 px-3 py-2 shadow-sm outline-none
                                         placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                        placeholder="Name" value={inputData.name} onChange={handleChange} />
                                </div>
                            )}
                            <input name="email" type="email" autoComplete="email" required
                                className="block w-full rounded-lg mt-2 border bg-white border-gray-300 px-3 py-2 shadow-sm outline-none 
                                placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                placeholder="Email Address" value={inputData.email} onChange={handleChange} />

                            <input name="password" type="password" autoComplete="current-password" required
                                className="mt-2 block w-full rounded-lg border bg-white border-gray-300 px-3 mb-2 py-2 shadow-sm outline-none
                                 placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                placeholder="Password" value={inputData.password} onChange={handleChange} />
                            {isSignUp && (
                                <>
                                    <input name="confirmPassword" type="password" autoComplete="new-password" required
                                        className="mt-2 block w-full rounded-lg border bg-white border-gray-300 px-3 py-2 shadow-sm outline-none 
                                        placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                        placeholder="Confirm Password" value={inputData.confirmPassword} onChange={handleChange} />
                                    <div className="flex items-center mt-2">
                                        <div className="font-semibold">Register as A:</div>
                                        <div className="flex justify-between ml-2 gap-4 mt-2 mb-2">
                                            <div className="flex items-center">
                                                <input id="default-radio-1" type="radio" value="USER" name="role"
                                                    checked={inputData.role === 'USER'} onChange={handleRadioChange} />
                                                <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 ">
                                                    USER
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="default-radio-2" type="radio" value="MENTOR" name="role"
                                                    checked={inputData.role === 'MENTOR'} onChange={handleRadioChange} />
                                                <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 ">
                                                    MENTOR
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <button type="submit"
                                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 
                                text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1
                                 disabled:bg-gray-400">
                                Continue
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-slate-600">
                            {isSignUp ? (
                                <p>Already have an account? <button type="button" onClick={() => setIsSignUp(false)} className="font-medium text-[#4285f4]">Login</button></p>
                            ) : (
                                <p>Don't have an account? <button type="button" onClick={() => setIsSignUp(true)} className="font-medium text-[#4285f4]">Sign up</button></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
