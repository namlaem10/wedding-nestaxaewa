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
    }, 10000);

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
              fill
              quality={100}
              className="object-cover"
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
        <h1 className="text-4xl md:text-6xl font-serif mb-4 flex flex-col md:block">
          <span>{brideName}</span>
          <span className="my-2 md:my-0 md:mx-2">&</span>
          <span>{groomName}</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto font-light px-4">
          {welcomeMessage}
        </p>
      </div>
    </section>
  );
};
