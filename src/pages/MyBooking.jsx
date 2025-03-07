import { useContext, useEffect } from 'react';
import { mentorContext } from '../context/MentorContext';
import MyBookingCard from '../components/MyBookingCard';
import Header from '../components/Header';
import Loader from '../components/Loader';

const MyBooking = () => {
    const { getMyBooking, myBookingData, isLoading} = useContext(mentorContext);
    
    
    useEffect(() => {
        getMyBooking();
    }, []);

    console.log(myBookingData);

    if(isLoading) {
        return <div>
            <Loader/>
        </div>;
    }

    return (
        <div>
            <Header/>
            <div className="flex flex-col justify-center items-center  mt-24 gap-2 p-2">
            {
                myBookingData.length > 0 ? (
                    myBookingData.map((item, idx) => (
                        <MyBookingCard key={idx} item={item} />
                    ))
                ) : (
                    <div>No bookings available</div>
                )
            }
        </div>
        </div>
    );
};

export default MyBooking;
