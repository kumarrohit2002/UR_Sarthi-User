import { Link, useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Search } from "lucide-react";

// import { brainwave } from "../assets";
import { yourlogo } from "../assets";
import Mlogo from '../assets/Mlogo.jpg'
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useContext, useEffect, useState } from "react";
import { AuthZContext } from "../context/AuthZContext";
import { UserProfileContext } from "../context/UserProfileContext";
import { mentorContext } from "../context/mentorContext";

const Header = () => {
  const { userData, getUserData } = useContext(UserProfileContext);
  const { userLogedin, setIsLogin, setUserLogedin } = useContext(AuthZContext);
  const { searchHandler } = useContext(mentorContext);
  const [searchValue, setSearchvalue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userlogin")) {
      setUserLogedin(true);
    }
    getUserData();
  }, []);

  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div>
      <div
        className={`fixed top-0 h-[70px] pt-2 left-0 w-full z-50  border-b border-n-6 lg:bg-[#0F172A] lg:backdrop-blur-sm ${
          openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between lg:px-7.5 xl:px-10 max-lg:py-4">
          <Link to="/" className="block w-[12rem] ml-10 p-2  xl:mr-8">
            {/* <img src={brainwave} width={190} height={40} alt="Brainwave" /> */}
            <img src={Mlogo} className="w-[40px] h-[40px]" alt="Brainwave" />
          </Link>

          {/* <div className="flex bg-red-500 p-1  max-w-42 overflow-hidden rounded-md" onClick={()=>navigate('/search')} >
            <Search onClick={()=>searchHandler(searchValue)} />
            <input type="text" value={searchValue} onChange={(e)=>setSearchvalue(e.target.value)} className="outline-none " placeholder="Search Mentor" />
          </div> */}

          {/* ///////////////////////////////////// */}
          <div
            className="relative mb-4 flex  max-w-42 flex-wrap items-stretch  pt-2 overflow-hidden rounded-md"
            onClick={() => navigate("/search")}
          >
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchvalue(e.target.value)}
              className="flex-auto block rounded border border-neutral-300 bg-transparent p-2 px-3 py-[0.25rem] text-base text-neutral-700 outline-none focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
              placeholder="Search Mentor"
              aria-label="Search"
            />
            <span className="input-group-text flex items-center px-3 py-1.5 text-neutral-700 dark:text-neutral-200">
              <Search onClick={() => searchHandler(searchValue)} />
            </span>
          </div>

          {/* ///////////////////////////////////// */}

          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className="flex gap-5">
              <p
                onClick={() => navigate("/mybooking")}
                className="text-l text-white"
              >
                My Booking
              </p>
              <Link to='/category' className="text-l text-white">Category</Link>
              <Link to='/jobportal'>Job Portal</Link>
              <Link to='/free-resource'>Free Resource</Link>
              <Link  to='/aboutsection' className="text-l text-white">About</Link>
            </div>
            <HamburgerMenu />
          </nav>
          <div className="flex gap-4">
            {userLogedin ? (
              <img
                onClick={() => navigate("/profile")}
                src={userData.profilePicUrl}
                className="rounded-full h-[40px] w-[40px] mr-8"
                alt="profilePic"
              />
            ) : (
              <Link to='/'>
                <Button
                    onClick={() => setIsLogin(true)}
                    className="hidden lg:flex"
                  >
                    Sign in
                </Button>
              </Link>
            )}
            <Button
              className="ml-auto lg:hidden"
              px="px-3"
              onClick={toggleNavigation}
            >
              <MenuSvg openNavigation={openNavigation} />
            </Button>
          </div>
        </div>
      </div>
      {/* <nav className="flex justify-center space-x-4 p-4 text-sm">
        <a href="#" className="text-white hover:text-gray-800">
          All
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          Education
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          Entrepreneurship
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          Arts/creative
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          Media/production
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          Law
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          IT Services
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          Health Care
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          Finance
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          HR
        </a>
        <a href="#" className="text-white hover:text-gray-800">
          More
        </a>
      </nav> */}
    </div>
  );
};

export default Header;
