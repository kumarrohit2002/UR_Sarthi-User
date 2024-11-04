import { useContext } from "react";
import Header from "../components/Header"
import {mentorContext} from '../context/MentorContext';
import MentorCard from "../components/MentorCard";
import Categorycard from "../components/CategoryCard"

const Category = () => {
  const {searchHandler,searchMentor}=useContext(mentorContext);

  const categorys=['ALL','Full Stack','Data Science','Cloud Computing','AI/ML'];

  return (
    <div>
        <Header/>
        <div className="mt-20">
            <div className="flex gap-4 justify-center items-center">
              {
                categorys.map((category,idx)=>(
                  <p onClick={()=>searchHandler(category)} className="cursor-pointer" key={idx}>{category}</p>
                ))
              }
            </div>
            <div className="flex flex-col justify-center items-center mt-5">
              {
                searchMentor.map((item,idx)=>(
                  <Categorycard item={item} key={idx}/>
                ))
              }
            </div>
        </div>
    </div>
  )
}

export default Category;