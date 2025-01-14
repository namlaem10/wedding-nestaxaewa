import { useTranslation } from "next-i18next";
import React from "react";
import { Event } from "../types";
import { EventCard } from "./event/EventCard";

interface EventInfoProps {}

const EVENTs: Event[] = [
  {
    title: "eventInfo.wedding.title",
    date: new Date("2025-01-18T00:00:00"),
    time: "9:00 AM",
    address: "eventInfo.wedding.address",
    addressUrl: "https://maps.app.goo.gl/tUHsCiqLZvEgx8XU8",
  },
  {
    title: "eventInfo.bridal.title",
    date: new Date("2025-01-18T00:00:00"),
    time: "7:30 AM",
    address: "eventInfo.bridal.address",
    addressUrl: "https://maps.app.goo.gl/mnjCniQaeAnc8HaU6",
  },
  {
    title: "eventInfo.bride.title",
    date: new Date("2025-01-18T00:00:00"),
    time: "11:00 AM",
    address: "eventInfo.bride.address",
    addressUrl: "https://maps.app.goo.gl/XRt2n2zyUR3iS9Gk6",
  },
  {
    title: "eventInfo.wedding_celebration.title",
    date: new Date("2025-01-19T00:00:00"),
    time: "10:30 AM",
    address: "eventInfo.wedding_celebration.address",
    addressUrl: "https://maps.app.goo.gl/pefKk64uRE24oNJY6",
  },
  {
    title: "eventInfo.groom.title",
    date: new Date("2025-01-19T00:00:00"),
    time: "18:00 PM",
    address: "eventInfo.groom.address",
    addressUrl: "https://maps.app.goo.gl/8pxWbKC6e3tXCHTq8",
  },
];

export const EventInfo: React.FC<EventInfoProps> = ({}) => {
  const { t } = useTranslation("common", { useSuspense: false });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-12">
          {t("eventInfo.event_detail")}
        </h2>
        <div className="grid md:grid-cols-1 gap-8 text-center">
          {EVENTs.map((event) => (
            <EventCard event={event} key={event.title} />
          ))}
        </div>
      </div>
    </section>
  );
};
