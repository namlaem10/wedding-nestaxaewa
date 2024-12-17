import React from "react";
import Image from "next/image";
import { Photo } from "@/types";

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  onPhotoClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo, index) => (
        <div
          key={index}
          className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-lg"
          onClick={() => onPhotoClick(index)}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Optional: Add hover overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </div>
      ))}
    </div>
  );
};
