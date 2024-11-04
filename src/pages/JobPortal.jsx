import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { mentorContext } from "../context/MentorContext";
import { Link } from "react-router-dom";

const JobPortal = () => {
    const { getAllJobPortal, allJobPortal } = useContext(mentorContext);
    console.log(allJobPortal);
    useEffect(() => {
        getAllJobPortal();
    }, [])
    return (
        <div>
            <Header />
            <div className="mt-10">
                <h1>Job Portal</h1>
                <div className="flex flex-col justify-center items-center mt-20">
                    {
                        allJobPortal.map((item, idx) => (
                            <div key={idx} className="bg-white text-black  p-6 rounded-lg shadow-lg w-80 transition-transform transform hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
                                <h2 className="text-xl font-bold mb-2">{`Company: ${item.company}`}</h2>
                                <p className="text-gray-700 mb-2">{`Location: ${item.location}`}</p>
                                <p className="text-gray-500 mb-2">{`Type of Work: ${item.typeOfWork}`}</p>
                                <div className="flex gap-4">
                                    <p>Skills:</p>
                                    <div>
                                    {item.Skillrequirements.map((skill, idx) => (
                                        <p key={idx} className="border p-1 rounded-lg bg-slate-300">{skill}</p>
                                    ))
                                    }
                                    </div>
                                </div>
                                <p className="text-gray-500 mb-2">{item.jobType}</p>
                                <p className="text-gray-500 mb-2">{`Experience: ${item.experienceMin}yr-${item.experienceMax}yr`}</p>
                                <p className="text-gray-500 mb-2">{`Salary: ${item.salarymin} Lpa-${item.salarymax} Lpa`}</p>
                                <Link to='/job-apply'
                                    className="text-blue-500 bg-gray-400 p-1 rounded hover:underline"
                                >
                                    Apply Now
                                </Link>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default JobPortal;