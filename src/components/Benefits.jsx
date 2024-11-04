import { benefits } from "../constants/index";
import Heading from "../components/Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import { mentorContext } from '../context/MentorContext'
import { useContext } from "react";
import MentorCard from "./MentorCard";


const Benefits = () => {
  const { allMentor } = useContext(mentorContext);
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Chat Smarter, Not Harder with Brainwave"
        />
        <div className="flex flex-wrap gap-1 text-white mb-10">
          {allMentor.map((item,idx) => (
            <MentorCard item={item} key={idx}/>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;


