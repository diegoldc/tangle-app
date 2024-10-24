import { Link } from "react-router-dom";
import notFound from "../assets/notFound.png";
import { Button } from "flowbite-react";

function NotFoundPage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img
        style={{ width: "90vw", maxWidth: "500px", borderRadius: "75px" }}
        src={notFound}
        alt=""
      />
      <h1>It's easy to lose your way when you're exploring...</h1>
      <Link to="/">
        <Button className="w-2/3 m-auto mt-6 !bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          Home
        </Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
