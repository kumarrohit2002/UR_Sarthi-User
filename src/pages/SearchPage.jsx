import { useContext } from "react"
import Header from "../components/Header"
import {mentorContext} from "../context/MentorContext"
import MentorCard from "../components/MentorCard";

const SearchPage = () => {
    const {searchMentor}=useContext(mentorContext);


  return (
    <div>
        <div>
            <Header/>
        </div>
        <div className=" flex flex-wrap justify-center items-center gap-4 mt-20">
            {
                searchMentor.length > 0 ? searchMentor.map((item,idx)=>(
                    <MentorCard item={item} key={idx}/>
                )):
                <div>No Data available</div>
            }
        </div>
    </div>
  )
}

export default SearchPage