export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string | null;
  category: string | null;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  is_published: boolean;
  published_at: string | null;
  views: number;
  created_at: string;
  updated_at: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "5 Signs You Need Professional Drain Cleaning",
    slug: "5-signs-you-need-professional-drain-cleaning",
    excerpt: "Slow drains, bad odors, and recurring clogs can signal it's time to call a professional. Learn when to skip the DIY and hire a pro.",
    content: `
      <p>Knowing when to call a professional plumber can save you time, money, and prevent bigger problems. Here are five clear signs you need professional drain cleaning in Lower Mainland, BC.</p>
      <h2>1. Slow Drains Throughout the House</h2>
      <p>If multiple sinks, showers, or tubs are draining slowly, the issue is likely in your main line rather than a single fixture. Professional hydro jetting or snake service can clear blockages safely.</p>
      <h2>2. Foul Odors From Drains</h2>
      <p>Persistent bad smells often indicate buildup or a partial clog. A pro can locate and remove the source and recommend preventive steps.</p>
      <h2>3. Recurring Clogs</h2>
      <p>If you're reaching for the plunger or chemical cleaners every few weeks, there may be a deeper blockage or tree root intrusion. A camera inspection can identify the cause.</p>
      <h2>4. Gurgling Sounds</h2>
      <p>Gurgling when you flush or run water can mean trapped air from a blockage or vent issue. Don't ignore it—early intervention avoids backups.</p>
      <h2>5. Water Backing Up</h2>
      <p>Water coming back up in tubs, showers, or toilets when you run the washing machine is a strong sign of a main line problem. Call a professional right away.</p>
      <p>PlusPro Services offers drain cleaning and plumbing repairs across Vancouver, Surrey, Burnaby, and the Lower Mainland. <a href="/contact">Contact us</a> for a free quote.</p>
    `,
    featured_image: null,
    author: "PlusPro Services",
    category: "Plumbing",
    tags: ["drain cleaning", "plumbing", "clogs", "Lower Mainland"],
    meta_title: "5 Signs You Need Professional Drain Cleaning | PlusPro Services",
    meta_description: "Slow drains, odors, and recurring clogs? Learn when to call a professional for drain cleaning in Vancouver, Surrey, and Lower Mainland BC.",
    meta_keywords: "drain cleaning Vancouver, professional plumber Surrey, clogged drain Burnaby",
    is_published: true,
    published_at: "2024-01-15T10:00:00Z",
    views: 0,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Emergency Plumbing: What to Do Before the Pro Arrives",
    slug: "emergency-plumbing-what-to-do-before-the-pro-arrives",
    excerpt: "A burst pipe or major leak can be stressful. Follow these steps to stay safe and minimize damage until help arrives.",
    content: `
      <p>Plumbing emergencies don't wait for business hours. Here's what to do when disaster strikes—before your plumber gets there.</p>
      <h2>Turn Off the Water</h2>
      <p>Locate the main shut-off valve (often in the basement or near the water meter) and turn it off. This stops new water from entering and limits damage.</p>
      <h2>Turn Off the Water Heater</h2>
      <p>If the leak is near the water heater or you're unsure, switch the water heater to "off" or "pilot" to avoid overheating when the tank is empty.</p>
      <h2>Open Faucets to Relieve Pressure</h2>
      <p>After shutting the main valve, open a few cold faucets to drain remaining water from the pipes and relieve pressure.</p>
      <h2>Contain Small Leaks</h2>
      <p>Use buckets, towels, or a wet-dry vacuum to contain water. Move rugs and furniture if possible to prevent further damage.</p>
      <h2>Call a Licensed Plumber</h2>
      <p>PlusPro Services offers emergency repair services across Lower Mainland, BC. We're here when you need us most.</p>
    `,
    featured_image: null,
    author: "PlusPro Services",
    category: "Emergency",
    tags: ["emergency plumbing", "leak", "burst pipe", "Vancouver"],
    meta_title: "Emergency Plumbing: What to Do Before the Pro Arrives | PlusPro",
    meta_description: "Burst pipe or major leak? Follow these steps to stay safe and limit damage before your emergency plumber arrives in Lower Mainland BC.",
    meta_keywords: "emergency plumber Vancouver, burst pipe Surrey, leak repair Burnaby",
    is_published: true,
    published_at: "2024-02-01T10:00:00Z",
    views: 0,
    created_at: "2024-02-01T10:00:00Z",
    updated_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "3",
    title: "Bathroom Repairs: When to Renovate vs. When to Repair",
    slug: "bathroom-repairs-when-to-renovate-vs-repair",
    excerpt: "Not every bathroom issue requires a full renovation. Learn when a repair is enough and when it's time for a bigger update.",
    content: `
      <p>Deciding between a quick repair and a full bathroom renovation can be tricky. Here's a practical guide for Lower Mainland homeowners.</p>
      <h2>When Repair Makes Sense</h2>
      <p>Fixing leaks, replacing a single fixture, regrouting tile, or repairing a running toilet are usually cost-effective repairs. If the layout and major materials are in good shape, repair is often the best choice.</p>
      <h2>When to Consider a Renovation</h2>
      <p>Multiple failing fixtures, persistent mold or moisture issues, or a layout that no longer works are good reasons to plan a renovation. We can handle both small repairs and full bathroom remodels.</p>
      <h2>Get a Professional Opinion</h2>
      <p>PlusPro Services provides free quotes for bathroom repairs and renovations in Vancouver, Surrey, Burnaby, Richmond, and the rest of the Lower Mainland. <a href="/request-quote">Request a quote</a> today.</p>
    `,
    featured_image: null,
    author: "PlusPro Services",
    category: "Bathroom",
    tags: ["bathroom", "renovation", "repair", "Lower Mainland"],
    meta_title: "Bathroom Repairs: Renovate vs. Repair | PlusPro Services",
    meta_description: "Should you repair or renovate your bathroom? Expert advice for Vancouver and Lower Mainland BC homeowners.",
    meta_keywords: "bathroom repair Vancouver, bathroom renovation Surrey, tile repair Burnaby",
    is_published: true,
    published_at: "2024-02-10T10:00:00Z",
    views: 0,
    created_at: "2024-02-10T10:00:00Z",
    updated_at: "2024-02-10T10:00:00Z",
  },
  {
    id: "4",
    title: "When to Call a Handyman vs. a Specialist",
    slug: "when-to-call-handyman-vs-specialist",
    excerpt: "Not sure whether to hire a handyman or a licensed plumber/electrician? Here's when each makes sense for Lower Mainland homeowners.",
    content: `
      <p>Home repairs can range from simple fixes to complex projects. Knowing when to call a handyman versus a licensed specialist saves time and money.</p>
      <h2>Handyman Jobs</h2>
      <p>General handymen handle small repairs: drywall patches, door adjustments, furniture assembly, painting touch-ups, minor caulking, and basic fixture swaps. For non-plumbing, non-electrical work, a skilled handyman is often the right choice.</p>
      <h2>When You Need a Specialist</h2>
      <p>Plumbing work involving supply lines, drain lines, or gas requires a licensed plumber. Electrical work beyond replacing a light bulb needs a certified electrician. Major structural or permit-required work should go to licensed contractors.</p>
      <h2>PlusPro Can Help</h2>
      <p>PlusPro Services offers both handyman services and licensed plumbing work across Vancouver, Surrey, Burnaby, and the Lower Mainland. We'll direct you to the right service for your project. <a href="/contact">Contact us</a> for a free quote.</p>
    `,
    featured_image: null,
    author: "PlusPro Services",
    category: "Handyman",
    tags: ["handyman", "plumber", "home repair", "Lower Mainland", "Vancouver"],
    meta_title: "Handyman vs. Specialist: When to Call Each | PlusPro Services",
    meta_description: "Handyman or plumber? Learn when to hire a general handyman vs. a licensed specialist for home repairs in Lower Mainland BC.",
    meta_keywords: "handyman Vancouver, when to call plumber, home repair specialist Surrey",
    is_published: true,
    published_at: "2024-03-01T10:00:00Z",
    views: 0,
    created_at: "2024-03-01T10:00:00Z",
    updated_at: "2024-03-01T10:00:00Z",
  },
  {
    id: "5",
    title: "Seasonal Home Maintenance Checklist for the Lower Mainland",
    slug: "seasonal-home-maintenance-checklist-lower-mainland",
    excerpt: "Rain, salt air, and older plumbing make a spring and fall checkup worth it. Here is what Lower Mainland homeowners should check twice a year.",
    content: `
      <p>Home maintenance in the Lower Mainland is mostly about water: rain on the roof, moisture in bathrooms, and pipes that work hard all winter. A short seasonal visit prevents the leaks and drafts that turn into emergency calls.</p>
      <h2>Fall: before the rain settles in</h2>
      <p>Clear gutters and downspouts, reseal cracked exterior caulk, check weatherstripping on doors, and look at outdoor taps and hose bibs. Inside, check toilet bases, supply lines, and caulk around tubs and showers. These are the spots that fail first in Vancouver and Surrey winters.</p>
      <h2>Spring: after the wet season</h2>
      <p>Look for peeling paint or caulk, sticky doors, sagging screens, and slow drains after months of indoor use. If several fixtures drain slowly, the issue may be in the main line rather than one sink.</p>
      <h2>What PlusPro handles on a maintenance visit</h2>
      <p>We combine upkeep with licensed plumbing when needed: fixtures, caulking, gutters, hardware, and moisture checks. If drain cleaning or a larger repair is required, we do that work instead of sending you to a second company.</p>
      <p>Serving Vancouver, Surrey, Burnaby, Richmond, Coquitlam, and the rest of the Lower Mainland. <a href="/services/home-maintenance">Learn about home maintenance</a> or <a href="/book-service">book a visit</a>.</p>
    `,
    featured_image: null,
    author: "PlusPro Services",
    category: "Home Maintenance",
    tags: ["home maintenance", "seasonal checklist", "Lower Mainland", "Vancouver", "plumbing"],
    meta_title: "Seasonal Home Maintenance Checklist | Lower Mainland BC",
    meta_description: "Spring and fall home maintenance for Vancouver and the Lower Mainland: gutters, caulking, fixtures, and moisture checks. Book PlusPro for a visit.",
    meta_keywords: "home maintenance Vancouver, seasonal home checkup Surrey, fall gutter cleaning Burnaby, Lower Mainland upkeep",
    is_published: true,
    published_at: "2026-03-15T10:00:00Z",
    views: 0,
    created_at: "2026-03-15T10:00:00Z",
    updated_at: "2026-03-15T10:00:00Z",
  },
];

export function getPublishedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.is_published).sort(
    (a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.is_published && p.slug === slug);
}
