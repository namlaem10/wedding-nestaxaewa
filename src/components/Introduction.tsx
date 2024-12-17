import React from "react";
import Image from "next/image";

interface IntroductionProps {
  groomName: string;
  brideName: string;
  welcomeMessage: string;
  coverImage: string;
}

export const Introduction: React.FC<IntroductionProps> = ({
  groomName,
  brideName,
  welcomeMessage,
  coverImage,
}) => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt="Couple cover photo"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-6xl font-serif mb-4">
          {groomName} & {brideName}
        </h1>
        <p className="text-xl max-w-2xl mx-auto font-light">{welcomeMessage}</p>
      </div>
    </section>
  );
};
