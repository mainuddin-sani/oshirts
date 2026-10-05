
import customHoodies from "@/assets/images/custom-hoodies.png";

export const blogIntro = {
  eyebrow: "Our Blog",
  title: "Notes from the print floor.",
  lead: "Artwork advice, blank comparisons and the honest cost of a good shirt — written by the specialists who run the presses, not a marketing team.",
};

export const categories = [
  "All",
  "Design tips",
  "Buying guides",
  "Print methods",
  "Behind the scenes",
];

/* Each topic gets its own cover tone, so cards read as a set even though
   they share product photography rather than editorial imagery. */
export const topics = {
  "Design tips": {
    tone: "blush",
    blurb: "Artwork that survives the press",
  },
  "Buying guides": {
    tone: "sand",
    blurb: "Blanks, budgets and sizing",
  },
  "Print methods": {
    tone: "stone",
    blurb: "Screens, DTG, inks and finishes",
  },
  "Behind the scenes": {
    tone: "sage",
    blurb: "How the floor actually runs",
  },
};

export const topicOf = (category) => topics[category] || { tone: "sand", blurb: "" };

/* Every post carries its own body so the article page can render it. */
export const posts = [
  {
    slug: "artwork-that-prints-well",
    title: "Eight things that quietly ruin a print",
    excerpt:
      "Low resolution is the obvious one. The other seven catch out designers who have been doing this for years.The other seven catch out designers",
    category: "Design tips",
    date: "2026-08-28",
    readTime: 7,
    image: customHoodies,
    imageAlt: "Black T-shirt printed with a detailed mountain graphic",
    featured: true,
    body: [
      {
        type: "p",
        text: "We review every file that comes through the door, which means we see the same eight problems over and over. None of them are difficult to fix — they are just easy to miss when you have been staring at the same artboard for three days.",
      },
      { type: "h2", text: "Resolution is about the printed size, not the pixel count" },
      {
        type: "p",
        text: "A 2000px wide file sounds generous until you print it fourteen inches across. What matters is the effective resolution at final size: 300 DPI at the dimensions you are actually printing. Scale your artboard to the real print size first, then check.",
      },
      { type: "h2", text: "Thin strokes disappear into the weave" },
      {
        type: "p",
        text: "Anything under about one point will break up on a cotton tee, especially on heather blends where the surface is uneven. If your logo has hairlines, thicken them for apparel or accept that they will look broken.",
      },
      {
        type: "quote",
        text: "The fastest way to know if a design will print is to shrink it to thumbnail size. If it stops reading, the press will not save it.",
      },
      { type: "h2", text: "The rest of the list" },
      {
        type: "list",
        items: [
          "Unconverted text — fonts we do not have will silently substitute",
          "RGB neons that have no ink equivalent, so they print duller than the screen",
          "Drop shadows on transparent backgrounds, which build a visible box",
          "Gradients that band once separated into screens",
          "Artwork placed off-centre in the file rather than centred on the print area",
          "White elements assumed on a white shirt — they need to be knocked out deliberately",
        ],
      },
      {
        type: "p",
        text: "Send us the file before you commit. The review is free, it takes under a business day, and it is much cheaper than a reprint.",
      },
    ],
  },
  {
    slug: "screen-printing-vs-dtg",
    title: "Screen printing vs DTG: which one your order actually needs",
    excerpt:
      "The honest breakdown — where each method wins on cost, colour and feel, and the quantity where the answer flips.",
    category: "Print methods",
    date: "2026-08-14",
    readTime: 6,
    image: customHoodies,
    imageAlt: "Cream T-shirt with a retro mountain print",
    body: [
      {
        type: "p",
        text: "Both methods put ink on cotton and both can look excellent. They fail in different places, which is really what should decide it.",
      },
      { type: "h2", text: "Screen printing wins on volume and vibrancy" },
      {
        type: "p",
        text: "Every colour needs its own screen, so the setup cost is real — but it is a one-time cost spread across the run. Past roughly fifty shirts with three or fewer colours, screen printing is cheaper per unit and the ink sits brighter, particularly on dark garments.",
      },
      { type: "h2", text: "DTG wins on detail and small runs" },
      {
        type: "p",
        text: "Direct-to-garment prints like an inkjet: no screens, no setup, unlimited colours. Photographic artwork and heavy gradients reproduce far more faithfully. Under about twenty-five shirts it is almost always the right answer.",
      },
      {
        type: "quote",
        text: "If you are agonising over the choice, send both a mock-up. We will print one of each and post them to you before the run.",
      },
      {
        type: "p",
        text: "The crossover point moves with colour count. One-colour designs favour screens much earlier; six-colour photographic work may never justify them.",
      },
    ],
  },
  {
    slug: "choosing-blanks",
    title: "A blunt guide to choosing blanks",
    excerpt:
      "Ring-spun, combed, heavyweight, tri-blend — what the labels mean and which ones your team will actually keep wearing.",
    category: "Buying guides",
    date: "2026-07-30",
    readTime: 8,
    image: customHoodies,
    imageAlt: "White T-shirt with a garage-style print",
    body: [
      {
        type: "p",
        text: "The blank matters more than the print. A great design on a scratchy shirt ends up in a drawer, and nobody sees your logo from a drawer.",
      },
      { type: "h2", text: "Read the yarn, not the marketing" },
      {
        type: "p",
        text: "Ring-spun cotton is softer than open-end because the fibres are twisted finer. Combed removes the short fibres that cause pilling. Together they cost a little more per shirt and last noticeably longer.",
      },
      { type: "h2", text: "Weight is a trade-off, not a quality score" },
      {
        type: "p",
        text: "Heavyweight cotton at 6 oz and up feels substantial and holds structure. Lighter 4.2 oz shirts drape better and suit warm climates. Neither is better — it depends on whether you want a workwear feel or a retail one.",
      },
      {
        type: "list",
        items: [
          "Staff and event shirts: 100% ring-spun cotton, mid weight",
          "Retail and merch: combed ring-spun or a tri-blend for drape",
          "Sports and outdoor: performance polyester with moisture wicking",
          "Fundraisers on a budget: heavyweight open-end cotton, still solid",
        ],
      },
      {
        type: "p",
        text: "Order a sample pack before a large run. Feeling three options in your hands settles the argument faster than any spec sheet.",
      },
    ],
  },
  {
    slug: "what-a-shirt-really-costs",
    title: "What a custom shirt really costs, line by line",
    excerpt:
      "Blank, ink, labour, screens, shipping. Here is where every dollar goes and which line items are negotiable.",
    category: "Buying guides",
    date: "2026-07-16",
    readTime: 5,
    image: customHoodies,
    imageAlt: "Blue T-shirt with a garage-style print",
    body: [
      {
        type: "p",
        text: "Printers rarely show their maths, which is why quotes for the same job can differ by forty per cent. Here is ours.",
      },
      { type: "h2", text: "The blank is roughly half" },
      {
        type: "p",
        text: "On a typical mid-weight cotton tee, the garment itself accounts for about half the unit price. That is the line that moves most when you change blanks, and the easiest place to save money without touching print quality.",
      },
      { type: "h2", text: "Setup is fixed, so quantity is your lever" },
      {
        type: "p",
        text: "Screens, colour matching and press setup cost the same for twenty-four shirts as for a thousand. Doubling a run rarely doubles the bill — it usually adds twenty to thirty per cent.",
      },
      {
        type: "quote",
        text: "If a quote has a line you cannot explain, ask. Setup fees, screen charges and handling are where surprise margin usually hides.",
      },
    ],
  },
  {
    slug: "inside-the-press-floor",
    title: "A day on the press floor, hour by hour",
    excerpt:
      "From the 6am ink mix to the last carton on the dock — what actually happens between your approval and your delivery.",
    category: "Behind the scenes",
    date: "2026-06-29",
    readTime: 6,
    image: customHoodies,
    imageAlt: "Custom printed hoodie on a rail",
    body: [
      {
        type: "p",
        text: "Most customers picture a machine that shirts go into and come out of. It is closer to a kitchen: a lot of preparation, a short burst of cooking, and a lot of checking.",
      },
      { type: "h2", text: "06:00 — Ink and screens" },
      {
        type: "p",
        text: "Colours are mixed to Pantone by hand and logged. Screens burned overnight are washed out, checked against the separation and racked in run order.",
      },
      { type: "h2", text: "09:00 — First strike-off" },
      {
        type: "p",
        text: "The first shirt off any run is pulled, cured and inspected under daylight-balanced light. Nothing else prints until it matches the approved proof.",
      },
      { type: "h2", text: "16:00 — Fold, count, ship" },
      {
        type: "p",
        text: "Everything is counted twice: once by the folder, once at the packing bench. Sizes are bagged separately because that is what makes distribution painless at your end.",
      },
    ],
  },
  {
    slug: "colour-matching-explained",
    title: "Why your blue looked different on the shirt",
    excerpt:
      "Screens emit light, ink reflects it. A practical explanation of colour shift and how to specify what you actually want.",
    category: "Design tips",
    date: "2026-06-11",
    readTime: 5,
    image: customHoodies,
    imageAlt: "Sky blue T-shirt with a wild camping badge print",
    body: [
      {
        type: "p",
        text: "A monitor makes colour by emitting light. Ink makes colour by absorbing some wavelengths and reflecting the rest. The two can never match perfectly — the goal is to get predictably close.",
      },
      { type: "h2", text: "Specify in Pantone, not hex" },
      {
        type: "p",
        text: "Hex values describe light. Pantone describes mixed ink, which is what actually lands on the garment. If a colour is part of your brand, give us the Pantone reference and we will mix to it.",
      },
      { type: "h2", text: "The shirt underneath changes everything" },
      {
        type: "p",
        text: "The same ink prints warmer on a cream shirt than on white, and duller on a dark one without an underbase. Tell us the garment colour when you approve a colour, not after.",
      },
    ],
  },
  {
    slug: "team-order-checklist",
    title: "The team order checklist we wish every organiser had",
    excerpt:
      "Sizes, deadlines, budget sign-off, artwork rights. Ten minutes with this list saves a week of chasing.",
    category: "Buying guides",
    date: "2026-05-22",
    readTime: 4,
    image: customHoodies,
    imageAlt: "Grey T-shirt with a wild outdoors print",
    body: [
      {
        type: "p",
        text: "Organising apparel for a group is mostly logistics. The printing is the easy part.",
      },
      {
        type: "list",
        items: [
          "Collect sizes with a deadline attached, and add two extra of the most common size",
          "Confirm who signs off on spend before you request a quote",
          "Check you have the right to print every logo on the design",
          "Work backwards from the date people need them in hand, not the event date",
          "Decide up front whether latecomers get a second run or miss out",
        ],
      },
      {
        type: "quote",
        text: "Nine times in ten, a late order is a late size list — not a late press.",
      },
    ],
  },
  {
    slug: "water-based-inks",
    title: "Water-based ink: softer hand, sharper trade-offs",
    excerpt:
      "It feels like part of the fabric rather than a layer on top. Here is where it shines and where plastisol still wins.",
    category: "Print methods",
    date: "2026-05-08",
    readTime: 6,
    image: customHoodies,
    imageAlt: "Black T-shirt with a bold graphic print",
    body: [
      {
        type: "p",
        text: "Water-based ink soaks into the fibres instead of sitting on them. On the right garment the result is a print you can barely feel — the thing people mean when they say a shirt feels retail.",
      },
      { type: "h2", text: "Where it shines" },
      {
        type: "p",
        text: "Light garments, high cotton content, soft vintage looks and large prints that would feel heavy in plastisol. It also breathes better, which matters for anything worn in summer.",
      },
      { type: "h2", text: "Where plastisol still wins" },
      {
        type: "p",
        text: "Dark garments needing punchy opacity, tight registration on fine detail, and polyester blends where dye migration is a risk. Plastisol is more forgiving and more consistent across a long run.",
      },
    ],
  },
  {
    slug: "reorders-without-drift",
    title: "How to reorder a year later and get the same shirt",
    excerpt:
      "Blanks change, dye lots shift, files go missing. What we archive on your behalf so batch two matches batch one.",
    category: "Behind the scenes",
    date: "2026-04-24",
    readTime: 4,
    image: customHoodies,
    imageAlt: "Pink T-shirt with a mountain graphic print",
    body: [
      {
        type: "p",
        text: "Colour drift between batches is the most common complaint in this industry, and it is almost always avoidable.",
      },
      { type: "h2", text: "What we keep on file" },
      {
        type: "p",
        text: "Your separations, mixed ink formulas, screen mesh counts, press settings and the exact blank style and dye lot. A reorder starts from that record rather than from scratch.",
      },
      { type: "h2", text: "What you should keep" },
      {
        type: "p",
        text: "One shirt from every run, unwashed, in a drawer. It is the only true reference when a question comes up eighteen months later.",
      },
    ],
  },
];

export const findPost = (slug) => posts.find((post) => post.slug === slug);

export const featuredPost = posts.find((post) => post.featured) || posts[0];

export const relatedPosts = (slug, limit = 3) => {
  const current = findPost(slug);
  if (!current) return [];

  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.category === current.category
  );
  const rest = posts.filter((post) => post.slug !== slug && post.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
};

export const formatPostDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
