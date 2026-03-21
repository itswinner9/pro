/**
 * SEO-critical pages: service+city and city/area landing pages.
 * Used for sitemap, generateStaticParams, and page content.
 */

export const SERVICE_CITY_SLUGS = [
  "drain-cleaning-surrey-bc",
  "plumbing-repairs-vancouver",
  "bathroom-repairs-lower-mainland",
  "tile-installation-burnaby",
  "handyman-services-richmond",
  "emergency-repairs-lower-mainland",
] as const;

export type ServiceCitySlug = (typeof SERVICE_CITY_SLUGS)[number];

export interface ServiceCityPage {
  slug: ServiceCitySlug;
  serviceKey: string;
  serviceTitle: string;
  cityName: string;
  regionLabel: string; // e.g. "Surrey BC", "Vancouver"
}

export const SERVICE_CITY_PAGES: ServiceCityPage[] = [
  { slug: "drain-cleaning-surrey-bc", serviceKey: "drain-cleaning", serviceTitle: "Drain Cleaning", cityName: "Surrey", regionLabel: "Surrey BC" },
  { slug: "plumbing-repairs-vancouver", serviceKey: "plumbing-repairs", serviceTitle: "Plumbing Repairs", cityName: "Vancouver", regionLabel: "Vancouver" },
  { slug: "bathroom-repairs-lower-mainland", serviceKey: "bathroom-repairs", serviceTitle: "Bathroom Repairs", cityName: "Lower Mainland", regionLabel: "Lower Mainland" },
  { slug: "tile-installation-burnaby", serviceKey: "tile-installation", serviceTitle: "Tile Installation", cityName: "Burnaby", regionLabel: "Burnaby BC" },
  { slug: "handyman-services-richmond", serviceKey: "handyman-services", serviceTitle: "Handyman Services", cityName: "Richmond", regionLabel: "Richmond BC" },
  { slug: "emergency-repairs-lower-mainland", serviceKey: "emergency-repairs", serviceTitle: "Emergency Repairs", cityName: "Lower Mainland", regionLabel: "Lower Mainland" },
];

export const AREA_SLUGS = ["surrey-bc", "vancouver-bc", "burnaby-bc", "richmond-bc", "coquitlam-bc"] as const;
export type AreaSlug = (typeof AREA_SLUGS)[number];

export interface AreaPage {
  slug: AreaSlug;
  name: string;
  title: string; // e.g. "Surrey, BC"
}

export const AREA_PAGES: AreaPage[] = [
  { slug: "surrey-bc", name: "Surrey", title: "Surrey, BC" },
  { slug: "vancouver-bc", name: "Vancouver", title: "Vancouver, BC" },
  { slug: "burnaby-bc", name: "Burnaby", title: "Burnaby, BC" },
  { slug: "richmond-bc", name: "Richmond", title: "Richmond, BC" },
  { slug: "coquitlam-bc", name: "Coquitlam", title: "Coquitlam, BC" },
];

export function getServiceCityBySlug(slug: string): ServiceCityPage | undefined {
  return SERVICE_CITY_PAGES.find((p) => p.slug === slug);
}

export function getAreaBySlug(slug: string): AreaPage | undefined {
  return AREA_PAGES.find((p) => p.slug === slug);
}
