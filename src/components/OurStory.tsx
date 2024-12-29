import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface StorySection {
  id: string;
  title: string;
  text: string;
  image: string;
  imagePosition: string;
}

interface OurStoryProps {
  sections: StorySection[];
}

export const OurStory: React.FC<OurStoryProps> = ({ sections }) => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation classes when section comes into view
            entry.target.querySelectorAll(".slide-left").forEach((el) => {
              el.classList.add("animate-slide-left");
            });
            entry.target.querySelectorAll(".slide-right").forEach((el) => {
              el.classList.add("animate-slide-right");
            });
            // Disconnect observer for this specific section only
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all section refs
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24">
      <h2 className="text-4xl font-serif text-center mb-12">Our Story</h2>
      <div className="max-w-7xl mx-auto px-4">
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${
              index !== sections.length - 1 ? "mb-24" : ""
            }`}
          >
            {section.imagePosition === "left" ? (
              <>
                <div className="relative h-[600px] slide-left opacity-0">
                  <Image
                    src={section.image}
                    alt={section.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    className="object-cover rounded-lg"
                    fill
                    quality={90}
                  />
                </div>
                <div className="flex flex-col justify-center slide-right opacity-0">
                  <h2 className="text-4xl font-serif text-[#B5A788] mb-6">
                    {section.title.toUpperCase()}
                  </h2>
                  <p className="text-gray-600 leading-relaxed tracking-wide uppercase text-sm">
                    {section.text}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center slide-left opacity-0">
                  <h2 className="text-4xl font-serif text-[#B5A788] mb-6">
                    {section.title.toUpperCase()}
                  </h2>
                  <p className="text-gray-600 leading-relaxed tracking-wide uppercase text-sm">
                    {section.text}
                  </p>
                </div>
                <div className="relative h-[600px] slide-right opacity-0">
                  <Image
                    src={section.image}
                    alt={section.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    className="object-cover rounded-lg"
                    fill
                    quality={90}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
