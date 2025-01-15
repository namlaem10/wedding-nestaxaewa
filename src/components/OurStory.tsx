import { STORY_SECTIONS } from "@/constants";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

export const OurStory: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useTranslation("common", { useSuspense: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const INTRO = useMemo(() => {
    return [
      {
        id: "story-1",
        title: "Quang Đăng",
        text: "ourStory.note_1",
        image: `/images/${isMobile ? "0267_CUT" : "0267"}.JPG`,
        imagePosition: "right",
      },
      {
        id: "story-2",
        title: "Tuyết Nhi",
        text: "ourStory.note_2",
        image: "/images/0309.JPG",
        imagePosition: "left",
      },
    ];
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".slide-left").forEach((el) => {
              el.classList.add("animate-fade-in", "md:animate-slide-left");
            });
            entry.target.querySelectorAll(".slide-right").forEach((el) => {
              el.classList.add("animate-fade-in", "md:animate-slide-right");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Only observe sections after the first two
    sectionRefs.current.slice(2).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          {INTRO.map((section, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 mb-24`}
            >
              {section.imagePosition === "left" ? (
                <>
                  <div className="relative h-[600px] order-2 md:order-none">
                    <div className="h-full w-full">
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
                  </div>
                  <div className="flex flex-col justify-center order-1 md:order-none">
                    <h2 className="text-4xl font-serif text-[#B5A788] mb-6">
                      {section.title.toUpperCase()}
                    </h2>
                    <p className="text-gray-600 leading-relaxed tracking-wide text-base">
                      {t(section.text)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center order-1 md:order-none">
                    <h2 className="text-4xl font-serif text-[#B5A788] mb-6">
                      {section.title.toUpperCase()}
                    </h2>
                    <p className="text-gray-600 leading-relaxed tracking-wide text-base">
                      {t(section.text)}
                    </p>
                  </div>
                  <div className="relative h-[600px] order-2 md:order-none">
                    <div className="h-full w-full">
                      <Image
                        src={section.image}
                        alt={section.title}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                        className={"object-cover rounded-lg"}
                        fill
                        quality={90}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <h2 className="text-4xl font-serif text-center mb-12">
          {t("ourStory.title")}
        </h2>
        <div className="max-w-7xl mx-auto px-4">
          {STORY_SECTIONS.map((section, index) => (
            <div
              key={index + 2}
              ref={(el) => (sectionRefs.current[index + 2] = el)}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 mb-24`}
            >
              {section.imagePosition === "left" ? (
                <>
                  <div className="relative h-[600px] slide-left opacity-0 order-2 md:order-none">
                    <div className="h-full w-full">
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
                  </div>
                  <div className="flex flex-col justify-center slide-right opacity-0 order-1 md:order-none">
                    <p className="text-gray-600 leading-relaxed tracking-wide text-base">
                      {t(section.text)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center slide-left opacity-0 order-1 md:order-none">
                    <p className="text-gray-600 leading-relaxed tracking-wide text-base">
                      {t(section.text)}
                    </p>
                  </div>
                  <div className="relative h-[600px] slide-right opacity-0 order-2 md:order-none">
                    <div className="h-full w-full">
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
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
