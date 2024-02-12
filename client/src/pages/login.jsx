import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Spinner } from "flowbite-react";

function login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //checking form fields
    try {
      if (!Email || !Password) {
        setError("Please fill all the fields");
        setLoading(false);
        return;
      }
      //call the server 
      const response = await axios.post(
        "https://pwa-todo.onrender.com/auth/login",
        { Email, Password }
      );
      const userData = response.data; // pass the data to constant
      sessionStorage.setItem("user", JSON.stringify(userData)); // set user details in session storage
      console.log("Login successful");
      setSuccess("Login Successfully");
      setError("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/home");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log("Error in sign in", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while logging in.");
      }
      setLoading(false);
    }
  };

  //password visible method
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen ">
      <div className="bg-white py-6 sm:py-8 lg:py-12  ">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
            Login
          </h2>

          <form
            className="mx-auto max-w-lg rounded-lg border"
            onSubmit={handleSubmit}
          >
            {/** error  message */}
            {error && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Info alert!</span> {error}
              </Alert>
            )}
            {success && <Alert color="success">{success}</Alert>}
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                {/** email field */}
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 outline-none  ring-green-300 transition duration-100 focus:ring"
                />
              </div>
              {/**password field */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-green-300 transition duration-100 focus:ring"
                  />
                  {/** show password button */}
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {/** submit button */}
              <button
                type="submit"
                className="block rounded-lg bg-[#05674A] px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                {loading ? "Loading..." : "Log in"}
              </button>
            </div>

            {/** link to register */}
            <div className="flex items-center justify-center bg-gray-100 p-4">
              <p className="text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/sign"
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/** Spinner Component  */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <Spinner size="xl" />
        </div>
      )}
    </div>
  );
}

export default login;
