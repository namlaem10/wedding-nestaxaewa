import React from "react";
import Image from "next/image";

interface IntroductionProps {
  groomName: string;
  brideName: string;
  welcomeMessage: string;
  coverImage: string[];
}

export const Introduction: React.FC<IntroductionProps> = ({
  groomName,
  brideName,
  welcomeMessage,
  coverImage,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [scrollY, setScrollY] = React.useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? coverImage.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % coverImage.length);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % coverImage.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [coverImage.length]);

  const scale = 1 + scrollY * 0.001; // Adjust the 0.001 value to control scaling speed
  const opacity = Math.max(0.5, 1 - scrollY * 0.002);

  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {coverImage.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Couple cover photo ${index + 1}`}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: opacity * 0.4 }} // Multiply by 0.4 to maintain the original 40% opacity effect
        />
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
        style={{ opacity }}
      >
        <h1 className="text-6xl font-serif mb-4">
          {groomName} & {brideName}
        </h1>
        <p className="text-xl max-w-2xl mx-auto font-light">{welcomeMessage}</p>
      </div>

      <button
        onClick={handlePrevImage}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 text-white transition-transform hover:scale-150"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={handleNextImage}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white transition-transform hover:scale-150"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </section>
  );
};
