import { AuthContext } from "../context/auth.context";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import imgLogo from "../assets/forms-logo.png";

function Banner() {
  const [showBanner, setShowBanner] = useState(true);

  const { isLoggedIn } = useContext(AuthContext);

  const handleClose = () => {
    setShowBanner(false);
  };

  return (
    <div>
      {!isLoggedIn && showBanner && (
        <div
          id="marketing-banner"
          tabIndex="-1"
          className="fixed z-50 flex w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600 gap-2"
          style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}
        >
          <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
            <Link to={`/`}
              href="https://flowbite.com/"
              className="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600"
            >
              <img src={imgLogo} className="h-6 me-2" alt="Tangle Logo" />
              <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                Tangle
              </span>
            </Link>
          </div>
          <div>
            <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              Log in to upload your projects and connect with others, build your developer web!
            </p>
          </div>
          <div className="flex items-center flex-shrink-0">
            <a
              href="#"
              className="px-5 py-2 me-2 text-xs font-medium text-white bg-deep-purple rounded-lg hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Log in
            </a>
            <button
              data-dismiss-target="#marketing-banner"
              type="button"
              className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close banner</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;