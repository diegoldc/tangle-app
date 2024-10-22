import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "flowbite-react";
function SearchBar() {
  const [query, setQuery] = useState("");
  const [tech, setTech] = useState("");

  return (
    <div className="searchBarContainer flex gap-2 w-[70vw] flex-wrap m-auto">
      <form className="flex items-center max-w- mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M 24 4 C 18.494917 4 14 8.494921 14 14 C 14 19.505079 18.494917 24 24 24 C 29.505083 24 34 19.505079 34 14 C 34 8.494921 29.505083 4 24 4 z M 24 7 C 27.883764 7 31 10.116238 31 14 C 31 17.883762 27.883764 21 24 21 C 20.116236 21 17 17.883762 17 14 C 17 10.116238 20.116236 7 24 7 z M 11.978516 28 C 9.7987044 28 8 29.798705 8 31.978516 L 8 33.5 C 8 37.104167 10.27927 39.892227 13.306641 41.5625 C 16.334011 43.232773 20.168103 44 24 44 C 27.831897 44 31.665989 43.232773 34.693359 41.5625 C 37.274641 40.138345 39.217335 37.862616 39.761719 35 L 40.001953 35 L 40.001953 31.978516 C 40.001953 29.798705 38.201295 28 36.021484 28 L 11.978516 28 z M 11.978516 31 L 36.021484 31 C 36.579674 31 37.001953 31.420326 37.001953 31.978516 L 37.001953 32 L 37 32 L 37 33.5 C 37 35.895833 35.65427 37.607773 33.244141 38.9375 C 30.834011 40.267227 27.418103 41 24 41 C 20.581897 41 17.165989 40.267227 14.755859 38.9375 C 12.34573 37.607773 11 35.895833 11 33.5 L 11 31.978516 C 11 31.420326 11.420326 31 11.978516 31 z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Users"
            value={query}
            onChange={() => setQuery(event.target.value)}
            required
          />
        </div>
        <Link to={`/search`} state={{ query: query }}>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-deep-purple rounded-lg border border-purple-900 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </Link>
      </form>
      <form className="flex items-center max-w-sm mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 15 15"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2 5.5H13M2 9.5H13M6.5 1.5L4.5 13.5M10.5 1.5L8.5 13.5"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for Techs"
            value={tech}
            onChange={() => setTech(event.target.value)}
            required
          />
        </div>
        <Link to={`/tech/${tech}`}>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-deep-purple rounded-lg border border-purple-900 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
