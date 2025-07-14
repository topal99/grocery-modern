"use client"; // <--- TAMBAHKAN BARIS INI

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface Banner {
  image_url: string;
  title: string;
  subtitle: string;
  link: string;
}

const HeroSlider: React.FC<{ banners: Banner[] }> = ({ banners }) => {
  return (
    <div className="hero-slider-container -z-10">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[300px] md:h-[550px]">
              <Image
                src={banner.image_url}
                alt={banner.title}
                layout="fill"
                objectFit="cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-2">
                  {banner.title}
                </h1>
                <p className="text-lg md:text-xl mb-4">{banner.subtitle}</p>
                <a
                  href={banner.link}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;