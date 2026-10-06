"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { RESTAURANT } from "@/data/config";
import Reveal from "@/components/animations/reveal";
import StaggerWords from "@/components/stagger-words";

const POSTS = [
  { src: "/images/insta-1.jpg", alt: "Burger post" },
  { src: "/images/insta-2.jpg", alt: "Tacos post" },
  { src: "/images/insta-3.jpg", alt: "Fries post" },
  { src: "/images/insta-4.jpg", alt: "Wings post" },
  { src: "/images/insta-5.jpg", alt: "Milkshake post" },
  { src: "/images/insta-6.jpg", alt: "Combo post" },
];

export default function InstagramSection() {
  return (
    <section className="bg-orange py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-shell px-5 md:px-10">
        <Reveal variant="clip">
          <p className="font-display text-black/60 tracking-[0.3em] text-xs mb-3">@BROTHERSFOOD</p>
        </Reveal>
        <h2 className="headline text-black text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.9]">
          <StaggerWords text="FOLLOW THE" /> <StaggerWords text="BROTHERS" delay={0.15} />
        </h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {POSTS.map((post, i) => (
            <motion.a
              key={post.src}
              href={RESTAURANT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden bg-black"
              aria-label={`Instagram post: ${post.alt}`}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <Instagram className="text-white" size={28} />
                <span className="font-display text-white text-sm tracking-widest">VIEW POST</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
