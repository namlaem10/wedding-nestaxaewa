import { BackgroundMusic } from "@/components/backgroundMusic";
import { COVER_IMAGES, PHOTOS, STORY_SECTIONS } from "@/constants";
import { Countdown } from "../components/countdown/Countdown";
import { EventInfo } from "../components/EventInfo";
import { PhotoGallery } from "../components/gallery/PhotoGallery";
import { GuestMessages } from "../components/GuestMessages";
import { Introduction } from "../components/Introduction";
import { OurStory } from "../components/OurStory";
import { Event } from "../types";

// Sample data - replace with your actual data
const WEDDING_DATE = new Date("2025-01-18T00:00:00");

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
  return (
    <main>
      <BackgroundMusic />
      <Introduction
        groomName="Nhi"
        brideName="Đăng"
        welcomeMessage="We joyfully invite you to celebrate our wedding"
        coverImage={COVER_IMAGES}
      />

      <Countdown targetDate={WEDDING_DATE} />

      <OurStory sections={STORY_SECTIONS} />

      <PhotoGallery photos={PHOTOS.slice(0, 6)} />

      <EventInfo event={EVENT} />

      <GuestMessages />
    </main>
  );
}
