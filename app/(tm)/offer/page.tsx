import { GREEN, INK, TEAL } from "@/components/tm/ui";

/* ============================================================
   /offer — Публичная оферта об оказании услуг сервиса TalentMind
   ООО «ВЕБПРАКТИК»
   ============================================================ */

type Block = string | { sub: string } | { list: string[] };
type Section = { h: string; body: Block[] };

const SECTIONS: Section[] = [
  {
    h: "1. General Provisions",
    body: [
      "This Public Offer sets out the terms for entering into a Services Agreement (hereinafter referred to as the “Services Agreement” and/or the “Agreement”).",
      "This offer is recognized as a proposal addressed to one or more specific persons that is sufficiently definite and expresses the intention of the person making the proposal to consider itself to have entered into the Agreement with the addressee who accepts the proposal.",
      "Performing the actions specified in this Offer constitutes confirmation that both Parties agree to enter into the Services Agreement on the terms, in the manner, and to the extent set out in this Offer.",
      "The text of the Public Offer set out below is an official public proposal of the Contractor, addressed to the interested range of persons, to enter into a Services Agreement in accordance with the provisions of clause 2 of Article 437 of the Civil Code of the Russian Federation.",
      "The Services Agreement is deemed concluded and takes effect from the moment the Parties perform the actions provided for in this Offer, signifying the unconditional and full acceptance of all terms of this Offer without any exceptions or limitations on accession terms.",
      { sub: "Terms and definitions:" },
      { list: [
        "Agreement — the text of this Offer together with its Appendices, which form an integral part of it, accepted by the Customer through the performance of the conclusive actions provided for in this Offer.",
        "Conclusive actions — conduct that expresses agreement with the counterparty's proposal to conclude, amend, or terminate an agreement. Such actions consist of the full or partial performance of the terms proposed by the counterparty.",
        "Contractor's website on the “Internet” — a set of computer programs and other information contained in an information system, access to which is provided via the “Internet” under the domain name and network address: https://talentmind.ru/.",
        "Parties to the Agreement (the Parties) — the Contractor (TalentMind AI CORP) and the Customer (any individual, sole proprietor, or legal entity that has accepted the Offer).",
        "Service — the service of providing access to the functional capabilities of the TalentMind IT platform for candidate assessment, rendered by the Contractor to the Customer in the manner and on the terms established by this Offer and the selected Pricing plan.",
      ] },
    ],
  },
  {
    h: "2. Subject Matter of the Agreement",
    body: [
      "2.1. The Contractor undertakes to provide the Customer with Services granting access to the TalentMind service in accordance with the selected Pricing plan, and the Customer undertakes to pay for them in the amount, manner, and within the time limits established by this Agreement.",
      "2.2. The name, quantity, procedure, and other terms for rendering the Services are determined on the basis of the Contractor's information when the Customer places an order, or are set out on the Contractor's website on the “Internet” at https://talentmind.ru/ and recorded in Appendix No. 1 to this Agreement.",
      "2.3. The Contractor renders the Services under this Agreement either personally or with the involvement of third parties, while the Contractor is liable to the Customer for the actions of third parties as for its own.",
      "2.4. The Agreement is concluded by acceptance of this Offer through the performance of specific conclusive actions, expressed in:",
      { list: [
        "actions related to registering an account on the Contractor's website on the “Internet” where account registration is required;",
        "the Customer's submission of an order to the Contractor for the rendering of Services;",
        "actions related to the Customer's payment for the Services;",
        "actions related to the Contractor's rendering of the Services.",
      ] },
      "This list is not exhaustive; there may be other actions that clearly express a person's intention to accept the counterparty's proposal.",
    ],
  },
  {
    h: "3. Rights and Obligations of the Parties",
    body: [
      { sub: "3.1. Rights and obligations of the Contractor:" },
      "3.1.1. The Contractor undertakes to render the Services in accordance with the provisions of this Agreement, within the time limits and to the extent specified in this Agreement and/or in the manner specified on the Contractor's website.",
      "3.1.2. The Contractor undertakes to provide the Customer with access to the sections of the website necessary to obtain information and use the service, in accordance with the selected plan.",
      "3.1.3. The Contractor is responsible for the storage and processing of the personal data of the Customer (and of candidates whose data is uploaded by the Customer), ensures the confidentiality of such data in accordance with the Personal Data Processing Policy, and uses it solely for the quality rendering of the Services to the Customer.",
      "3.1.4. The Contractor reserves the right to change the time limits (period) for rendering the Services and the terms of this Offer unilaterally without prior notice to the Customer, by publishing such changes on the Contractor's website on the “Internet”. In this case, the new/amended terms posted on the website apply only to newly concluded Agreements and do not extend to periods already paid for.",
      { sub: "3.2. Rights and obligations of the Customer:" },
      "3.2.1. The Customer is obliged to provide accurate information about itself when receiving the relevant Services and registering on the website.",
      "3.2.2. The Customer undertakes not to reproduce, repeat, copy, sell, or use for any purpose the information and materials that have become available to it in connection with the rendering of the Services, except for use within its direct professional (HR) activity, without granting access to third parties.",
      "3.2.3. The Customer undertakes to accept the Services rendered by the Contractor in a timely manner.",
      "3.2.4. The Customer has the right to demand that the Contractor refund the funds for services not rendered, services rendered with deficiencies, or services rendered in breach of the time limits, as well as where the Customer has decided to cancel the services for reasons not related to a breach of obligations by the Contractor, solely on the grounds provided for by the current legislation of the Russian Federation.",
      "3.2.5. The Customer warrants that all the terms of the Agreement are clear to it; the Customer accepts the terms without reservations and in full.",
    ],
  },
  {
    h: "4. Price and Payment Procedure",
    body: [
      "4.1. The cost of the Contractor's Services rendered to the Customer and the procedure for their payment are determined on the basis of the Pricing plan selected by the Customer (“STARTER”, “GROWTH”, or “SCALE”) in accordance with the pricing specified on the website https://talentmind.ru/ and set out in Appendix No. 1 to this Agreement.",
      "4.2. All settlements under the Agreement are made by bank transfer in US dollars (USD). Payment is made on a 100% prepayment basis for the billing period (month), unless otherwise agreed by the Parties in writing.",
    ],
  },
  {
    h: "5. Confidentiality and Security",
    body: [
      "5.1. In implementing this Agreement, the Parties ensure the confidentiality and security of personal data in accordance with the current version of Federal Law No. 152-FZ of July 27, 2006 “On Personal Data” and Federal Law No. 149-FZ of July 27, 2006 “On Information, Information Technologies, and the Protection of Information”.",
      "5.2. The Parties undertake to maintain the confidentiality of information obtained in the course of performing this Agreement and to take all possible measures to protect the information obtained from disclosure.",
      "5.3. Confidential information means any information transmitted by the Contractor and the Customer in the course of implementing the Agreement and subject to protection.",
      "5.4. Such information may be contained in the local regulations, agreements, letters, reports, analytical materials, research results, diagrams, charts, specifications, and other documents provided to the Contractor, prepared either on paper or in electronic form.",
    ],
  },
  {
    h: "6. Force Majeure",
    body: [
      "6.1. The Parties are released from liability for the non-performance or improper performance of obligations under the Agreement if proper performance proved impossible due to force majeure, that is, extraordinary circumstances that could not be prevented under the given conditions, which are understood to mean: prohibitive actions of the authorities, epidemics, blockade, embargo, earthquakes, floods, fires, or other natural disasters.",
      "6.2. Upon the occurrence of these circumstances, the affected Party is obliged to notify the other Party within 30 (thirty) business days.",
      "6.3. A document issued by an authorized government body is sufficient confirmation of the existence and duration of force majeure.",
      "6.4. If force majeure circumstances continue for more than 60 (sixty) business days, then each Party has the right to cancel this Agreement unilaterally.",
    ],
  },
  {
    h: "7. Liability of the Parties",
    body: [
      "7.1. In the event of non-performance and/or improper performance of their obligations under the Agreement, the Parties bear liability in accordance with the terms of this Offer and the legislation of the Russian Federation.",
      "7.2. The Contractor bears no liability for the non-performance and/or improper performance of obligations under the Agreement if such non-performance occurred through the fault of the Customer (including the untimely provision of materials or breach of the technical requirements for uploaded files).",
      "7.3. A Party that has failed to perform or has improperly performed its obligations under the Agreement is obliged to compensate the other Party for documented actual losses caused by such breaches.",
    ],
  },
  {
    h: "8. Term of This Offer",
    body: [
      "8.1. The Offer takes effect from the moment it is posted on the Contractor's website and remains in force until it is withdrawn by the Contractor.",
      "8.2. The Contractor reserves the right to amend the terms of the Offer and/or to withdraw the Offer at any time at its discretion. Information about amendments to or withdrawal of the Offer is communicated to the Customer, at the Contractor's option, by posting it on the Contractor's website on the “Internet”, in the Customer's personal account, or by sending a corresponding notice to the email or postal address provided by the Customer.",
      "8.3. The Agreement takes effect from the moment the Customer Accepts the terms of the Offer and remains in force until the Parties have fully performed their obligations under the Agreement.",
      "8.4. Amendments made by the Contractor to the Agreement and published on the website in the form of an updated Offer are deemed accepted by the Customer in full upon continued use of the service.",
    ],
  },
  {
    h: "9. Additional Provisions",
    body: [
      "9.1. The Agreement, its conclusion, and performance are governed by the current legislation of the Russian Federation. All matters not regulated by this Offer or regulated incompletely are governed in accordance with the substantive law of the Russian Federation.",
      "9.2. In the event of a dispute that may arise between the Parties in the course of performing their obligations under the Agreement, the Parties are obliged to settle the dispute amicably by submitting a claim. The period for reviewing a claim is 10 (ten) business days from the moment of its receipt. Failing agreement, the dispute is referred for consideration to the court at the Contractor's location.",
      "9.3. The Parties have determined the Russian language as the language of the Agreement concluded on the terms of this Offer, as well as the language used in any interaction between the Parties.",
      "9.4. All documents to be provided in accordance with the terms of this Offer must be drawn up in Russian or have a notarized translation into Russian.",
      "9.5. Inaction by one of the Parties in the event of a breach of the terms of this Offer does not deprive the interested Party of the right to defend its interests later, nor does it constitute a waiver of its rights in the event that one of the Parties commits similar or comparable breaches in the future.",
      "9.6. If the Contractor's website contains links to other websites and materials of third parties, such links are placed solely for informational purposes, and the Contractor has no control over the content of such sites or materials. The Contractor bears no liability for any losses or damage that may arise as a result of using such links.",
    ],
  },
  {
    h: "10. Contractor's Details",
    body: [
      { list: [
        "Full name: LIMITED LIABILITY COMPANY “WEBPRACTIC”",
        "TIN (INN): 6163109767",
        "PSRN (OGRN): 1116195010711",
        "Registered address: 91 Suvorova St., Letter A, Office 12, Rostov-on-Don, Rostov Region, 344006",
        "Contact phone: +7 909 436-32-60",
        "Contact email: i.vasin@webpractik.ru / info@talentmind.ru",
      ] },
    ],
  },
];

