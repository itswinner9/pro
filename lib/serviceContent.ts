/**
 * Extended service page content: long copy, common problems, process, FAQ.
 * Add entries for each service to reach 600–1000 words and better SEO.
 */
export type ServiceSlug =
  | "drain-cleaning"
  | "plumbing-repairs"
  | "bathroom-repairs"
  | "tile-installation"
  | "handyman-services"
  | "home-maintenance"
  | "emergency-repairs";

export interface ServiceExtendedContent {
  longContent?: string;
  commonProblems?: string[];
  process?: string[];
  localMention?: string;
  faq?: Array<{ question: string; answer: string }>;
}

export const serviceExtendedContent: Record<string, ServiceExtendedContent> = {
  "drain-cleaning": {
    longContent: `Drain cleaning is one of the most requested services we provide across the Lower Mainland. Whether you're in Vancouver, Surrey, Burnaby, or Richmond, clogged drains and slow-running sinks are a common headache for homeowners. At PlusPro, we use professional-grade equipment and proven methods to clear blockages safely and prevent future issues.

A slow or blocked drain isn't just an inconvenience—it can lead to backups, odours, and in severe cases, damage to your pipes or property. Tree roots, grease buildup, soap scum, and foreign objects are typical culprits. Our technicians diagnose the cause and choose the right solution: from snaking and hydro jetting to camera inspections and preventive maintenance.

We serve residential and light commercial properties throughout Lower Mainland BC. Same-day and emergency drain cleaning are available when you need fast relief. All work is backed by our commitment to quality and transparent pricing.`,
    commonProblems: [
      "Slow-draining sinks or tubs due to hair, soap, or grease buildup",
      "Toilet backups or recurring clogs",
      "Multiple fixtures draining slowly (possible main line or sewer issue)",
      "Foul odours from drains",
      "Sewer line blockages from tree roots or collapsed pipes",
    ],
    process: [
      "You book or request a quote; we confirm your address and describe the issue.",
      "A technician arrives with the right equipment (snake, hydro jet, camera if needed).",
      "We clear the blockage and, when useful, inspect the line to spot future risks.",
      "We explain what we did and any follow-up or preventive steps.",
    ],
    localMention:
      "From Vancouver to Surrey, Burnaby to Richmond and Coquitlam, PlusPro provides fast, reliable drain cleaning across the Lower Mainland. We know local plumbing systems and municipal requirements so you get service that's right for your area.",
    faq: [
      {
        question: "How much does drain cleaning cost in the Lower Mainland?",
        answer:
          "Costs depend on the type of blockage, location (e.g. under slab vs. accessible), and equipment needed. We give upfront estimates and can often provide same-day service in Vancouver, Surrey, Burnaby, and surrounding areas.",
      },
      {
        question: "What are signs my drains need cleaning?",
        answer:
          "Slow drainage, gurgling sounds, bad odours, or water backing up in sinks, tubs, or toilets are common signs. If multiple fixtures are affected, the main line or sewer may be blocked—call us for a diagnosis.",
      },
      {
        question: "Do you offer emergency drain cleaning?",
        answer:
          "Yes. We offer emergency drain and plumbing services across the Lower Mainland. Contact us for urgent blockages, backups, or flooding so we can get someone out quickly.",
      },
    ],
  },
  "home-maintenance": {
    longContent: `Home maintenance is the work that keeps a Lower Mainland house comfortable between bigger repairs. Wet winters, salt air, and older plumbing make small gaps, dripping fixtures, and clogged gutters turn expensive fast. PlusPro handles that ongoing upkeep so Vancouver, Surrey, Burnaby, Richmond, and Coquitlam homeowners are not waiting for a crisis.

Unlike a one-off handyman visit, a maintenance visit is planned around the season and the house. In fall we check gutters, downspouts, exterior caulking, and weatherstripping before the rain sets in. In spring we look at outdoor taps, hose bibs, screens, and hardware that seized over winter. Year-round we tighten loose fixtures, reseal tubs and windows, adjust doors and cabinet hardware, and walk through moisture-prone spots like bathrooms, laundry, and crawl-space edges.

Coastal weather is hard on finishes. Wind-driven rain finds hairline gaps around windows, garage doors, and hose bibs. Condensation in bathrooms and kitchens breaks down caulk faster than in drier climates. That is why a twice-a-year checkup pays off here even if the house looks fine from the street. We do not sell a package you do not need; we walk the list with you and only do the items that matter for this property.

Preventive plumbing is part of the same visit. We look for slow drains, sweating pipes, running toilets, and supply-line wear before they flood a floor. If something needs licensed plumbing or drain cleaning, we do that work ourselves instead of sending you to a second company. Tile grout, bathroom caulk, and leaking shower corners are common Lower Mainland issues; catching them early protects drywall and subfloors.

A typical checkup covers the items that fail quietly: dripping faucets, loose toilet bases, drafty windows, peeling exterior caulk, sagging downspouts, sticky doors, and hardware that no longer holds. We explain what is urgent, what can wait, and what should go on a seasonal list. Pricing is upfront. Same-day visits are often available for small jobs.

Landlords and property managers use the same service between tenancies or on a spring/fall calendar. Occupied houses and condos get a shorter visit focused on the rooms you use most. If you already call PlusPro for plumbing, bathroom repairs, or emergency work, adding maintenance keeps the rest of the house in step so you are not booking three different trades.

Home maintenance is not a substitute for a full renovation or a 24/7 emergency call. It is the middle ground: regular, licensed, local upkeep that reduces those calls. Book a visit, request a quote, or text photos of the areas you want us to check. Serving Vancouver, Surrey, Burnaby, Richmond, Coquitlam, Delta, New Westminster, and the rest of the Lower Mainland.`,
    commonProblems: [
      "Drafts, peeling caulk, and weatherstripping that no longer seals",
      "Gutters overflowing or downspouts pulling away from the house",
      "Dripping faucets, running toilets, and loose bathroom fixtures",
      "Sticky doors, sagging hardware, and worn weather seals",
      "Moisture at tubs, showers, and window sills that can damage walls",
    ],
    process: [
      "You book a maintenance visit or send photos of the areas that need attention.",
      "We confirm the address, access, and a short list of seasonal or preventive items.",
      "A technician inspects, completes the agreed upkeep, and notes anything that should wait or needs a larger repair.",
      "You get a clear summary and, if useful, a follow-up date for the next season.",
    ],
    localMention:
      "From Vancouver to Surrey, Burnaby, Richmond, Coquitlam, Delta, and New Westminster, PlusPro provides home maintenance that matches Lower Mainland weather and housing stock. We keep plumbing, handyman, and upkeep under one local team.",
    faq: [
      {
        question: "What is included in home maintenance versus a handyman visit?",
        answer:
          "Home maintenance is planned upkeep: seasonal checks, caulking, gutters, fixtures, and small preventive jobs. A handyman visit is usually a one-off repair list. Both are available; we recommend maintenance when you want the house checked on a schedule.",
      },
      {
        question: "Do you offer home maintenance in Vancouver and the Lower Mainland?",
        answer:
          "Yes. We serve Vancouver, Surrey, Burnaby, Richmond, Coquitlam, Delta, New Westminster, and nearby cities. Same-day visits are often available for smaller upkeep jobs.",
      },
      {
        question: "Can you do plumbing checks during a maintenance visit?",
        answer:
          "Yes. We look for leaks, slow drains, running toilets, and worn supply lines. If licensed plumbing or drain cleaning is needed, we handle that on the same visit when possible.",
      },
    ],
  },
};
