import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Icon from "../../public/favicon.ico";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  //get user deta from session storage
  useEffect(() => {
    const getUser = sessionStorage.getItem("user");
    if (getUser) {
      setUserData(JSON.parse(getUser));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //logout method
  const handleServerLogout = async () => {
    try {
      //call to server
      const response = await axios.post(
        "https://pwa-todo.onrender.com/auth/logout"
      );
      console.log("Server logout response:", response.data);
      sessionStorage.removeItem("user");
      setUserData(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out from server:", error);
    }
  };

  return (
    <>
      <Navbar
        className=" w-full z-10 p-2 border bg-[#004B35] shadow-lg"
        fluid
        rounded
      >
        <Navbar.Brand href="/">
          <img src={Icon} className="mr-3 h-6 sm:h-9" alt=" Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
            TRY TODO
          </span>
        </Navbar.Brand>
        <form className="hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Search todo's"
            />
          </div>
        </form>
        <div className="flex md:order-2 mr-10">
          {isLoggedIn ? ( // Render Avatar and Dropdowns if user is logged in
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    className=" w-10 h-10 mr-10"
                    alt="User"
                    img="https://img.freepik.com/premium-vector/young-smiling-man-adam-avatar-3d-vector-people-character-illustration-cartoon-minimal-style_365941-687.jpg?w=740"
                    rounded
                  />
                }
              >
                {/** user drop down */}
                <Dropdown.Header>
                  <span className="block text-sm">{userData.Name}</span>
                  <span className="block truncate text-sm font-medium">
                    {userData.Email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item
                  className=" text-red-700 text-md"
                  onClick={handleServerLogout}
                >
                  Sign out
                </Dropdown.Item>
              </Dropdown>
              <div className=" md:hidden mt-2">
                {/** search input */}
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Search todo's"
                  />
                </div>
              </div>
            </>
          ) : (
            // Render login button if user is not logged in
            <Link to="/">
              {" "}
              <button
                type="button"
                className="  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 p-3 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-100 dark:border-gray-50"
              >
                Login Now
              </button>
            </Link>
          )}
        </div>
      </Navbar>
    </>
  );
}

export default NavBar;
