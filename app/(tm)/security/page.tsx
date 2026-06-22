"use client";

import { ShieldCheck, Lock, Server, FileCheck, Eye, KeyRound } from "lucide-react";
import { Arrow, CTA, GREEN, INK, TEAL, useReveals } from "@/components/tm/ui";

const PILLARS = [
  { icon: <FileCheck className="h-6 w-6" />, t: "Processing under GDPR\n(as a processor)", d: "TalentMind acts as a data processor and handles data strictly on the client's documented instructions: the client is the data controller and is responsible for the candidate's lawful basis (consent). A Data Processing Agreement (DPA, Art. 28 GDPR) is signed with every client, and we provide guidance on collecting valid consent", a: GREEN },
  { icon: <Server className="h-6 w-6" />, t: "Data residency in the EU & MENA", d: "Personal data is hosted in EU and MENA data centers (e.g., Frankfurt and the UAE), so candidate data stays within its region. Regular encrypted backups; for Enterprise — a dedicated, isolated environment in the region of your choice", a: TEAL },
  { icon: <Lock className="h-6 w-6" />, t: "Encryption in transit and at rest", d: "All traffic is protected with TLS 1.2+/HTTPS, and data is encrypted at rest with AES-256. Encryption keys are managed in a dedicated KMS/HSM, with regular rotation and strict access separation", a: GREEN },
  { icon: <ShieldCheck className="h-6 w-6" />, t: "Biometrics and explicit consent", d: "Audio and video recordings of interviews are personal — and in some cases special-category (biometric) — data. We process them only with the data subject's explicit consent (Art. 9 GDPR; aligned with the UAE and KSA PDPL). Recordings are isolated per tenant and accessed strictly on a need-to-know basis", a: TEAL },
  { icon: <Eye className="h-6 w-6" />, t: "Access control and audit", d: "Role-based access control (RBAC) following the principle of least privilege, with two-factor authentication for administrators. Every data operation is logged, and we support data-subject rights — access, rectification, and erasure", a: GREEN },
  { icon: <KeyRound className="h-6 w-6" />, t: "Certified infrastructure and response", d: "Our practices align with ISO/IEC 27001 and SOC 2. Vulnerability management, regular updates, continuous monitoring, and an incident response plan with breach notification within 72 hours (Art. 33 GDPR)", a: TEAL },
];

export default function SecurityPage() {
  const root = useReveals();
  return (
    <div ref={root}>
      <section className="mx-auto max-w-[1100px] px-6 pt-40 pb-12 text-center">
        <h1 className="reveal mx-auto mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1] tracking-tight sm:text-[4rem]">
          Candidate data protection and <span style={{ color: GREEN }}>GDPR</span> compliance
        </h1>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-[#183833]/70">
          Interview recordings are personal data. We process them under GDPR and regional MENA
          data-protection laws, host them in EU and MENA data centers, encrypt everything, and tightly
          control access — so candidate data stays protected at every stage
        </p>
        <div className="reveal mt-9 flex justify-center"><CTA href="/contacts">Request a security demo</CTA></div>
      </section>

      {/* pillars */}
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="stagger grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.t} className="flex h-full flex-col rounded-3xl border border-[#ededed] bg-white p-7 shadow-[0_16px_40px_rgba(24,56,51,0.06)]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: p.a }}>{p.icon}</span>
              <h3 className="mt-5 whitespace-pre-line text-xl font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#183833]/70">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24">
        <div className="reveal flex flex-col items-center gap-4 rounded-3xl p-10 text-center text-white" style={{ background: INK }}>
          <ShieldCheck className="h-10 w-10" style={{ color: GREEN }} />
          <p className="text-2xl font-semibold">Need a security review for your team?</p>
          <p className="max-w-md text-white/70">We'll send our security documentation, a Data Processing Agreement (DPA), a candidate consent form, and answer any questions from your information security team</p>
          <a href="/contacts" className="group mt-2 flex items-center gap-1 rounded-xl px-6 py-3 text-sm font-semibold text-white" style={{ background: GREEN }}>
            Contact us <Arrow className="text-white" />
          </a>
        </div>
      </section>
    </div>
  );
}
