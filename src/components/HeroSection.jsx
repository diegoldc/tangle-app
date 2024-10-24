import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import imgBack from "../assets/back.png";
import imgMedals from "../assets/back-medals.png";
import imgLevel from "../assets/back-level.png";

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
          <div className="container">
            <h1 className="text-hero-h">Welcome to TANGLE</h1>
            <p className="text-hero-p">
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
          className="hero-section-level"
          style={{
            backgroundImage: `url(${imgLevel})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container-level">
            <h1 className="text-hero-level-h">
              Level Up by Earning Medals! <br />
              Reach the Top Tier!
            </h1>
            <p className="text-hero-level-p">
              As you gain medals, you'll climb through 5 unique spider-themed
              levels. Each new level unlocks as you earn more medals:
              <strong>
                Interact with the community, post projects, comment, like, and
                gain followers to progress!
              </strong>
            </p>
            <ul className="text-hero-level-ul">
              <li>Level 1 - Garden Spider</li>
              <li>Level 2 - Wolf Spider</li>
              <li>Level 3 - Redback</li>
              <li>Level 4 - Tarantula</li>
              <li>Level 5 - Black Widow</li>
            </ul>
          </div>
        </section>

        <section
          className="hero-section"
          style={{
            backgroundImage: `url(${imgMedals})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container-medals">
            <h1 className="text-hero-medals-h">
              Earn Medals by Engaging <br />
              with the Community!
            </h1>
            <p className="text-hero-medals-p">
              You can earn medals by actively participating and engaging with
              the community in various ways:
              <strong>
                Post projects, comment, give likes, gain followers, and follow
                others.
              </strong>
              Start interacting and collecting medals today!
            </p>
          </div>
        </section>
      </Carousel>
    </div>
  );
}

export default HeroSection;
