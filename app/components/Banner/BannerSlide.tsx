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
    
    <div className="absolute inset-0 flex flex-col justify-center px-16">
      <h1 className="text-4xl font-bold text-white mb-4" style={{ fontSize: '2rem' }}>{banner.title}</h1>
      <p className="text-xl text-white mb-6" style={{ fontSize: '0.8rem' }}>{banner.description}</p>
      <div>
        <Link 
          href={banner.ctaLink} 
          className="bg-white text-black text-sm font-medium py-1 px-6 rounded-full hover:bg-opacity-90 inline-block"
        >
          {banner.ctaText}
        </Link>
      </div>
    </div>
  </div>
); 