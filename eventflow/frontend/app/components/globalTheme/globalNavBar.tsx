import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "~/redux/actions/auth/Auth-actionCreators";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { Dropdown, Image } from "react-bootstrap";
import type { EventCardProps } from '~/types/events';

const GlobalNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<EventCardProps[]>([]);
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isUserLoggedIn = useAppSelector(state => state.auth.isAuthenticated);

  const currentUser = useAppSelector(state => state.auth.currentUser);
  const [showDropdown, setShowDropdown] = useState(false);

  // Reset user state to null
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await fetch(`/api/events/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (err) {
      setSearchResults([]);
    }
  };

  const mockLocations = ["Nova Scotia", "Toronto", "New York", "Vancouver"];
  const [locationIndex, setLocationIndex] = useState(0);

  const handleLocationClick = () => {
    setLocationIndex((prevIndex) => (prevIndex + 1) % mockLocations.length);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 shadow-sm bg-white">
      {/* Left: Logo */}
      <div
        className="text-orange-500 font-bold text-xl sm:text-2xl whitespace-nowrap mr-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        eventflow
      </div>

        {/* Center: Search Box */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 shadow-sm gap-2 flex-grow mx-2 max-w-[60%] sm:max-w-xl">
            {/* Search Icon & Input */}
            <div className="flex items-center flex-grow">
              <input
                type="text"
                className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search events"
              />
            </div>
            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-gray-300" />
            {/* Interactive Location */}
            <button
              className="hidden sm:flex items-center text-sm text-gray-700 hover:text-pink-600 transition whitespace-nowrap"
              onClick={handleLocationClick}
            >
              <FaMapMarkerAlt className="text-pink-500 mr-1" />
              <span className="whitespace-nowrap">{mockLocations[locationIndex]}</span>
            </button>
            {/* Search Button */}
            <button
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition shrink-0"
              onClick={handleSearch}
            >
              <FaSearch className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Right: Hamburger Menu */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <FaBars className="text-gray-800 text-xl" />
          </button>
        </div>

        {/* Right: Desktop Nav */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } sm:flex items-center space-x-3 text-sm text-black ml-4 w-full sm:w-auto`}
        >
          <button className="hover:bg-gray-100 px-2 py-1 rounded transition">
            Events
          </button>
          <Link
            to="/help-center"
            className="hover:bg-gray-100 px-2 py-1 rounded transition text-black focus:outline-none"
            style={{ fontWeight: 400, textDecoration: 'none !important' }}
          >
            Help Center
          </Link>
        {isUserLoggedIn ? (
          <Dropdown align="end" show={showDropdown} onToggle={setShowDropdown}>
            <Dropdown.Toggle
              as="span"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                border: "none",
                background: "none",
                boxShadow: "none",
              }}
            >
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  currentUser?.name || "U"
                )}&background=random&rounded=true&size=32`}
                roundedCircle
                width={32}
                height={32}
                alt="profile"
              />
              <span style={{ marginLeft: 8 }}>{currentUser?.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => navigate('/account')}>Account Setting</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hover:bg-gray-100 px-2 py-1 rounded transition">
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default GlobalNavBar;
