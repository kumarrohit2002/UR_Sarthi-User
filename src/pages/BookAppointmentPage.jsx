import { useContext, useEffect, useState } from "react";
import { mentorContext } from "../context/MentorContext";

const BookAppointmentPage = () => {
    const { mentorAboutData, getMentorAboutData, CheckoutHandler } = useContext(mentorContext);

    useEffect(() => {
        getMentorAboutData();
    }, []);

    const timePreferences = mentorAboutData?.timePreferences;

    // Handle case where mentor data or time preferences are not yet available
    if (!mentorAboutData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-lg font-semibold text-gray-700">Loading mentor availability...</p>
            </div>
        );
    }

    if (!timePreferences) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                    <p className="text-xl text-red-600 font-bold mb-4">Mentor Not Available for Booking</p>
                    <p className="text-gray-700">Please check back later or contact support.</p>
                </div>
            </div>
        );
    }

    const [bookingTime, setBookingTime] = useState({
        date: "",
        hour: "1",
        minute: "00",
        ampm: "AM",
        forHour: 1,
    });

    const handleChange = (e) => {
        setBookingTime({
            ...bookingTime,
            [e.target.name]: e.target.value,
        });
    };

    const handleHourChange = (e) => {
        const newHour = parseInt(e.target.value, 10);
        setBookingTime(prev => ({ ...prev, hour: String(newHour) }));
    };

    const handleMinuteChange = (e) => {
        setBookingTime(prev => ({ ...prev, minute: e.target.value }));
    };

    const handleAmpmChange = (e) => {
        setBookingTime(prev => ({ ...prev, ampm: e.target.value }));
    };

    const handleDurationChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setBookingTime(prev => ({
            ...prev,
            forHour: value > 0 ? value : 1, // Ensure duration is at least 1
        }));
    };

    // Generate hour options (1 to 12)
    const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);

    // Generate minute options (00, 15, 30, 45 for better user experience)
    const minuteOptions = ["00", "15", "30", "45"];

    const calculateTotalPrice = () => {
        return (mentorAboutData.perHourcharge * bookingTime.forHour).toFixed(2);
    };

    const isBookingValid = bookingTime.date && bookingTime.forHour > 0; // Basic validation

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-4  border border-gray-200">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Book Your Session</h1>

                <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-6 rounded-md">
                    <p className="font-semibold text-lg mb-2">Mentor Availability:</p>
                    <p className="text-md">
                        <span className="font-medium">Days:</span> {timePreferences.startWeekDay} to {timePreferences.endWeekDay}
                    </p>
                    <p className="text-md">
                        <span className="font-medium">Time:</span> {timePreferences.dayStartTime} to {timePreferences.dayEndTime}
                    </p>
                    <p className="text-md mt-1">
                        <span className="font-medium">Hourly Rate:</span> ₹ {mentorAboutData.perHourcharge}.00
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Date Selection - Adjusted for one row */}
                    <div className="flex items-center gap-4"> {/* Added flex container */}
                        <label htmlFor="date" className="flex-shrink-0 text-lg font-semibold text-gray-700">
                            Select Date:
                        </label>
                        <input
                            id="date"
                            name="date"
                            value={bookingTime.date}
                            type="date"
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]} // Prevents selecting past dates
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 bg-gray-50"
                        />
                    </div>

                    {/* Time Selection - Label on the same row as dropdowns */}
                    <div className="flex items-center gap-4">
                        <label className="flex-shrink-0 text-lg font-semibold text-gray-700">
                            Select Time:
                        </label>
                        <div className="flex flex-grow gap-3"> {/* This div now flex-grows to take available space */}
                            {/* Hour Dropdown */}
                            <select
                                name="hour"
                                value={bookingTime.hour}
                                onChange={handleHourChange}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 bg-gray-50 appearance-none"
                            >
                                {hourOptions.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {String(hour).padStart(2, '0')}
                                    </option>
                                ))}
                            </select>

                            {/* Minute Dropdown */}
                            <select
                                name="minute"
                                value={bookingTime.minute}
                                onChange={handleMinuteChange}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 bg-gray-50 appearance-none"
                            >
                                {minuteOptions.map((minute) => (
                                    <option key={minute} value={minute}>
                                        {minute}
                                    </option>
                                ))}
                            </select>

                            {/* AM/PM Dropdown */}
                            <select
                                name="ampm"
                                value={bookingTime.ampm}
                                onChange={handleAmpmChange}
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 bg-gray-50 appearance-none"
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>

                    {/* Duration Input - Label on the same row as input */}
                    <div className="flex items-center gap-4">
                        <label htmlFor="forHour" className="flex-shrink-0 text-lg font-semibold text-gray-700">
                            Session Duration (Hours):
                        </label>
                        <input
                            id="forHour"
                            name="forHour"
                            value={bookingTime.forHour}
                            type="number"
                            onChange={handleDurationChange}
                            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-gray-800 bg-gray-100"
                            min="1"
                            placeholder="Enter number of hours"
                        />
                    </div>
                </div>

                {/* Total Price Display */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                    <p className="text-xl font-bold text-gray-800">Total Price:</p>
                    <p className="text-2xl font-extrabold text-green-600">₹ {calculateTotalPrice()}</p>
                </div>

                {/* Checkout Button */}
                <button
                    className={`mt-8 w-full py-3 rounded-lg text-lg font-bold transition duration-300 ease-in-out
                                ${isBookingValid
                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    onClick={() =>
                        CheckoutHandler(
                            mentorAboutData.name,
                            mentorAboutData.perHourcharge * bookingTime.forHour,
                            mentorAboutData,
                            bookingTime.date,
                            `${bookingTime.hour}:${bookingTime.minute} ${bookingTime.ampm}`
                        )
                    }
                    disabled={!isBookingValid}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default BookAppointmentPage;