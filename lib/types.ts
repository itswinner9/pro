export type ServiceType = 
  | 'drain-cleaning'
  | 'plumbing-repairs'
  | 'bathroom-repairs'
  | 'tile-installation'
  | 'handyman-services'
  | 'emergency-repairs';

export interface Service {
  id: ServiceType;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export const SERVICES: Service[] = [
  {
    id: 'drain-cleaning',
    title: 'Drain Cleaning',
    description: 'Professional drain cleaning services for clogged sinks, toilets, and sewer lines.',
    icon: 'droplets',
    slug: '/services/drain-cleaning',
  },
  {
    id: 'plumbing-repairs',
    title: 'Plumbing Repairs',
    description: 'Expert plumbing repairs for leaks, pipe issues, and water heater problems.',
    icon: 'wrench',
    slug: '/services/plumbing-repairs',
  },
  {
    id: 'bathroom-repairs',
    title: 'Bathroom Repairs',
    description: 'Complete bathroom renovation and repair services.',
    icon: 'bath',
    slug: '/services/bathroom-repairs',
  },
  {
    id: 'tile-installation',
    title: 'Tile Installation & Fixing',
    description: 'Professional tile installation, repair, and grout services.',
    icon: 'square',
    slug: '/services/tile-installation',
  },
  {
    id: 'handyman-services',
    title: 'Handyman Services',
    description: 'General handyman services for all your home repair needs.',
    icon: 'hammer',
    slug: '/services/handyman-services',
  },
  {
    id: 'emergency-repairs',
    title: 'Emergency Repairs',
    description: '24/7 emergency repair services for urgent plumbing and home issues.',
    icon: 'alert-circle',
    slug: '/services/emergency-repairs',
  },
];

export const LOCATIONS = [
  { name: 'Vancouver', slug: 'vancouver' },
  { name: 'Surrey', slug: 'surrey' },
  { name: 'Burnaby', slug: 'burnaby' },
  { name: 'Richmond', slug: 'richmond' },
  { name: 'Coquitlam', slug: 'coquitlam' },
  { name: 'Delta', slug: 'delta' },
  { name: 'New Westminster', slug: 'new-westminster' },
];

