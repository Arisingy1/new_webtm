import { GREEN, INK } from "@/components/tm/ui";

/* ============================================================
   /privacy — Политика обработки персональных данных
   ООО «ВЕБПРАКТИК» (152-ФЗ)
   ============================================================ */

type Block = string | { sub: string } | { list: string[] };
type Section = { h: string; body: Block[] };

const SECTIONS: Section[] = [
  {
    h: "1. General Provisions",
    body: [
      "This personal data processing policy has been drawn up in accordance with the requirements of Federal Law No. 152-FZ of July 27, 2006 “On Personal Data” (hereinafter — the Personal Data Law) and defines the procedure for processing personal data and the measures taken by Webpractic LLC (hereinafter — the Operator) to ensure the security of personal data.",
      "1.1. The Operator sets as the most important goal and condition of its activities the observance of the rights and freedoms of the individual and citizen when processing their personal data, including the protection of the rights to privacy and to personal and family confidentiality.",
      "1.2. This Operator policy regarding the processing of personal data (hereinafter — the Policy) applies to all information that the Operator may obtain about visitors to the talentmind.ru website.",
    ],
  },
  {
    h: "2. Key Terms Used in the Policy",
    body: [
      "2.1. Automated processing of personal data — the processing of personal data using computer technology.",
      "2.2. Blocking of personal data — the temporary suspension of the processing of personal data (except where processing is necessary to clarify personal data).",
      "2.3. Website — a set of graphic and informational materials, as well as computer programs and databases that make them available on the Internet at the network address talentmind.ru.",
      "2.4. Personal data information system — a set of personal data contained in databases together with the information technologies and technical means that ensure their processing.",
      "2.5. Anonymization of personal data — actions as a result of which it becomes impossible, without the use of additional information, to determine the attribution of personal data to a specific User or other personal data subject.",
      "2.6. Processing of personal data — any action (operation) or set of actions (operations) performed with personal data, with or without the use of automation tools, including collection, recording, systematization, accumulation, storage, clarification (updating, modification), extraction, use, transfer (distribution, provision, access), anonymization, blocking, deletion, and destruction of personal data.",
      "2.7. Operator — a government body, municipal body, legal entity, or individual that, independently or jointly with other persons, organizes and/or carries out the processing of personal data, as well as determines the purposes of processing personal data, the composition of the personal data to be processed, and the actions (operations) performed with personal data.",
      "2.8. Personal data — any information relating directly or indirectly to a specific or identifiable User of the talentmind.ru website.",
      "2.9. Personal data permitted by the personal data subject for distribution — personal data to which access by an unlimited range of persons is granted by the personal data subject by giving consent to the processing of personal data permitted by the personal data subject for distribution in the manner provided for by the Personal Data Law (hereinafter — personal data permitted for distribution).",
      "2.10. User — any visitor to the talentmind.ru website.",
      "2.11. Provision of personal data — actions aimed at disclosing personal data to a specific person or a specific range of persons.",
      "2.12. Distribution of personal data — any actions aimed at disclosing personal data to an indefinite range of persons (transfer of personal data) or at making personal data available to an unlimited range of persons, including the publication of personal data in the mass media, posting in information and telecommunications networks, or granting access to personal data by any other means.",
      "2.13. Cross-border transfer of personal data — the transfer of personal data to the territory of a foreign state, to an authority of a foreign state, or to a foreign individual or foreign legal entity.",
      "2.14. Destruction of personal data — any actions as a result of which personal data is irrevocably destroyed with the impossibility of further restoring the content of the personal data in the personal data information system and/or the material carriers of the personal data are destroyed.",
    ],
  },
  {
    h: "3. Main Rights and Obligations of the Operator",
    body: [
      "3.1. The Operator has the right to:",
      { list: [
        "obtain from the personal data subject accurate information and/or documents containing personal data;",
        "in the event that the personal data subject withdraws consent to the processing of personal data, or submits a request to cease the processing of personal data, the Operator has the right to continue processing the personal data without the consent of the personal data subject where there are grounds specified in the Personal Data Law;",
        "independently determine the composition and list of measures necessary and sufficient to ensure the fulfillment of the obligations provided for by the Personal Data Law and by the regulatory legal acts adopted in accordance with it, unless otherwise provided by the Personal Data Law or other federal laws.",
      ] },
      "3.2. The Operator is obliged to:",
      { list: [
        "provide the personal data subject, upon request, with information concerning the processing of their personal data;",
        "organize the processing of personal data in the manner established by the current legislation of the Russian Federation;",
        "respond to inquiries and requests from personal data subjects and their legal representatives in accordance with the requirements of the Personal Data Law;",
        "report to the authorized body for the protection of the rights of personal data subjects, upon that body's request, the necessary information within 10 days of receiving such a request;",
        "publish or otherwise provide unrestricted access to this Policy;",
        "take legal, organizational, and technical measures to protect personal data from unlawful or accidental access, destruction, modification, blocking, copying, provision, or distribution of personal data, as well as from other unlawful actions in relation to personal data;",
        "cease the transfer (distribution, provision, access) of personal data, cease processing, and destroy personal data in the manner and in the cases provided for by the Personal Data Law;",
        "fulfill other obligations provided for by the Personal Data Law.",
      ] },
    ],
  },
  {
    h: "4. Main Rights and Obligations of Personal Data Subjects",
    body: [
      "4.1. Personal data subjects have the right to:",
      { list: [
        "obtain information concerning the processing of their personal data, except in the cases provided for by federal laws. The information is provided to the personal data subject by the Operator in an accessible form, and it must not contain personal data relating to other personal data subjects, except where there are lawful grounds to disclose such personal data. The list of information and the procedure for obtaining it are established by the Personal Data Law;",
        "demand that the Operator clarify, block, or destroy their personal data where the personal data is incomplete, outdated, inaccurate, unlawfully obtained, or no longer necessary for the stated purpose of processing, as well as take measures provided for by law to protect their rights;",
        "set as a condition the prior consent to the processing of personal data for the purposes of promoting goods, works, and services on the market;",
        "withdraw consent to the processing of personal data, as well as submit a request to cease the processing of personal data;",
        "appeal to the authorized body for the protection of the rights of personal data subjects, or through the courts, against unlawful actions or inaction by the Operator in the processing of their personal data;",
        "exercise other rights provided for by the legislation of the Russian Federation.",
      ] },
      "4.2. Personal data subjects are obliged to:",
      { list: [
        "provide the Operator with accurate data about themselves;",
        "inform the Operator about the clarification (updating, modification) of their personal data.",
      ] },
      "4.3. Persons who have provided the Operator with inaccurate information about themselves, or information about another personal data subject without that subject's consent, bear liability in accordance with the legislation of the Russian Federation.",
    ],
  },
  {
    h: "5. Principles of Personal Data Processing",
    body: [
      "5.1. The processing of personal data is carried out on a lawful and fair basis.",
      "5.2. The processing of personal data is limited to the achievement of specific, predetermined, and lawful purposes. Processing of personal data that is incompatible with the purposes of collecting the personal data is not permitted.",
      "5.3. It is not permitted to combine databases containing personal data that are processed for purposes incompatible with one another.",
      "5.4. Only personal data that corresponds to the purposes of its processing is subject to processing.",
      "5.5. The content and volume of the personal data processed correspond to the stated purposes of processing. Redundancy of the personal data processed in relation to the stated purposes of its processing is not permitted.",
      "5.6. When processing personal data, the accuracy of the personal data, its sufficiency, and, where necessary, its relevance to the purposes of processing are ensured. The Operator takes the necessary measures and/or ensures that they are taken to delete or clarify incomplete or inaccurate data.",
      "5.7. Personal data is stored in a form that allows the personal data subject to be identified for no longer than is required by the purposes of processing the personal data, unless the storage period for the personal data is established by federal law or by an agreement to which the personal data subject is a party, beneficiary, or guarantor. The personal data processed is destroyed or anonymized upon achievement of the purposes of processing or in the event that the need to achieve those purposes is lost, unless otherwise provided by federal law.",
    ],
  },
  {
    h: "6. Purposes of Personal Data Processing",
    body: [
      "6.1. Purpose of processing: providing the User with access to the services, information, and/or materials contained on the website.",
      { list: [
        "Personal data: surname, first name, patronymic; email address; phone numbers.",
        "Legal grounds: the Operator's charter (constitutive) documents; the Personal Data Law; the consent of the personal data subject.",
        "Types of personal data processing: collection, recording, systematization, accumulation, storage, destruction, and anonymization of personal data.",
      ] },
      "6.2. Purpose of processing: generating a demonstration analytical report based on the results of processing an interview recording (audio/video) uploaded by the User as part of the service's demo scenario.",
      { list: [
        "Personal data: information that may be contained in the uploaded interview recording and/or communicated by the User when using the demo scenario (including, potentially, information that makes it possible to identify the personal data subject).",
        "Legal grounds: the consent of the personal data subject (including the consent of the User who provided the recording and/or who has lawful grounds to provide it); the Personal Data Law.",
        "Types of personal data processing: receipt (upload) of the recording, processing, anonymization, generation of the result (demo report), termination of access, and deletion within the time limits set out in this Policy.",
      ] },
    ],
  },
  {
    h: "7. Conditions for Personal Data Processing",
    body: [
      "7.1. The processing of personal data is carried out with the consent of the personal data subject to the processing of their personal data.",
      "7.2. The processing of personal data is necessary to achieve the purposes provided for by an international treaty of the Russian Federation or by law, and to perform the functions, powers, and obligations imposed on the Operator by the legislation of the Russian Federation.",
      "7.3. The processing of personal data is necessary for the administration of justice and the execution of a court judgment or an act of another body or official subject to execution in accordance with the legislation of the Russian Federation on enforcement proceedings.",
      "7.4. The processing of personal data is necessary for the performance of an agreement to which the personal data subject is a party, beneficiary, or guarantor, as well as for the conclusion of an agreement at the initiative of the personal data subject or an agreement under which the personal data subject will be a beneficiary or guarantor.",
      "7.5. The processing of personal data is necessary to exercise the rights and legitimate interests of the Operator or third parties, or to achieve socially significant purposes, provided that the rights and freedoms of the personal data subject are not thereby violated.",
      "7.6. The processing is carried out of personal data to which access by an unlimited range of persons has been granted by the personal data subject or at that subject's request (hereinafter — publicly available personal data).",
      "7.7. The processing is carried out of personal data subject to publication or mandatory disclosure in accordance with federal law.",
    ],
  },
  {
    h: "8. Procedure for the Collection, Storage, Transfer, and Other Types of Personal Data Processing",
    body: [
      "The security of the personal data processed by the Operator is ensured through the implementation of the legal, organizational, and technical measures necessary to fully meet the requirements of the current legislation in the field of personal data protection.",
      "8.1. The Operator ensures the integrity of personal data and takes all possible measures to prevent unauthorized persons from accessing personal data.",
      "8.2. The User's personal data is not transferred to third parties, except in cases related to compliance with current legislation, or where the personal data subject has given the Operator consent to transfer the data to a third party for the performance of obligations under a civil-law contract, as well as in cases where the Operator engages third parties (service providers) to ensure the operation of the website and the service, provided that they comply with the requirements of the legislation of the Russian Federation on personal data and confidentiality.",
      "8.3. If inaccuracies are found in the personal data, the User may update them independently by sending the Operator a notice to the Operator's email address info@talentmind.ru marked “Personal data update”.",
      "8.4. The period of personal data processing is determined by the achievement of the purposes for which the personal data was collected, unless a different period is provided for by an agreement or by current legislation. The User may withdraw their consent to the processing of personal data at any time by sending the Operator a notice via email to the Operator's email address info@talentmind.ru marked “Withdrawal of consent to personal data processing”.",
      "8.5. All information collected by third-party services, including payment systems, communication tools, and other service providers, is stored and processed by those persons (Operators) in accordance with their user agreements and privacy policies. The Operator bears no liability for the actions of third parties, including the service providers referred to in this clause.",
      "8.6. Prohibitions established by the personal data subject on the transfer (other than granting access), as well as on the processing or conditions of processing (other than obtaining access) of personal data permitted for distribution, do not apply in cases of processing personal data in state, public, and other public interests defined by the legislation of the Russian Federation.",
      "8.7. When processing personal data, the Operator ensures the confidentiality of personal data.",
      "8.8. The Operator stores personal data in a form that allows the personal data subject to be identified for no longer than is required by the purposes of processing the personal data, unless the storage period for the personal data is established by federal law or by an agreement to which the personal data subject is a party, beneficiary, or guarantor.",
      "8.9. Grounds for ceasing the processing of personal data may include the achievement of the purposes of processing the personal data, the expiration of the term of the personal data subject's consent, the withdrawal of consent by the personal data subject or a request to cease the processing of personal data, as well as the discovery of unlawful processing of personal data.",
      { sub: "8.10. Specifics of processing data uploaded by the User in the demo scenario" },
      "8.10.1. As part of the demo scenario, the User may upload an interview audio file. That file is used solely to generate a demonstration analytical report. The Operator does not store uploaded interview files after the processing and generation of the demo report is complete. Short-term technical hosting of the file is permitted for the period of processing and delivering the results to the User.",
      "8.10.2. When generating the demo report, the Operator applies anonymization measures: personal data and other identifiers (including full name, contact details, addresses, links, document details, and other information making it possible to identify the personal data subject) are excluded from the analysis results and from the report. The report may use only the candidate's first name (without surname/patronymic) and generalized descriptions of experience (for example, industry/company type) without naming specific organizations.",
      "8.10.3. Access to the generated demo report via a public link is granted for a period of no more than 48 (forty-eight) hours from the moment the link is generated; after that period, access to the report via that link is terminated.",
      { sub: "8.11. Availability period of demo materials" },
      "The Operator ensures that the availability period of the demo report via a public link is limited. After 48 (forty-eight) hours, the Operator terminates access to the demo report via the corresponding link and/or deletes the demo materials as part of applicable technical procedures.",
      { sub: "8.12. Scope of data in the demo report" },
      "The demo report is generated in anonymized form and is intended to demonstrate the service's functionality. The demo report must not contain personal data that makes it possible to directly or indirectly identify the personal data subject, except in the case specified in clause 8.10.2 (first name without other identifiers).",
    ],
  },
  {
    h: "9. List of Actions Performed by the Operator with the Personal Data Obtained",
    body: [
      "9.1. The Operator carries out the collection, recording, systematization, accumulation, storage, clarification (updating, modification), extraction, use, transfer (distribution, provision, access), anonymization, blocking, deletion, and destruction of personal data.",
      "9.2. The Operator carries out the automated processing of personal data with or without the receipt and/or transfer of the information obtained over information and telecommunications networks.",
    ],
  },
  {
    h: "10. Cross-Border Transfer of Personal Data",
    body: [
      "10.1. Before commencing activities involving the cross-border transfer of personal data, the Operator is obliged to notify the authorized body for the protection of the rights of personal data subjects of its intention to carry out the cross-border transfer of personal data (such notification is sent separately from the notification of the intention to carry out the processing of personal data).",
      "10.2. Before submitting the above notification, the Operator is obliged to obtain the relevant information from the authorities of the foreign state, the foreign individuals, and the foreign legal entities to which the cross-border transfer of personal data is planned.",
    ],
  },
  {
    h: "11. Confidentiality of Personal Data",
    body: [
      "The Operator and other persons who have obtained access to personal data are obliged not to disclose to third parties and not to distribute personal data without the consent of the personal data subject, unless otherwise provided by federal law.",
    ],
  },
  {
    h: "12. Final Provisions",
    body: [
      "12.1. The User may obtain any clarifications on questions of interest concerning the processing of their personal data by contacting the Operator via email at info@talentmind.ru.",
      "12.2. This document will reflect any changes to the Operator's personal data processing policy. The Policy is valid indefinitely until it is replaced by a new version.",
      "12.3. The current version of the Policy is freely available on the Internet at: talentmind.ru/privacy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative w-full" style={{ color: INK }}>

      <section className="mx-auto max-w-[860px] px-6 pt-36 pb-20 md:px-8 lg:pt-44">
        <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: GREEN }}>Legal information</p>
        <h1 className="mt-4 text-[clamp(1.9rem,3.4vw,2.9rem)] font-bold leading-[1.1] tracking-tight">
          Personal Data Processing Policy
        </h1>
        <p className="mt-3 text-lg font-semibold text-[#183833]/80">Webpractic LLC</p>

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
                    <ul key={i} className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed marker:text-[#7AB800] text-[#183833]/75">
                      {b.list.map((li, j) => <li key={j}>{li}</li>)}
                    </ul>
                  )
                )}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#183833]/50">© 2026 Webpractic LLC</p>
      </section>
    </main>
  );
}
