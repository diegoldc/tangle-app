import { Carousel } from "flowbite-react";

function ScreenshotsCarousel({ projectInfo }) {
  // if (projectInfo === null) {
  //   return <div>...spinner</div>;
  // }

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={5000}>
        {projectInfo.screenshots.map((screenshot, index) => (
          <img key={index} src={screenshot} alt="screenshot" />
        ))}
      </Carousel>
    </div>
  );
}

export default ScreenshotsCarousel;
