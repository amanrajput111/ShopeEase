import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
 

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600",
    title: "Welcome to MyShop",
    subtitle: "Discover amazing products at unbeatable prices.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600",
    title: "Latest Fashion",
    subtitle: "Up to 50% OFF on selected products.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600",
    title: "Electronics Sale",
    subtitle: "Best gadgets at the best prices.",
  },
];

export default function Hero() {

   const navigate= useNavigate()



   const handleShope=()=>{
    navigate('/products')
   }
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation
      className="w-full h-[550px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-[550px] bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-8 md:px-20 text-white">
              <h1 className="text-4xl md:text-6xl font-bold">
                {slide.title}
              </h1>

              <p className="mt-4 text-lg md:text-xl max-w-xl">
                {slide.subtitle}
              </p>

              <button className="mt-8 w-44 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition duration-300 font-semibold" 
              onClick={handleShope}>
                SHOP NOW
                
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}