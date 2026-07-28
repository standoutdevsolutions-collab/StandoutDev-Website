export const metadata = {
  title: 'Privacy Policy — Standoutdev',
  description: 'How Standoutdev collects, uses, and protects your personal information.',
}

const sections = [
  {
    t: 'Who we are',
    d: 'Standoutdev (“we”, “us”, or “our”) is a design and engineering studio based in Pune, Maharashtra 411052, India. This Privacy Policy explains how we collect, use, store, and share information when you visit standoutdev.co or otherwise interact with us.',
  },
  {
    t: 'Information we collect',
    d: 'We may collect information you provide directly, such as your name, email address, company name, project details, budget preferences, and any message you submit through our contact form or email. We may also collect technical data automatically, including IP address, browser type, device information, pages visited, referral source, and approximate location, through cookies and analytics tools such as Google Tag Manager and related services.',
  },
  {
    t: 'How we use your information',
    d: 'We use your information to respond to inquiries, evaluate project fit, deliver services, improve our website and offerings, measure traffic and engagement, communicate about projects or updates you request, and comply with legal obligations. We do not sell your personal information.',
  },
  {
    t: 'Cookies and analytics',
    d: 'Our site may use cookies, pixels, and similar technologies to understand how visitors use the site and to improve performance. Google Tag Manager and other analytics or advertising tools may process usage data on our behalf. You can control cookies through your browser settings; disabling cookies may affect some site features.',
  },
  {
    t: 'How we share information',
    d: 'We may share information with trusted service providers who help us operate our business (for example hosting, email, analytics, or form processing), when required by law, or in connection with a business transfer. These parties are expected to use your information only to perform services for us and in line with applicable privacy requirements.',
  },
  {
    t: 'Data retention',
    d: 'We retain personal information only as long as needed for the purposes described in this policy, including responding to inquiries, maintaining project records, meeting legal or accounting requirements, and resolving disputes. When information is no longer needed, we delete or anonymize it where reasonably possible.',
  },
  {
    t: 'Data security',
    d: 'We take reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, or alteration. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
  },
  {
    t: 'Your rights',
    d: 'Depending on your location, you may have rights to access, correct, update, delete, or restrict processing of your personal information, or to object to certain processing. To exercise these rights, contact us using the details below. We may need to verify your identity before fulfilling a request.',
  },
  {
    t: 'Third-party links',
    d: 'Our website may link to third-party sites or services. We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies before providing personal information.',
  },
  {
    t: 'Children’s privacy',
    d: 'Our services are not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us information, please contact us so we can delete it.',
  },
  {
    t: 'Changes to this policy',
    d: 'We may update this Privacy Policy from time to time. The “Last updated” date at the top of this page will reflect the latest revision. Continued use of the site after changes means you accept the updated policy.',
  },
  {
    t: 'Contact us',
    d: 'If you have questions about this Privacy Policy or how we handle your data, contact us at standoutdevsolutions@gmail.com, call +91 93223 96236, or write to Standoutdev, Pune, Maharashtra 411052, India.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="absolute inset-0 grid-lines opacity-25" />
        <div className="relative mx-auto max-w-3xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-8">Legal</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">
            Privacy <span className="grad-text">Policy</span>
          </h1>
          <p className="mt-6 text-sm text-white/40">Last updated: July 28, 2026</p>
          <p className="mt-6 text-lg text-white/60 leading-relaxed">
            Your privacy matters. This policy describes what we collect when you use our website and how we use it.
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
