import { Link, useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Search, Menu, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import Button from "./Button";
import Mlogo from "../assets/Mlogo.jpg";

import { AuthZContext } from "../context/AuthZContext";
import { UserProfileContext } from "../context/UserProfileContext";
import { mentorContext } from "../context/MentorContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userLogedin, setIsLogin, setUserLogedin } =
    useContext(AuthZContext);
  const { userData, getUserData } =
    useContext(UserProfileContext);
  const { searchHandler } =
    useContext(mentorContext);

  const [openNav, setOpenNav] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    if (localStorage.getItem("userlogin")) {
      setUserLogedin(true);
    }
    getUserData();
  }, []);

  /* ---------------- CLOSE MENU ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setOpenNav(false);
    enablePageScroll();
  }, [location.pathname]);

  /* ---------------- MENU HANDLERS ---------------- */
  const openMenu = () => {
    disablePageScroll();
    setOpenNav(true);
  };

  const closeMenu = () => {
    enablePageScroll();
    setOpenNav(false);
  };

  /* ---------------- SEARCH ---------------- */
  const handleSearch = () => {
    searchHandler(searchValue);
    closeMenu();
    navigate("/search");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-[#0F172A] border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-[70px] items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src={Mlogo} alt="logo" className="h-10 w-10 rounded" />
            <span className="text-white font-semibold hidden sm:block">
              MentorHub
            </span>
          </Link>

          {/* SEARCH DESKTOP */}
          <div className="hidden md:flex items-center bg-white rounded-md overflow-hidden">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search mentor"
              className="px-3 py-2 outline-none text-sm"
            />
            <button onClick={handleSearch} className="px-3 text-gray-600">
              <Search size={18} />
            </button>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6 text-white">
            <Link to="/mybooking">My Booking</Link>
            <Link to="/category">Category</Link>
            <Link to="/jobportal">Job Portal</Link>
            <Link to="/free-resource">Free Resource</Link>
            <Link to="/aboutsection">About</Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {userLogedin ? (
              <img
                onClick={() => navigate("/profile")}
                src={userData?.profilePicUrl || "/avatar.png"}
                alt="profile"
                className="h-9 w-9 rounded-full cursor-pointer"
              />
            ) : (
              <Button
                className="hidden lg:block"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </Button>
            )}

            {/* MOBILE MENU BUTTON */}
            <button onClick={openNav ? closeMenu : openMenu} className="lg:hidden text-white">
              {openNav ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {openNav && (
        <div className="fixed inset-0 z-40 bg-[#0F172A] pt-[80px] px-6 text-white lg:hidden">

          {/* TOP BAR */}
          <div className="flex items-center gap-3 mb-6">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search mentor"
              className="flex-1 px-3 py-2 text-sm rounded-md outline-none text-black"
            />
            <button onClick={handleSearch}>
              <Search />
            </button>
            <button onClick={closeMenu}>
              <X />
            </button>
          </div>

          {/* NAV LINKS */}
          <nav className="flex flex-col gap-5 text-lg">
            <Link to="/mybooking" onClick={closeMenu}>My Booking</Link>
            <Link to="/category" onClick={closeMenu}>Category</Link>
            <Link to="/jobportal" onClick={closeMenu}>Job Portal</Link>
            <Link to="/free-resource" onClick={closeMenu}>Free Resource</Link>
            <Link to="/aboutsection" onClick={closeMenu}>About</Link>

            {!userLogedin && (
              <Button onClick={() => { setIsLogin(true); closeMenu(); }}>
                Sign in
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
