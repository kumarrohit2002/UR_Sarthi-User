import { useContext } from 'react';
import { mentorContext } from '../context/MentorContext';
import { Link } from 'react-router-dom';

const MyBookingCard = ({ item }) => {
    const { formatDate } = useContext(mentorContext);
    
    let { mentor, slot, status ,roomNo} = item;
    const { name, profilePic, title } = mentor;

    const slotDate = new Date(slot); 
    const now = new Date();
    const timeDifferenceInMinutes = (slotDate - now) / (1000 * 60);

    // if (timeDifferenceInMinutes < 0) {
    //     status = 'Done';
    // } else if (timeDifferenceInMinutes <= 30) {
    //     status = 'Join';
    // } else {
    //     status = 'Scheduled';
    // }
    status='Join'

    const date = formatDate(slot);

    const handleJoinSession = () => {
        // Logic to handle joining the session (e.g., opening a video call link)
        console.log('Join session clicked');
    };

    return (
        <div className="flex bg-gray-300 text-black p-2 rounded-md gap-4 w-[500px]">
            <img src={profilePic} className="w-32 h-32 rounded-full" alt={`${name}'s profile`} />
            <div>
                <p>{`Mentor: ${name}`}</p>
                <p>{`Title: ${title}`}</p>
                <p>Status: <span className={`text-green-700 font-semibold ${status === 'Join' ? 'text-blue-600' : ''}`}>{status}</span></p>
                <p className='mb-2'>{`Slot: ${date}`}</p>

                {/* Conditionally render the "Join" button if status is 'Join' */}
                {status === 'Join' && (
                    <Link to={`/room/${roomNo}`}
                        onClick={handleJoinSession}
                        className="mt-2 mb-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Join Session
                    </Link>
                )}
            </div>
        </div>
    );
};

export default MyBookingCard;
