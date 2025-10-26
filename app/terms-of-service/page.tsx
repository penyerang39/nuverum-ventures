import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Nuverum Ventures',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container max-w-4xl">
        <div className="bg-surface rounded-2xl p-8 md:p-12">
          <h1 className="heading-lg mb-2">TERMS OF SERVICE</h1>
          <p className="text-muted mb-8">
            <strong>Last Updated:</strong> October 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted">
              By accessing or using the services of Xeniton Corp., a Florida-registered corporation operating under the tradename "Nuverum Ventures", ("Nuverum," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Services Provided</h2>
            <p className="text-muted mb-2">Nuverum Ventures operates exclusively as a fundraising consultation firm. We provide:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>Pitch deck evaluation and redesign services</li>
              <li>Strategic fundraising consulting and planning</li>
              <li>Investor research and database compilation</li>
              <li>Business advisory services related to fundraising preparation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Nature of Services - Consultation Only</h2>
            <p className="text-muted mb-2">
              <strong>IMPORTANT:</strong> Nuverum Ventures is a consulting firm, not a broker-dealer, finder, or intermediary. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted mb-4">
              <li>Act as a broker or dealer in securities</li>
              <li>Receive transaction-based compensation</li>
              <li>Accept success fees, carry, warrants, or equity as compensation</li>
              <li>Operate as intermediaries in securities transactions</li>
              <li>Guarantee fundraising outcomes or investor introductions</li>
            </ul>
            <p className="text-muted">
              All services are provided on a flat-fee consulting basis. Our compensation is never contingent on whether you successfully raise capital.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Client Obligations</h2>
            <p className="text-muted mb-2">You agree to:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>Provide accurate and complete information about your business</li>
              <li>Respond to our requests for information in a timely manner</li>
              <li>Use our deliverables and advice for lawful purposes only</li>
              <li>Comply with all applicable securities laws and regulations</li>
              <li>Conduct your own due diligence on any investors you engage with</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>All fees are quoted on a flat-rate basis and agreed upon before engagement</li>
              <li>Payment is typically due 50% upfront and 50% upon delivery, unless otherwise agreed</li>
              <li>Fees are non-refundable once work has commenced</li>
              <li>Late payments may result in suspension of services</li>
              <li>All fees are exclusive of applicable taxes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>All materials created by Nuverum for your project become your property upon full payment</li>
              <li>You grant us the right to use your company name and logo as a case study (unless you opt out)</li>
              <li>We retain ownership of our proprietary methodologies, templates, and processes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Confidentiality</h2>
            <p className="text-muted mb-2">
              We agree to keep your confidential business information private and will not disclose it to third parties without your consent, except:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>When required by law</li>
              <li>When necessary to provide the agreed-upon services</li>
              <li>When information is already publicly available</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. No Guarantees</h2>
            <p className="text-muted mb-2">We do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted mb-4">
              <li>That you will successfully raise capital</li>
              <li>Specific fundraising outcomes or amounts</li>
              <li>Investor meetings or introductions (though we may facilitate them)</li>
              <li>That investors will respond favorably to your materials</li>
            </ul>
            <p className="text-muted">
              Our role is to provide professional consultation and prepare you for fundraising. Actual fundraising outcomes depend on many factors outside our control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted mb-2">To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>Our total liability shall not exceed the fees paid for our services</li>
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>We are not responsible for your fundraising outcomes or investor relationships</li>
              <li>You are solely responsible for your securities compliance obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">10. Termination</h2>
            <p className="text-muted mb-2">Either party may terminate the engagement with written notice. Upon termination:</p>
            <ul className="list-disc pl-6 space-y-1 text-muted">
              <li>You remain obligated to pay for services rendered to date</li>
              <li>We will deliver any completed work products</li>
              <li>Confidentiality obligations survive termination</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">11. Independent Contractor</h2>
            <p className="text-muted">
              Nuverum Ventures is an independent contractor. Nothing in these terms creates a partnership, joint venture, employment, or agency relationship.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">12. Governing Law</h2>
            <p className="text-muted">
              These terms are governed by the laws of Florida, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Florida.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">13. Amendments</h2>
            <p className="text-muted">
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">14. Contact</h2>
            <p className="text-muted">
              For questions about these terms, contact us at <strong>info@nuverum.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
