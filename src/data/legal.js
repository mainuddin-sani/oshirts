import { site } from "@/data/home";

/* Section bodies are simple blocks so the same renderer can serve the
   privacy policy and any future legal page. */

export const terms = {
  eyebrow: "Legal",
  title: "Terms & Conditions",
  updated: "2026-09-01",
  intro:
    "These terms govern every order placed with ooShirts, whether through the website, the design studio, the Fulfillment API or a TeeChip store. They are written to be read, not just agreed to — if anything here is unclear, ask us before you order.",

  summary: [
    "You approve a proof before anything is printed, and nothing is charged until you do.",
    "You must own or be licensed to use every element of the artwork you send us.",
    "If a print does not match the approved proof, we reprint it or refund it.",
    "Custom-printed goods cannot be returned for change of mind, sizing or ordering errors.",
  ],

  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of these terms",
      blocks: [
        {
          type: "p",
          text: "By creating an account, placing an order, or using any ooShirts service, you agree to these terms and to our Privacy Policy. If you are ordering on behalf of a company, school, team or organisation, you confirm that you have the authority to bind it to these terms.",
        },
        {
          type: "p",
          text: "We may update these terms from time to time. The version in force when you place an order is the version that applies to that order.",
        },
      ],
    },
    {
      id: "accounts",
      title: "2. Accounts",
      blocks: [
        {
          type: "p",
          text: "You are responsible for keeping your login details confidential and for all activity under your account. Tell us immediately if you believe your account has been accessed without permission.",
        },
        {
          type: "p",
          text: "We may suspend or close accounts that breach these terms, are used for fraud, or remain inactive with no orders for more than three years. Saved designs and order history may be deleted when an account is closed.",
        },
      ],
    },
    {
      id: "orders",
      title: "3. Orders, proofs and approval",
      blocks: [
        {
          type: "p",
          text: "Every order goes through a free design review. A print specialist checks resolution, colour separation and placement, then sends you a digital proof. Production does not begin — and your payment method is not charged — until you approve that proof.",
        },
        {
          type: "list",
          items: [
            "Check the proof carefully: spelling, colours, placement, sizes and quantities.",
            "Once approved, the proof becomes the reference for the whole run.",
            "Changes after approval may incur new setup costs and reset the turnaround clock.",
          ],
        },
        {
          type: "p",
          text: "Proofs are simulated on screen. Minor differences in colour between a proof and a printed garment are normal and are not a defect (see section 7).",
        },
      ],
    },
    {
      id: "pricing",
      title: "4. Pricing, payment and taxes",
      blocks: [
        {
          type: "p",
          text: "Prices shown at checkout are in US dollars and include screen setup and the design review. Volume pricing is published and applied automatically. Shipping is free by ground on every order; express and rush options are priced at checkout.",
        },
        {
          type: "p",
          text: "Sales tax is calculated at payment based on the shipping address. Tax-exempt organisations can upload a certificate to their account before ordering.",
        },
        {
          type: "p",
          text: "We accept major credit and debit cards, PayPal and Apple Pay. Contract-printing programmes may be invoiced on agreed terms. Amounts overdue on invoiced accounts may accrue interest at 1.5% per month.",
        },
      ],
    },
    {
      id: "artwork",
      title: "5. Artwork, licensing and intellectual property",
      blocks: [
        {
          type: "p",
          text: "You keep ownership of the artwork you upload. By submitting it, you grant us a licence to reproduce it solely to produce, proof, ship and support your order, and to show it in your account.",
        },
        {
          type: "p",
          text: "You confirm that you own, or hold a licence to use, every element of your design — including logos, characters, photographs, fonts and slogans — and that printing it will not infringe anyone's rights. We may refuse or cancel an order that appears to infringe a trademark or copyright, and you agree to cover any claim that arises from artwork you supplied.",
        },
        {
          type: "p",
          text: "The design studio, our product photography, mock-up templates and website content remain our property or that of our licensors.",
        },
      ],
    },
    {
      id: "production",
      title: "6. Production, turnaround and shipping",
      blocks: [
        {
          type: "p",
          text: "Turnaround is quoted in business days from proof approval and includes printing, finishing and carrier transit. Estimated delivery dates are our best projection, not a guarantee, except for Rush orders, which carry a delivery-date commitment.",
        },
        {
          type: "list",
          items: [
            "Standard: 7–10 business days, free.",
            "Express: 4–5 business days, priced at checkout.",
            "Rush: 2–3 business days, priced at checkout and guaranteed.",
          ],
        },
        {
          type: "p",
          text: "Risk in the goods passes to you on delivery to the address you provided. If a shipment arrives damaged, keep the packaging and contact us within 5 days so we can raise a carrier claim and reship.",
        },
        {
          type: "p",
          text: "Garment counts may vary by up to 2% on runs over 500 units due to spoilage; we invoice only what ships.",
        },
      ],
    },
    {
      id: "reprints",
      title: "7. Reprints, refunds and returns",
      blocks: [
        {
          type: "p",
          text: "If a printed garment does not match the approved proof — wrong placement, missing colour, misregistration, defective blanks — tell us within 14 days of delivery with photographs. We will reprint the affected pieces or refund them, at our cost, including shipping.",
        },
        {
          type: "p",
          text: "Because every order is made to your specification, we cannot accept returns for change of mind, sizing decisions, quantities you ordered, or errors in artwork or text that were present on the approved proof.",
        },
        {
          type: "p",
          text: "Colour variation within commercially reasonable tolerances, slight differences between garment dye lots, and print size variation of up to a quarter inch are characteristics of the process rather than defects.",
        },
      ],
    },
    {
      id: "cancellations",
      title: "8. Cancellations and changes",
      blocks: [
        {
          type: "p",
          text: "You can cancel or change an order free of charge at any time before you approve the proof. After approval, screens are burned and blanks are pulled, so cancellations are subject to the costs already incurred. Once a run is on press it cannot be cancelled.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "9. Acceptable use",
      blocks: [
        {
          type: "p",
          text: "We will not print, and may cancel orders containing, material that is unlawful, that incites violence or hatred against any group, that sexualises minors, or that we reasonably judge to be defamatory. Where we decline an order for this reason we refund any amount paid in full.",
        },
      ],
    },
    {
      id: "platforms",
      title: "10. Fulfillment API and TeeChip Stores",
      blocks: [
        {
          type: "p",
          text: "Access to the Fulfillment API is subject to the API terms provided with your keys. You are responsible for orders your integration submits, including shipping details and artwork, and for keeping your keys secret.",
        },
        {
          type: "p",
          text: "TeeChip store owners set their own retail prices and receive the margin above our base price, paid out weekly. We handle production, shipping, returns and customer service for store orders under the store's name. Store owners are responsible for the designs they list and for any taxes on their earnings.",
        },
      ],
    },
    {
      id: "liability",
      title: "11. Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "To the fullest extent permitted by law, our total liability for any order is limited to the amount you paid for that order. We are not liable for indirect or consequential losses, including lost profits, missed events or reputational harm, even if we were told they were possible. Nothing in these terms limits liability that cannot be limited by law.",
        },
      ],
    },
    {
      id: "law",
      title: "12. Governing law",
      blocks: [
        {
          type: "p",
          text: "These terms are governed by the laws of the State of Texas. Any dispute that cannot be resolved between us will be brought in the state or federal courts located in Travis County, Texas, and you consent to their jurisdiction.",
        },
      ],
    },
    {
      id: "contact",
      title: "13. Contact",
      blocks: [
        {
          type: "p",
          text: `Questions about these terms can be sent to ${site.email} or by post to ooShirts, 1200 Press Avenue, Suite 300, Austin, TX 78701. Our support team is available ${site.hours} on ${site.phone}.`,
        },
      ],
    },
  ],
};