const APPENDIX_TIERS = [
  {
    name: "Free",
    price: "$0",
    limit: "5 interviews (one-time)",
    incl: "Included:",
    feats: ["Upload of corporate culture profile", "Basic soft skills scoring and AI report", "Basic analytics dashboards"],
  },
  {
    name: "Starter",
    price: "$149 / mo",
    limit: "up to 30 interviews / mo",
    incl: "Everything in Free, plus:",
    feats: ["Integration with video conferencing systems", "Data storage in secure EU/MENA data centers", "Email support"],
  },
  {
    name: "Growth",
    price: "$449 / mo",
    limit: "up to 100 interviews / mo",
    incl: "Everything in Starter, plus:",
    feats: ["Integration with ATS systems", "Report branding (company logo)", "Priority support via messengers"],
  },
  {
    name: "Scale",
    price: "$1,699 / mo",
    limit: "up to 400 interviews / mo",
    incl: "Everything in Growth, plus:",
    feats: ["Open API and webhooks", "1 custom AI competency model", "Bias control", "Dedicated account manager"],
  },
];

const APPENDIX_NOTES = [
  "The Free plan is provided one time to get acquainted with the service — with no payment and no bank card required.",
  "Payment for paid plans is made as an advance payment for a billing period equal to 1 (one) calendar month.",
  "Any interview (assessment) limit unused during a billing period is not carried over to the next billing period and is not subject to monetary compensation.",
  "Integrations under the plans are carried out by the Customer using the technical documentation provided by the Contractor (for the Scale plan, access is provided via the API).",
];

