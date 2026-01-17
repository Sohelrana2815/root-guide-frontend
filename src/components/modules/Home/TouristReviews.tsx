/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SectionHeader from "./SectionHeader";
const TouristReviews = ({ reviews }: { reviews: any[] }) => {
  return (
    <>
      <section className="max-w-4/5 mx-auto p-4">
        <SectionHeader
          title="Voices of Our Travelers"
          subtitle="Hear from the community of adventurers who have explored the world's most breathtaking landscapes with us."
        />
      </section>
      <section className="py-20  bg-card max-w-4/5 mx-auto p-4 border border-primary/20 shadow-sm rounded-md dark:shadow dark:shadow-primary/80">
        <div className="max-w-4xl mx-auto px-4">
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            className="pb-12"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="flex flex-col items-center text-center">
                  {/* User Photo */}
                  <div className="relative w-24 h-24 mb-6">
                    <Image
                      src={review.touristId?.photo || "/userPlaceholder.png"}
                      alt={review.touristId?.name}
                      fill
                      className="rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>

                  {/* Comment */}
                  <p className="text-xl md:text-2xl text-muted-foreground italic font-light mb-8 leading-relaxed">
                    &quot;{review.comment}&quot;
                  </p>

                  {/* Name & Rating */}
                  <h3 className="text-blue-500 font-semibold text-lg uppercase tracking-wider">
                    {review.touristId?.name}
                  </h3>

                  <div className="flex gap-1 mt-2 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating ? "fill-current" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx global>{`
          .swiper-pagination-bullet-active {
            background: #3b82f6 !important;
          }
        `}</style>
      </section>
    </>
  );
};

export default TouristReviews;
