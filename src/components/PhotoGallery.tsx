'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface PhotoGalleryProps {
  images: string[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* Photo Gallery */}
      <div className="flex gap-2 mb-12 relative h-28 justify-center">
        {images.map((src, index) => (
          <div
            key={index}
            className="w-24 h-24 bg-gray-200 border-4 border-white shadow-md absolute top-0 transition-transform hover:z-10 hover:scale-105 duration-300 cursor-pointer"
            style={{
              transform: `rotate(${(index - 1) * 6}deg) translateX(${(index - 1) * 50}px)`,
              zIndex: index
            }}
            onClick={() => setSelectedImage(src)}
          >
            <img
              src={src}
              alt="Memory"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
