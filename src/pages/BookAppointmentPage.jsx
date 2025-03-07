import { useContext, useEffect, useState } from "react";
import { mentorContext } from "../context/MentorContext";

const BookAppointmentPage = () => {
    const { mentorAboutData, getMentorAboutData, CheckoutHandler } = useContext(mentorContext);

    useEffect(() => {
        getMentorAboutData();
    }, []);
    console.log(mentorAboutData);

    const timePreferences = mentorAboutData?.timePreferences;

    if (!timePreferences) {
        return <div className="text-center text-red-500 text-lg font-semibold">Not Available Mentor For Booking</div>;
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

    // Generate hour options (1 to 12)
    const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
    
    // Generate minute options (00 to 59)
    const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    return (
        <div className="border-2 border-gray-300 p-6 max-w-md mx-auto mt-6 shadow-lg rounded-md bg-white">
            <h1 className="text-xl font-bold mb-4 text-center">Mentor Availability</h1>
            
            <div className="mb-4">
                <p className="text-gray-700">
                    <span className="font-semibold">Week:</span> {timePreferences.startWeekDay} to {timePreferences.endWeekDay}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Time:</span> {timePreferences.dayStartTime} to {timePreferences.dayEndTime}
                </p>
            </div>

            {/* Booking Section */}
            <div className="space-y-3">
                <label className="block font-medium">Date:</label>
                <input
                    name="date"
                    value={bookingTime.date}
                    type="date"
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

                <label className="block font-medium">Time:</label>
                <div className="flex gap-2">
                    {/* Hour Dropdown */}
                    <select
                        name="hour"
                        value={bookingTime.hour}
                        onChange={handleChange}
                        className="border p-2 rounded w-1/3"
                    >
                        {hourOptions.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>

                    {/* Minute Dropdown */}
                    <select
                        name="minute"
                        value={bookingTime.minute}
                        onChange={handleChange}
                        className="border p-2 rounded w-1/3"
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
                        onChange={handleChange}
                        className="border p-2 rounded w-1/3"
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <label className="block font-medium">For Hours:</label>
                <input
                    name="forHour"
                    value={bookingTime.forHour}
                    type="number"
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    min="1"
                />
            </div>

            {/* Checkout Button */}
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full transition duration-300"
                onClick={() =>
                    CheckoutHandler(
                        mentorAboutData.name,
                        mentorAboutData.perHourcharge* bookingTime.forHour,
                        mentorAboutData,
                        bookingTime.date,
                        `${bookingTime.hour}:${bookingTime.minute} ${bookingTime.ampm}`
                    )
                }
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default BookAppointmentPage;
