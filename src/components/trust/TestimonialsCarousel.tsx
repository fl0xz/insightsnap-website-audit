"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

interface TestimonialsCarouselProps {
  testimonials?: Testimonial[];
  autoplay?: boolean;
  interval?: number; // in milliseconds
  className?: string;
}

// Default testimonials data
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "GrowthMetrics",
    role: "Marketing Director",
    quote: "InsightSnap completely transformed how we monitor our website performance. The detailed accessibility reports helped us improve our WCAG compliance score by 32% in just two weeks.",
    avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "David Chen",
    company: "TechFrontier",
    role: "CTO",
    quote: "As a technical founder, I appreciate the depth of analysis InsightSnap provides. The API monitoring dashboard caught critical issues before they affected our customers. Worth every penny!",
    avatarUrl: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "Shopverse",
    role: "E-commerce Manager",
    quote: "Our conversion rates increased by 18% after implementing the recommendations from InsightSnap's audit. The synthetic transaction monitoring helped us identify and fix checkout issues we didn't even know existed.",
    avatarUrl: "https://randomuser.me/api/portraits/women/17.jpg"
  },
  {
    id: 4,
    name: "Michael Thompson",
    company: "Agency Blueprint",
    role: "Director of Development",
    quote: "With the white-label reports, we now offer website audits as a value-add service to our clients. It's opened a new revenue stream while providing actionable insights our clients love.",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 5,
    name: "Olivia Parker",
    company: "FitnessFusion",
    role: "Digital Marketing Lead",
    quote: "The real-time monitoring alerts saved us during our product launch. We were able to quickly scale our servers when traffic spiked. The post-audit report gave us a clear roadmap for improvements.",
    avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg"
  }
];

export default function TestimonialsCarousel({
  testimonials = defaultTestimonials,
  autoplay = true,
  interval = 5000,
  className = ""
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Navigate to the next testimonial
  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Navigate to the previous testimonial
  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Set up autoplay
  useEffect(() => {
    if (!autoplay || isPaused) return;
    
    const timer = setInterval(() => {
      nextTestimonial();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoplay, interval, isPaused, currentIndex]);

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0
    })
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-3xl px-4 md:px-8 py-8">
        {/* Testimonial Cards */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, type: "tween" }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-purple-100">
                  <Image
                    src={testimonials[currentIndex].avatarUrl}
                    alt={`${testimonials[currentIndex].name}'s profile`}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <svg className="h-8 w-8 text-purple-300 mb-1 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    {testimonials[currentIndex].quote}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-md text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
} 