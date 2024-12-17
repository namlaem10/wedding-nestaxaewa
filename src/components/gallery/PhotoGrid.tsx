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
    <div
      className="
        relative 
        overflow-x-auto 
        flex 
        flex-nowrap 
        space-x-4 
        py-2 
        scrollbar-thin 
        scrollbar-track-gray-100 
        scrollbar-thumb-gray-900 
        scrollbar-thumb-rounded 
        /* If you want no scrollbar, replace above scrollbar classes with 'no-scrollbar' */
      "
    >
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className="
            relative 
            flex-none 
            w-96 h-64 
            cursor-pointer 
            group 
            overflow-hidden 
            rounded-lg
          "
          onClick={() => onPhotoClick(index)}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </div>
      ))}
    </div>
  );
};
