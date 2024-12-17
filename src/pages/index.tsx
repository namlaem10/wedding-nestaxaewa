import React from "react";
import { EventInfo } from "../components/EventInfo";
import { GuestMessages } from "../components/GuestMessages";
import { Introduction } from "../components/Introduction";
import { PhotoGallery } from "../components/PhotoGallery";
import { CongratulationsMessage, Event, Photo } from "../types";
import { Countdown } from "@/components/countdown/CountDown";

// Sample data - replace with your actual data
const WEDDING_DATE = new Date("2025-01-20T00:00:00");

const EVENT: Event = {
  title: "Wedding Ceremony",
  date: WEDDING_DATE,
  time: "2:00 PM",
  coordinates: {
    latitude: 40.7128,
    longitude: -74.006,
  },
  venue: "St. Mary's Church",
  address: "123 Church Street, City, State",
};

const PHOTOS: Photo[] = [
  {
    src: "/images/photo_2.jpeg",
    width: 4,
    height: 3,
    alt: "Couple photo 1",
  },
  {
    src: "/images/photo_3.jpeg",
    width: 4,
    height: 3,
    alt: "Couple photo 2",
  },
  // Add more photos here
];

export default function Home() {
  const [messages, setMessages] = React.useState<CongratulationsMessage[]>([]);

  const handleNewMessage = (
    message: Omit<CongratulationsMessage, "timestamp">
  ) => {
    setMessages((prev) => [...prev, { ...message, timestamp: new Date() }]);
  };

  return (
    <main>
      <Introduction
        groomName="John"
        brideName="Jane"
        welcomeMessage="We joyfully invite you to celebrate our wedding"
        coverImage="/images/photo_1.jpeg"
      />

      <Countdown targetDate={WEDDING_DATE} />

      <EventInfo event={EVENT} />

      <PhotoGallery photos={PHOTOS} />

      <GuestMessages onSubmitMessage={handleNewMessage} messages={messages} />
    </main>
  );
}
