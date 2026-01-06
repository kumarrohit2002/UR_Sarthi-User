import { useContext } from "react";
import { mentorContext } from "../context/MentorContext";
import { Link } from "react-router-dom";

const MyBookingCard = ({ item }) => {
  const { formatDate } = useContext(mentorContext);

  if (!item || !item.mentorId) return null;

  const { mentorId, slot, status, roomNo } = item;
  const { name, profilePic, title } = mentorId;

  const slotDate = new Date(slot);
  const now = new Date();
  const minutesDiff = (slotDate - now) / (1000 * 60);

  const canJoin =
    status === "JOIN" &&
    minutesDiff <= 10 && // allow join 10 mins before
    minutesDiff >= -60;  // block very old sessions

  const date = formatDate(slot);

  return (
    <div className="flex bg-gray-300 text-black p-3 rounded-md gap-4 w-[500px]">
      <img
        src={profilePic}
        className="w-28 h-28 rounded-full object-cover"
        alt={`${name}'s profile`}
      />

      <div className="flex flex-col gap-1">
        <p className="font-semibold">{`Mentor: ${name}`}</p>
        <p className="text-sm text-gray-700">{title}</p>

        <p>
          Status:{" "}
          <span
            className={`font-semibold ${
              status === "JOIN"
                ? "text-blue-600"
                : status === "COMPLETED"
                ? "text-green-700"
                : "text-gray-700"
            }`}
          >
            {status}
          </span>
        </p>

        <p className="text-sm">{`Slot: ${date}`}</p>

        {/* JOIN BUTTON */}
        {canJoin && (
          <Link
            to={`/room/${roomNo}`}
            className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Join Session
          </Link>
        )}
      </div>
    </div>
  );
};

export default MyBookingCard;
