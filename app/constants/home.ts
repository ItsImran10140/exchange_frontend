export const BANNER_INTERVAL = 5000;

export interface Banner {
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export const banners: Banner[] = [
  {
    image: "/home-banner-refer.png",
    title: "Refer and Earn",
    description: "Refer a friend and earn a percentage of their trading fees.",
    ctaText: "Manage Referrals",
    ctaLink: "/referrals"
  },
  {
    image: "/home-banner-season.png",
    title: "Welcome to Season 1",
    description: "Trade on Backpack to earn points and increase your rank.",
    ctaText: "View Points",
    ctaLink: "/points"
  },
  {
    image: "/home-banner-usdt.png",
    title: "Got USDT?",
    description: "Convert to USDC with 0 fees and start trading on Backpack!",
    ctaText: "Trade USDT",
    ctaLink: "/trade/USDT_USDC"
  },
];

export const markets = [
  "BTC_USDC",
  "ETH_USDC",
  "SOL_USDC",
  "ENA_USDC",
  "LINK_USDC",
  "WIF_USDC",
]; 