export const privacy = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  updated: "2026-09-01",
  intro:
    "This policy explains what we collect when you use ooShirts, why we collect it, and the choices you have. We collect what we need to print and ship your order and to support you — and nothing we would be uncomfortable explaining here.",

  summary: [
    "We collect your contact, shipping and order details to produce and deliver what you buy.",
    "Card details go straight to our payment processor; we never store them.",
    "We do not sell your personal information, and we do not share artwork with anyone but the people printing it.",
    "You can ask for a copy of your data, or for it to be deleted, at any time.",
  ],

  sections: [
    {
      id: "collect",
      title: "1. What we collect",
      blocks: [
        {
          type: "p",
          text: "When you create an account or place an order we collect your name, email address, phone number, shipping and billing addresses, and the details of what you order — garments, sizes, quantities and the artwork you upload. If you contact us, we keep the conversation so we can pick it up again later.",
        },
        {
          type: "p",
          text: "We also collect standard technical information when you use the website: IP address, browser and device type, pages visited and how you arrived, using cookies and similar technologies described in section 6.",
        },
      ],
    },
    {
      id: "use",
      title: "2. How we use it",
      blocks: [
        {
          type: "list",
          items: [
            "Producing, proofing, shipping and supporting your order",
            "Running your account, saved designs and reorder history",
            "Sending order confirmations, proofs, tracking and service messages",
            "Answering questions and handling reprints or refunds",
            "Preventing fraud and keeping the service secure",
            "Improving the website and design studio based on how they are used",
          ],
        },
        {
          type: "p",
          text: "We send marketing email only if you opt in, and every message includes a one-click unsubscribe. Service messages about an order in progress are not marketing and cannot be switched off while the order is open.",
        },
      ],
    },
    {
      id: "payment",
      title: "3. Payment information",
      blocks: [
        {
          type: "p",
          text: "Card and wallet details are entered directly into our PCI-compliant payment processor and never touch our servers. We receive a token, the card type and the last four digits so we can show you which method was used.",
        },
      ],
    },
    {
      id: "sharing",
      title: "4. Who we share it with",
      blocks: [
        {
          type: "p",
          text: "We do not sell personal information. We share it only with the companies that help us run the service, and only what each one needs: our payment processor, carriers who deliver your order, the email provider that sends confirmations, and the hosting and analytics providers behind the website. Each is bound by contract to protect it.",
        },
        {
          type: "p",
          text: "For TeeChip store orders, the store owner sees the order details needed to run their store but never your payment information. We may also disclose information where the law requires it.",
        },
      ],
    },
    {
      id: "artwork",
      title: "5. Your artwork",
      blocks: [
        {
          type: "p",
          text: "Artwork is stored so we can proof, print and reprint your order, and so it appears in your account for reordering. It is visible only to you and to the specialists working on your job. We never use customer artwork in our own marketing without written permission.",
        },
      ],
    },
    {
      id: "cookies",
      title: "6. Cookies",
      blocks: [
        {
          type: "p",
          text: "We use essential cookies to keep you signed in and to remember your checkout progress, and analytics cookies to understand which pages and features are used. You can block analytics cookies in your browser without affecting your ability to order.",
        },
      ],
    },
    {
      id: "retention",
      title: "7. How long we keep it",
      blocks: [
        {
          type: "p",
          text: "Order records, including artwork and press settings, are kept for as long as your account is open so reorders match the original run, and for seven years afterwards to meet tax and accounting rules. Support conversations are kept for three years. Analytics data is kept in aggregate only.",
        },
      ],
    },
    {
      id: "rights",
      title: "8. Your choices",
      blocks: [
        {
          type: "list",
          items: [
            "Ask for a copy of the personal information we hold about you",
            "Ask us to correct or delete it, subject to the retention above",
            "Unsubscribe from marketing at any time",
            "Close your account, which removes saved designs and reorder history",
          ],
        },
        {
          type: "p",
          text: "To do any of these, email us and we will respond within 30 days. Residents of California and other states with privacy laws have the rights those laws provide, and we honour them regardless of where you live.",
        },
      ],
    },
    {
      id: "security",
      title: "9. Security",
      blocks: [
        {
          type: "p",
          text: "All traffic to the website is encrypted, account passwords are stored hashed, and access to order data inside the company is limited to the people who need it for production and support. No system is perfectly secure; if we ever believe your information has been affected by a breach, we will tell you promptly.",
        },
      ],
    },
    {
      id: "contact",
      title: "10. Contact",
      blocks: [
        {
          type: "p",
          text: `Privacy questions and requests can be sent to ${site.email} or by post to ooShirts, 1200 Press Avenue, Suite 300, Austin, TX 78701.`,
        },
      ],
    },
  ],
};
