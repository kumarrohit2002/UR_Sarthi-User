import { useContext, useEffect, useState } from 'react';
import { Mail, Calendar, MapPinHouse, Linkedin, Twitter, Github } from 'lucide-react';
import { mentorContext } from '../context/MentorContext'
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MentorAboutPage = () => {
    const { mentorAboutData, bookAppointment, getMentorAboutData } = useContext(mentorContext);
    console.log(mentorAboutData)
    const navigate = useNavigate(); 


    useEffect(() => {
        getMentorAboutData();
    }, []);

    const {
        name = '',
        title = '',
        socialMediaLinks = {},
        profilePic = '',
        yearsOfExperience = 0,
        aboutSection = '',
        areaOfExpertise = [],
        language = [],
        skills = [],
        address = '',
        achievements = []
    } = mentorAboutData || {};

    // State for scheduling
    const [step, setStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handleTimeChange = (e) => setSelectedTime(e.target.value);

    const CheckoutHandler = async (name, amount, mentorAboutData, selectedDate, selectedTime, navigate) => {
        try {
            const { data: { order } } = await axios.post("http://localhost:4000/api/v1/payment/payment-checkout", { name, amount });
            
            if (!order || !order.id || !order.amount || !order.currency) {
                throw new Error("Order data is incomplete");
            }
    
            const options = {
                key: 'rzp_test_I0zMVxmj8MZIRS',
                amount: order.amount,
                currency: order.currency,
                name: 'Rohit Kumar',
                description: 'Test Transaction',
                order_id: order.id,
                callback_url: 'http://localhost:4000/api/v1/payment/payment-verification',
                prefill: {
                    name: name,
                    email: 'gaurav.kumar@example.com',
                    contact: '91+ 99999999'
                },
                theme: {
                    color: '#F37254'
                },
                handler: async function (response) {
                    try {
                        console.log(response);
                        await bookAppointment(mentorAboutData, selectedDate, selectedTime);
                        navigate(`/success?payment_id=${response.razorpay_payment_id}`);
                    } catch (error) {
                        console.error('Error booking appointment:', error);
                    }
                },
            };
            const rzp = new window.Razorpay(options);
    
            rzp.on('payment.failed', function (response) {
                console.error('Payment failed:', response.error);
                navigate('/failed');
            });
    
            rzp.open();
        } catch (error) {
            console.error('CheckoutHandler Error:', error);
        }
    };
    
    const handleSchedule = async () => {
        if (selectedDate && selectedTime) {
            try {
                if (!mentorAboutData || !mentorAboutData.perHourcharge) {
                    throw new Error("Invalid mentor data or charge amount");
                }
                const amount = mentorAboutData.perHourcharge * 84;
                await CheckoutHandler(name, amount, mentorAboutData, selectedDate, selectedTime, navigate);
            } catch (error) {
                console.log("Error in handleSchedule:", error);
            }
        } else {
            alert('Please select a date and time.');
        }
    };
    

    const learningPoints = [
        'Best practices in software development',
        'Advanced programming techniques',
        'Career guidance in the tech industry',
        'Problem-solving skills for complex projects'
    ];

    const socialMediaHandles = [
        { name: "Email", url: `mailto:${socialMediaLinks?.email}`, icon: <Mail size={20} /> },
        { name: "GitHub", url: socialMediaLinks?.github, icon: <Github size={20} /> },
        { name: "LinkedIn", url: socialMediaLinks?.linkedin, icon: <Linkedin size={20} /> },
        { name: "Twitter", url: socialMediaLinks?.twitter, icon: <Twitter size={20} /> }
    ];

    return (
        <div>
            <Header/>
            <div className="bg-slate-700 mt-12 pt-5">
                <div className="max-w-3xl mx-auto p-6 text-black bg-white rounded-lg shadow-xl relative">
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={profilePic}
                            alt={name}
                            className="w-36 h-36 rounded-full object-cover"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">{name}</h1>
                            <h2 className="text-xl text-gray-600">{title}</h2>
                            <p className="mb-6">{aboutSection}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex gap-1 pr-1"><MapPinHouse size={16} />{`${address}`}</span>
                        <span>{`💼 ${yearsOfExperience}+ years experience`}</span>
                        <span>🗓 Available weekly</span>
                        <span>🕒 Mon-Fri, 3 PM - 8 PM PST</span>
                    </div>

                    {/* Languages */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                            {language.map((lang, index) => (
                                <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                                    {lang}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Achievements</h3>
                        <div className="flex flex-wrap gap-2">
                            {achievements.map((achievement, index) => (
                                <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                                    {achievement}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Areas of Expertise */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Areas of Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {areaOfExpertise.map((area, index) => (
                                <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* What you'll learn */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">What You'll Learn</h3>
                        <ul className="list-disc list-inside">
                            {learningPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media Handles */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold">Social Media Handles:</h3>
                        <div className="flex flex-wrap gap-4">
                            {socialMediaHandles.map((handle, index) => (
                                <a
                                    key={index}
                                    href={handle.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                >
                                    {handle.icon}
                                    {handle.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* per hour Charge */}
                    <div>
                        <p>Per Hour Charge: <span>{`${mentorAboutData.perHourcharge}$`}</span></p>

                    </div>
                        
                        <h1 className="font-semibold">Schedule for one hour</h1>
                    {/* Step 0: Schedule Button */}
                    {step === 0 && (
                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="flex-1 bg-white text-black border border-black px-4 py-2 rounded flex items-center justify-center gap-2"
                            >
                                <Calendar size={20} />
                                Schedule Session
                            </button>
                        </div>
                    )}

                    {/* Step 1: Schedule Form */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Schedule Session</h2>
                            <input
                                type="date"
                                onChange={handleDateChange}
                                min={new Date().toISOString().split("T")[0]} // Set min date to today's date
                                className="mb-2 p-2 bg-gray-300 border rounded w-full"
                            />
                            <select
                                onChange={handleTimeChange}
                                className="mb-4 p-2 bg-gray-300    border rounded w-full"
                            >
                                <option value="">Select Time</option>
                                <option value="5:00 PM">5:00 PM</option>
                                <option value="6:00 PM">6:00 PM</option>
                                <option value="7:00 PM">7:00 PM</option>
                                <option value="8:00 PM">8:00 PM</option>
                                <option value="9:00 PM">9:00 PM</option>
                            </select>
                            <button
                                onClick={handleSchedule}
                                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MentorAboutPage;
