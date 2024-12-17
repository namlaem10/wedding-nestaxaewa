import React from "react";
import Map from "react-map-gl";
import { Event } from "../types";
import { formatEventDate } from "../utils/date";
import { getMapConfig } from "../utils/map";
import { EventCard } from "./event/EventCard";

interface EventInfoProps {
  event: Event;
}

export const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-12">Event Details</h2>
        <div className="grid md:grid-cols-1 gap-8 text-center">
          <EventCard event={event} />
        </div>
      </div>
    </section>
  );
};
