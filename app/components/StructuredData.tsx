export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nuverum Ventures',
    description: 'Strategic venture capital and investment solutions for innovative companies. We bridge vision with opportunity to fuel business growth and entrepreneurship.',
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
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nuverum Ventures',
    url: 'https://nuverum.com',
    description: 'Strategic venture capital and investment solutions for innovative companies. We bridge vision with opportunity to fuel business growth and entrepreneurship.',
    publisher: {
      '@type': 'Organization',
      name: 'Nuverum Ventures',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Venture Capital Consulting',
    provider: {
      '@type': 'Organization',
      name: 'Nuverum Ventures',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Venture Capital Services',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

