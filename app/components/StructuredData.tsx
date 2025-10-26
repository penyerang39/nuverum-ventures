export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nuverum Ventures',
    description: 'We help founders prepare to raise capital with strategic guidance, pitch refinement, and investor preparation. Flat-fee fundraising consultation services.',
    url: 'https://nuverum.com',
    logo: 'https://nuverum.com/logos/nuverumBlack.svg',
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Person',
        name: 'Daniel',
        jobTitle: 'Co-Founder',
        description: 'Growth-focused entrepreneur with expertise in business development and fundraising.',
      },
      {
        '@type': 'Person',
        name: 'Thomas',
        jobTitle: 'Co-Founder',
        description: 'Finance-driven entrepreneur with expertise in tax strategy, financial optimization, and fintech.',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'International',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Business Inquiries',
      url: 'https://nuverum.com/#contact',
    },
    sameAs: [
      'https://twitter.com/nuverum_ventures',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Venture Capital Introductory Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Investor Introduction',
            description: 'Curated introductions to our established investor network',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pitch Material Evaluation',
            description: 'Professional evaluation and feedback on pitch materials',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Venture Capital Consultation',
            description: 'Strategic guidance on fundraising and venture capital',
          },
        },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nuverum Ventures',
    url: 'https://nuverum.com',
    description: 'We help founders prepare to raise capital with strategic guidance, pitch refinement, and investor preparation. Flat-fee fundraising consultation services.',
    publisher: {
      '@type': 'Organization',
      name: 'Nuverum Ventures',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

