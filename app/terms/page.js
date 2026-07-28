export const metadata = {
  title: 'Terms & Conditions — Standoutdev',
  description: 'Terms and conditions governing use of the Standoutdev website and services.',
}

const sections = [
  {
    t: 'Agreement to terms',
    d: 'By accessing or using the Standoutdev website and related services (“Services”), you agree to these Terms & Conditions. If you do not agree, please do not use the Services. These terms apply to visitors, prospective clients, and anyone who interacts with our site or engages us for work, unless a separate written contract says otherwise.',
  },
  {
    t: 'About Standoutdev',
    d: 'Standoutdev is a design and engineering studio based in Pune, Maharashtra 411052, India. We provide branding, website, product, motion, and related digital services. Contact: standoutdevsolutions@gmail.com · +91 93223 96236.',
  },
  {
    t: 'Use of the website',
    d: 'You may use this website for lawful purposes only. You agree not to misuse the site, attempt to gain unauthorized access to systems or data, interfere with site operation, scrape content at scale without permission, or submit false or harmful information through forms or communications.',
  },
  {
    t: 'Inquiries and proposals',
    d: 'Submitting a contact form or project inquiry does not create a client relationship or obligate us to take on your project. Any engagement for paid work begins only when both parties agree in writing (for example a proposal, statement of work, or contract) covering scope, fees, timelines, and deliverables.',
  },
  {
    t: 'Intellectual property',
    d: 'Unless otherwise agreed in writing, all content on this website — including text, design, graphics, logos, code, and media — is owned by Standoutdev or its licensors and is protected by applicable intellectual property laws. You may not copy, modify, distribute, or commercially exploit site content without our prior written consent. For client projects, ownership of deliverables is governed by the applicable project agreement.',
  },
  {
    t: 'Third-party links and tools',
    d: 'The site may include links to third-party websites or embed third-party tools (including analytics such as Google Tag Manager). We are not responsible for the content, policies, or practices of third parties. Your use of third-party services is at your own risk and subject to their terms.',
  },
  {
    t: 'Disclaimer of warranties',
    d: 'The website and its content are provided “as is” and “as available” without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.',
  },
  {
    t: 'Limitation of liability',
    d: 'To the fullest extent permitted by law, Standoutdev and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill, arising from your use of the website or inability to use it. For paid client work, liability is limited as set out in the applicable project contract.',
  },
  {
    t: 'Indemnification',
    d: 'You agree to indemnify and hold harmless Standoutdev and its team from claims, damages, losses, and expenses (including reasonable legal fees) arising from your misuse of the website, violation of these terms, or infringement of any third-party rights.',
  },
  {
    t: 'Privacy',
    d: 'Our collection and use of personal information is described in our Privacy Policy. By using the Services, you also acknowledge that policy.',
  },
  {
    t: 'Changes to these terms',
    d: 'We may update these Terms & Conditions at any time. The “Last updated” date at the top of this page will reflect the latest version. Continued use of the site after changes constitutes acceptance of the revised terms.',
  },
  {
    t: 'Governing law',
    d: 'These terms are governed by the laws of India. Courts in Pune, Maharashtra shall have exclusive jurisdiction over disputes arising from these terms or your use of the website, subject to any different venue agreed in a project contract.',
  },
  {
    t: 'Contact',
    d: 'Questions about these Terms & Conditions can be sent to standoutdevsolutions@gmail.com, or by phone at +91 93223 96236. Postal: Standoutdev, Pune, Maharashtra 411052, India.',
  },
]

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-25" />
        <div className="relative mx-auto max-w-3xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-8">Legal</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
            Terms & <span className="grad-text">Conditions</span>
          </h1>
          <p className="mt-6 text-sm text-white/40">Last updated: July 28, 2026</p>
          <p className="mt-6 text-lg text-white/60 leading-relaxed">
            These terms govern your use of the Standoutdev website and outline how we work with visitors and clients.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-6 space-y-10">
          {sections.map((s, i) => (
            <div key={s.t} className="border-t border-white/10 pt-8">
              <div className="flex gap-4">
                <span className="font-mono text-sm text-cyan-300/80 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="font-display text-2xl font-semibold">{s.t}</h2>
                  <p className="mt-3 text-white/60 leading-relaxed">{s.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
