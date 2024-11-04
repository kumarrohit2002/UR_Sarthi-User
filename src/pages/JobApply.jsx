import Header from "../components/Header";

const JobApply = () => {


    
  return (
    <div>
        <Header/>
        <div className="mt-20 bg-slate-800">
           <div className="flex flex-col">
                <label>Upload Resume</label>
                <input type="file" />
           </div>
        </div>
    </div>
  )
}

export default JobApply;