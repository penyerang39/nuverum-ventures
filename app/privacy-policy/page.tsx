import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Nuverum Ventures',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container max-w-4xl">
        <div className="bg-surface rounded-2xl p-8 md:p-12">
          <h1 className="heading-lg mb-2">PRIVACY POLICY</h1>
          <p className="text-muted mb-8">
            <strong>Last Updated:</strong> October 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted">
              Xeniton Corp., a Florida-registered corporation operating under the tradename "Nuverum Ventures", ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="font-semibold mb-2">Information You Provide:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted mb-4">
              <li>Name, email address, phone number</li>
              <li>Company name and business information</li>
              <li>Pitch decks and business materials</li>
              <li>Financial information related to fundraising needs</li>
              <li>Any other information you choose to share with us</li>
            </ul>
            <p className="font-semibold mb-2">Automatically Collected Information:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>Website usage data (IP address, browser type, pages visited)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Email engagement metrics (open rates, clicks)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>Provide consulting services you've requested</li>
              <li>Communicate with you about your engagement</li>
              <li>Improve our services and website</li>
              <li>Send occasional updates about our services (you can opt out)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. How We Share Your Information</h2>
            <p className="text-muted mb-2">We do not sell your personal information. We may share your information:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted mb-4">
              <li>With service providers who help us operate our business (e.g., email platforms, payment processors)</li>
              <li>When required by law or legal process</li>
              <li>With your explicit consent</li>
              <li>In anonymized, aggregated form that does not identify you</li>
            </ul>
            <p className="text-muted">
              <strong>Investor Introductions:</strong> If we facilitate introductions to investors on your behalf, we will share relevant business information with those investors. We will not share personal information beyond what is necessary for the introduction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Data Security</h2>
            <p className="text-muted mb-2">We implement reasonable security measures to protect your information, including:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted mb-4">
              <li>Encrypted data transmission (SSL/TLS)</li>
              <li>Secure storage of sensitive documents</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments</li>
            </ul>
            <p className="text-muted">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Data Retention</h2>
            <p className="text-muted mb-2">We retain your information:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>For the duration of our engagement and for a reasonable period thereafter</li>
              <li>As long as necessary to comply with legal obligations</li>
              <li>Until you request deletion (subject to legal retention requirements)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Your Rights</h2>
            <p className="text-muted mb-2">Depending on your location, you may have rights to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Object to certain processing activities</li>
            </ul>
            <p className="text-muted">
              To exercise these rights, contact us at info@nuverum.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Cookies and Tracking</h2>
            <p className="text-muted mb-2">Our website uses cookies to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted mb-4">
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage</li>
              <li>Improve user experience</li>
            </ul>
            <p className="text-muted">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Third-Party Links</h2>
            <p className="text-muted">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Children's Privacy</h2>
            <p className="text-muted">
              Our services are not directed to individuals under 18. We do not knowingly collect information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">11. International Users</h2>
            <p className="text-muted">
              If you are accessing our services from outside the United States, please note that your information may be transferred to and processed in the United States.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">12. Changes to This Policy</h2>
            <p className="text-muted">
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">13. Contact Us</h2>
            <p className="text-muted">
              For questions about this Privacy Policy, contact us at: <strong>info@nuverum.com</strong>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
