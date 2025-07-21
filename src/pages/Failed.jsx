import { Link } from "react-router-dom";
import Header from "../components/Header";

const Failed = () => {
  return (
    <div>
        <Header/>
        <div className="mt-20 flex flex-col justify-center items-center gap-4">
            <h1>Your Payment failed</h1>
            <Link to='/' >
                <p className="bg-orange-600 p-1 text-center w-52 rounded">Please Try Again</p>
            </Link>
        </div>
    </div>
  )
}

export default Failed;