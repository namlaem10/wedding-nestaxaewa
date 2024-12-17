import { COVER_IMAGES, PHOTOS } from "@/constants";
import React from "react";
import { Countdown } from "../components/countdown/Countdown";
import { EventInfo } from "../components/EventInfo";
import { PhotoGallery } from "../components/gallery/PhotoGallery";
import { GuestMessages } from "../components/GuestMessages";
import { Introduction } from "../components/Introduction";
import { CongratulationsMessage, Event } from "../types";

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
        coverImage={COVER_IMAGES}
      />

      <Countdown targetDate={WEDDING_DATE} />

      <EventInfo event={EVENT} />

      <PhotoGallery photos={PHOTOS.slice(0, 6)} />

      <GuestMessages onSubmitMessage={handleNewMessage} messages={messages} />
    </main>
  );
}
