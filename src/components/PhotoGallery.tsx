import React from 'react';
import Gallery from 'react-photo-gallery';
import { Photo } from '../types';

interface PhotoGalleryProps {
  photos: Photo[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-12">Our Story</h2>
        <Gallery photos={photos} />
      </div>
    </section>
  );
};