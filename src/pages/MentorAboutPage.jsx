import { useContext, useEffect, useState } from 'react';
import { Mail, Calendar, MapPinHouse, Linkedin, Twitter, Github } from 'lucide-react';
import { mentorContext } from '../context/MentorContext';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const MentorAboutPage = () => {
    const { mentorAboutData, getMentorAboutData, CheckoutHandler } = useContext(mentorContext);
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const navigate=useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await getMentorAboutData();
            } catch (error) {
                toast.error('Failed to fetch mentor data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // const handleSlotBooking = async (day, time) => {
    //     if (!selectedDate) {
    //         toast.error("Please select a date.");
    //         return;
    //     }
    //     try {
    //         if (!mentorAboutData || !mentorAboutData.perHourcharge) {
    //             throw new Error("Invalid mentor data or charge amount");
    //         }
    //         const amount = mentorAboutData.perHourcharge * 84;
    //         await CheckoutHandler(mentorAboutData.name, amount, mentorAboutData, selectedDate, time);
    //         setSelectedSlot({ day, time });
    //         toast.success(`Slot booked for ${selectedDate} at ${time}`);
    //     } catch (error) {
    //         toast.error('Error in booking slot');
    //     }
    // };

    return (
        <div>
            <Header />
            <ToastContainer />
            <div className="bg-slate-700 mt-12 pt-5">
                <div className="max-w-3xl mx-auto p-6 h-auto text-black bg-white rounded-lg shadow-xl relative">
                    <div className="flex items-center gap-4 mb-4">
                        <img src={mentorAboutData?.profilePic} alt={mentorAboutData?.name} className="w-36 h-36 rounded-full object-cover" />
                        <div>
                            <h1 className="text-3xl font-bold">{mentorAboutData?.name}</h1>
                            <h2 className="text-xl text-gray-600">{mentorAboutData?.title}</h2>
                            <p className="mb-6">{mentorAboutData?.aboutSection}</p>
                        </div>
                    </div>

                    <Section title="Languages">
                        {mentorAboutData?.language?.map((lang, index) => (
                            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                                {lang}
                            </span>
                        ))}
                    </Section>

                    <Section title="Skills">
                        {mentorAboutData?.skills?.map((skill, index) => (
                            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                                {skill}
                            </span>
                        ))}
                    </Section>

                    <Section title="Achievements">
                        {mentorAboutData?.achievements?.map((achievement, index) => (
                            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                                {achievement}
                            </span>
                        ))}
                    </Section>

                    <Section title="Areas of Expertise">
                        {mentorAboutData?.areaOfExpertise?.map((area, index) => (
                            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                                {area}
                            </span>
                        ))}
                    </Section>

                    <Section title="Social Media Handles">
                        <div className="flex flex-wrap gap-4">
                            {mentorAboutData?.socialMediaLinks && Object.entries(mentorAboutData.socialMediaLinks).map(([platform, url], index) => (
                                <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                                    {platform === 'email' ? <Mail size={20} /> : platform === 'github' ? <Github size={20} /> : platform === 'linkedin' ? <Linkedin size={20} /> : <Twitter size={20} />}
                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </a>
                            ))}
                        </div>
                    </Section>

                    <Section >
                        {/* <input
                            type="date"
                            className="mb-4 p-2 bg-gray-300 border rounded w-full"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                        />
                        {mentorAboutData?.timePreferences?.length > 0 ? (
                            mentorAboutData.timePreferences.map((daySchedule, index) => (
                                <div key={index} className="bg-gray-200 p-2 rounded-lg mb-2">
                                    <h2 className="font-semibold">{daySchedule.day}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {daySchedule.times.map((timeSlot, i) => (
                                            <button 
                                                key={i} 
                                                className={`px-3 py-1 rounded ${selectedSlot?.day === daySchedule.day && selectedSlot?.time === timeSlot.time ? 'bg-green-500 text-white' : 'bg-blue-600 text-white'}`} 
                                                onClick={() => handleSlotBooking(daySchedule.day, timeSlot.time)}
                                            >
                                                {timeSlot.time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No time preferences available</p>
                        )} */}

                        <button onClick={()=>navigate("/bookAppointment")} className='bg-orange-500 py-1 px-2 text-white font-semibold rounded-md'>Book Appoiment</button>
                    </Section>
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex flex-wrap gap-2">{children}</div>
    </div>
);

export default MentorAboutPage;