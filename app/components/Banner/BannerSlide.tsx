import Image from "next/image";
import Link from "next/link";
import { Banner } from "../../constants/home";

interface BannerSlideProps {
  banner: Banner;
  index: number;
  isActive: boolean;
}

export const BannerSlide = ({ banner, index, isActive }: BannerSlideProps) => (
  <div
    className={`absolute inset-0 transition-opacity duration-1000 ${
      isActive ? "opacity-100" : "opacity-0"
    }`}
  >
    <Image
      src={banner.image}
      alt={`Banner ${index + 1}`}
      fill
      sizes="(max-width: 1200px) 100vw, "
      style={{ objectFit: "fill", objectPosition: "center" }}
      priority
      className="rounded-lg"
    />
    
    <div className="absolute inset-0 flex flex-col justify-end items-start px-16 pb-10">
      <div className="w-[50%]">

      <h1 className="text-4xl  font-bold text-white mb-1" style={{ fontSize: '3rem' }}>{banner.title}</h1>
      <p className="text-xl text-gray-300 mb-6" style={{ fontSize: '1.1rem' }}>{banner.description}</p>
      <div>
        <Link 
          href={banner.ctaLink} 
          className="bg-white text-black text-md font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 inline-block"
          >
          {banner.ctaText}
        </Link>
          </div>
      </div>
    </div>
  </div>
); 