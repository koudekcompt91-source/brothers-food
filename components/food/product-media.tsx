"use client";

import Image from "next/image";
import { FoodVisual } from "@/components/food/food-visuals";

interface ProductMediaProps {
  id: string;
  image: string;
  alt: string;
  usePhoto?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Illustrated stand-in until a real photo is dropped in /public/images/products.
 * Set usePhoto on the product to switch that item to next/image.
 */
export default function ProductMedia({
  id,
  image,
  alt,
  usePhoto,
  priority,
  sizes,
  className = "",
}: ProductMediaProps) {
  if (usePhoto) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <FoodVisual
      id={id}
      label={alt}
      className={`h-full w-full object-contain ${className}`}
    />
  );
}
