import { useContext } from 'react';
import {mentorContext} from '../context/MentorContext';
import { useNavigate } from 'react-router-dom';


const MentorCard = ({ item }) => {
    const {setMentorAboutData}=useContext(mentorContext);
    const navigate=useNavigate();
    const skills=item.skills||[];
    const aboutSection=()=>{
        // setMentorAboutData(item);
        localStorage.setItem('about_id',item._id);
        navigate('/mentorabout')
    }

    return (
        <div className="bg-[#0F172A] border-solid border-2 border-white  w-[300px] mb-2 mr-[17px] px-2 pb-2 gap-2 flex flex-col items-center justify-center rounded-lg">
            <div className="">
                    <img className="overflow-hidden h-[200px] w-[200px] rounded p-2" src={item.profilePic} alt="profile-pic" />
            </div>
            <div>
                <div className="flex justify-between  mb-2">
                    <h1 className="text-lg  text-[15px]">{item.name}</h1>
                    <h1 className=" text-[10px] text-[black] border-solid border-2 px-2 bg-blue-200 border-blue-400 rounded-lg p-[0px]">{item.title}</h1>
                </div>
                <p className="mb-2 text-sm text-gray-200">{item.aboutSection}</p>
                <div className='flex flex-wrap'>
                    {
                        skills.map((skill,index)=>
                        <h1 key={index} className=" text-[10px] text-[black] border-solid border-2 mr-2 mb-2 px-2 bg-blue-200 border-blue-400 rounded-lg p-[0px]">
                            {skill}
                        </h1>)
                    }
                </div>
                
                <div className="flex justify-between mt-2">
                    <p>Rating</p>
                    <button onClick={()=>aboutSection()} className="border-solid border-[1px] border-sky-500 text-sky-500 px-2 py-1 rounded-md">Appoint Now</button>
                </div>
            </div>
        </div>
        
    )
}

export default MentorCard;