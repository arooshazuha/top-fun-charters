/**
 * FAQ content. Answers are drawn from the live FAQ page and the business's
 * Terms of Service / Waiver. Nothing here is invented, where the source only
 * states a rule, we restate the rule without inventing a rationale.
 */

export type FaqItem = { question: string; answer: string };
export type FaqCategory = { id: string; title: string; items: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "guests-capacity",
    title: "Guests & Capacity",
    items: [
      {
        question: "How many guests can come aboard?",
        answer:
          "Either up to six or up to 13, offered as two different packages. Charters for 1 to 6 guests are captained, with a licensed captain included in the rate. Charters for 7 to 13 guests follow the U.S. Coast Guard bareboat model, where you charter the boat and select a licensed captain who is hired and paid directly. Six or 13 is the maximum legal number of passengers we can take, including the person who booked.",
      },
      {
        question: "Does the guest count include the person who booked?",
        answer:
          "Yes. Please don't bring more than 6 total if you booked the 1-6 charter, or more than 13 total (including the person who booked) if you chose the 7-13 option. These are legal limits and exceptions cannot be made.",
      },
      {
        question: "Is this a good trip for kids and families?",
        answer:
          "Absolutely. Two climate-controlled staterooms give kids shade and a place to rest, the hydraulic swim platform makes getting in and out of the water easy, and our captains are experienced with families.",
      },
    ],
  },
  {
    id: "on-the-water",
    title: "On the Water",
    items: [
      {
        question: "What is the pace like on the water?",
        answer:
          "Easy and relaxed. We cruise at a gentle, comfortable pace so everyone can settle in, take in the scenery and let the dolphins come play alongside the boat. This is smooth, scenic cruising built around a laid-back day on the water, which is exactly why guests love it.",
      },
      {
        question: "Will we see dolphins?",
        answer:
          "Dolphins are common in local waters and often ride the boat's wake, which is one reason we cruise at an easy pace. We can't guarantee wildlife, but sightings are frequent and a favorite part of the trip.",
      },
      {
        question: "Is this a fishing charter?",
        answer:
          "We pretty much do everything but fishing. There is no live well, rod holders, etc. Please leave fishing equipment at home.",
      },
      {
        question: "How long are charters?",
        answer:
          "Four hours is our most popular charter and the sweet spot for a relaxing day on the water. We also offer 6-hour and full-day 8-hour charters, and shorter 2-hour outings can be arranged on request. Pricing for each length is on the Price List.",
      },
    ],
  },
  {
    id: "food-drink",
    title: "Food & Drink",
    items: [
      {
        question: "Can we bring our own food and drinks?",
        answer:
          "Yes. Bring whatever food and drinks you would like (no red wine, please). Small coolers and ice are welcome, and there's a refrigerator on board to keep things cold.",
      },
      {
        question: "Is there a bathroom on board?",
        answer:
          "Yes. The yacht has two full bathrooms with showers, plus a full galley with a sink and refrigerator.",
      },
    ],
  },
  {
    id: "what-to-bring",
    title: "What to Bring (and Not Bring)",
    items: [
      {
        question: "What should I bring?",
        answer:
          "Bring the food and drinks you'd like (no red wine), a small cooler and ice if you want, towels, a hat and lotion sunscreen. Everything else, from the swim platform to the staterooms and restrooms, is on board.",
      },
      {
        question: "What should I NOT bring?",
        answer:
          "No more passengers than your charter allows, no spray sunscreen, no pets, no drugs, no smoking on the boat, and no fishing equipment. Please bring lotion sunscreen instead of spray.",
      },
      {
        question: "Are pets or smoking allowed?",
        answer:
          "No pets and no smoking on the boat. These help keep the yacht comfortable and clean for every guest.",
      },
    ],
  },
  {
    id: "booking-payment",
    title: "Booking & Payment",
    items: [
      {
        question: "How do I book a charter?",
        answer:
          "Use the \"Check pricing and availability\" button to open our live booking calendar, then complete the short charter form for your group size. A participant waiver is completed before your trip.",
      },
      {
        question: "How does pricing work for 7 to 13 guests?",
        answer:
          "For groups of more than six, charters follow the U.S. Coast Guard bareboat model. The listed price is the private boat charter, and your licensed captain is selected and paid directly to the captain as a separate fee. The captain's fee is not bundled into the boat rate or paid by Top Fun Charters. You book directly with the owner-operator, so there are no broker markups or hidden booking fees.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Payment can be made by Zelle, Venmo, CashApp or credit card.",
      },
      {
        question: "Is a waiver required?",
        answer:
          "Yes. Every participant signs a waiver, release and assumption-of-risk agreement. Guests under 18 require a parent or guardian to sign consent. You can complete the waiver from the Forms page.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellation requests must be made in writing by email or text. We will not acknowledge any verbal, over-the-phone request or voicemail. See our Cancellation Policy for details.",
      },
    ],
  },
  {
    id: "pickup-logistics",
    title: "Pickup & Logistics",
    items: [
      {
        question: "Where do we meet for the charter?",
        answer:
          "Safe Harbor Pier 77 Marina, 12312 Manatee Ave W, Bradenton, FL 34209, directly across the bridge from Anna Maria Island on Route 64. There's free parking and easy-to-board floating docks; meet at the end of the middle dock where the yacht is positioned.",
      },
      {
        question: "Can you pick us up somewhere else?",
        answer:
          "Other pickup and drop-off points can be arranged with advance notice, though an additional cost applies to cover the extra fuel and crew time.",
      },
      {
        question: "Is there parking at the marina?",
        answer:
          "Yes. Free parking is available at the marina. The ship store, a Tiki Bar and other amenities are on site as well.",
      },
    ],
  },
  {
    id: "weather-safety",
    title: "Weather & Safety",
    items: [
      {
        question: "What happens if the weather is bad?",
        answer:
          "Top Fun Charters will make every effort to keep your full itinerary, but bad weather, heavy winds or unforeseen mechanical issues may alter it. The captain will always make the final decision based on safety.",
      },
      {
        question: "Who is in charge on the boat?",
        answer:
          "The captain is. For everyone's safety, the captain's word is the law aboard the ship, and we ask all guests to follow the crew's instructions.",
      },
    ],
  },
];

/** Flattened list for FAQPage structured data. */
export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
