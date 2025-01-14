import React from "react";
import Map from "react-map-gl";
import { getMapConfig } from "@/utils/map";

interface EventLocationProps {
  latitude: number;
  longitude: number;
}

export const EventLocation: React.FC<EventLocationProps> = ({
  latitude,
  longitude,
}) => {
  const mapConfig = getMapConfig(latitude, longitude);
  return (
    <div className="h-64 mt-4 rounded-lg overflow-hidden">
      <Map {...mapConfig} />
    </div>
  );
};
