import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import imgBack from "../assets/back.png";

function HeroSection() {
  return (
    <div>
      <Carousel indicators={false}>
        <section
          className="hero-section"
          style={{
            backgroundImage: `url(${imgBack})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container"
          >
            <h1 className="text-hero">Welcome to TANGLE</h1>
            <p className="text-hero">
              In <strong>TANGLE</strong>, we help you develop inovative proyects
              and expand your skills. Discover new projects, enlarge your web
              and get tangled in it!
            </p>

            <Link to="/signup">
              <Button className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                Sign up
              </Button>
            </Link>
          </div>
        </section>

        <section
          className="hero-section"
          style={{
            backgroundImage: `url(${imgBack})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container">
            <h1 className="text-hero">Welcome to TANGLE</h1>
            <p className="text-hero">
              In <strong>TANGLE</strong>, we help you develop inovative proyects
              and expand your skills. Discover new projects, enlarge your web
              and get tangled in it!
            </p>

            <Link to="/signup">
              <Button className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                Sign up
              </Button>
            </Link>
          </div>
        </section>
      </Carousel>
    </div>
  );
}

export default HeroSection;
