import { FaYoutube } from "react-icons/fa"; // Import YouTube icon
import { ImGoogleDrive } from "react-icons/im"; // Import Google Drive icon


const FreeResourceCard =({ course })=> {
  return (
    <div className="border rounded-lg w-[340px] h-[380px] overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{course.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 font-bold mr-1">{course.rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-1">({course.reviews.toLocaleString()})</span>
        </div>
        {course.recommended && (
          <div className="flex items-center gap-4">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              Recommended
            </span>
            <a href={course.youtubeLink} target="_blank" rel="noopener noreferrer">
              <FaYoutube className="w-6 h-6 text-red-600" /> {/* Correct usage of FaYoutube */}
            </a>
            <a href={course.driveLink} target="_blank" rel="noopener noreferrer">
              <ImGoogleDrive
                className="w-6 h-6"
                style={{
                  background: 'linear-gradient(135deg, #4285F4 25%, #34A853 25%, #34A853 50%, #F4B400 50%, #F4B400 75%, #FF0B00 75%, #FF0B00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              /> {/* Apply gradient color for Google Drive */}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}


export default FreeResourceCard