export default function OfferPage() {
  return (
    <main className="relative w-full" style={{ color: INK }}>

      <section className="mx-auto max-w-[860px] px-6 pt-36 pb-20 md:px-8 lg:pt-44">
        <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: GREEN }}>Legal information</p>
        <h1 className="mt-4 text-[clamp(1.9rem,3.4vw,2.9rem)] font-bold leading-[1.1] tracking-tight">
          Public Offer
        </h1>
        <p className="mt-3 text-lg font-semibold text-[#183833]/80">on entering into a services agreement for the TalentMind service</p>
        <div className="mt-4 space-y-1 text-sm text-[#183833]/55">
          <p>Date of publication: June 8, 2026</p>
          <p>Online location: https://talentmind.ru/</p>
        </div>

        <div className="mt-10 divide-y divide-[#e6ece4]">
          {SECTIONS.map((s) => (
            <section key={s.h} className="py-7 first:pt-0">
              <h2 className="text-lg font-bold tracking-tight sm:text-xl" style={{ color: INK }}>{s.h}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((b, i) =>
                  typeof b === "string" ? (
                    <p key={i} className="text-[15px] leading-relaxed text-[#183833]/75">{b}</p>
                  ) : "sub" in b ? (
                    <p key={i} className="pt-2 text-base font-semibold" style={{ color: INK }}>{b.sub}</p>
                  ) : (
                    <ul key={i} className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#183833]/75 marker:text-[#7AB800]">
                      {b.list.map((li, j) => <li key={j}>{li}</li>)}
                    </ul>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        {/* ПРИЛОЖЕНИЕ № 1 */}
        <div className="mt-14 rounded-[2rem] border border-[#e6ece4] bg-white p-6 shadow-[0_24px_60px_rgba(24,56,51,0.06)] md:p-9">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: TEAL }}>Appendix No. 1</p>
          <h2 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">TalentMind service pricing plans</h2>
          <p className="mt-1 text-sm text-[#183833]/55">to the Public Offer on the rendering of services dated June 3, 2026</p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#183833]/75">
            The Contractor provides Services under four base Pricing plans. The scope of available features and the limits
            on conducting assessments (interviews) are determined by the selected plan:
          </p>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e8efe6]">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#f6faef]" style={{ color: INK }}>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">Pricing plan</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">Cost</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">Assessment limit</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide">Plan contents</th>
                </tr>
              </thead>
              <tbody>
                {APPENDIX_TIERS.map((t) => (
                  <tr key={t.name} className="border-t border-[#eef0ee] align-top">
                    <td className="px-4 py-4 font-bold uppercase tracking-wide" style={{ color: GREEN }}>{t.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap font-semibold" style={{ color: INK }}>{t.price}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-[#183833]/70">{t.limit}</td>
                    <td className="px-4 py-4 text-[#183833]/75">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#183833]/45">{t.incl}</p>
                      <ul className="mt-1.5 space-y-1">
                        {t.feats.map((f) => (
                          <li key={f} className="flex items-start gap-2 leading-snug"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GREEN }} /> {f}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-7 text-sm font-semibold" style={{ color: INK }}>Additional plan terms:</p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-[#183833]/75 marker:text-[#7AB800]">
            {APPENDIX_NOTES.map((n) => <li key={n}>{n}</li>)}
          </ol>
        </div>

        <p className="mt-10 text-sm text-[#183833]/50">© 2026 TalentMind AI CORP</p>
      </section>
    </main>
  );
}
