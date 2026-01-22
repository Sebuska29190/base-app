function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
  );
}

export async function GET() {
  const URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://gm-onchain-miniapp.vercel.app'; // Update with actual Vercel URL

  return Response.json({
    accountAssociation: {
      header: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9', // Placeholder: replace with actual header from Base tool
      payload: 'eyJkb21haW4iOiJnbS1vbmNoYWluLW1pbmlhcHAudmVyY2VsLmFwcCIsImlzcyI6ImRpZDpldGhyOjB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwic3ViIjoiZGlkOmV0aHI6MHgyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWYwMTIzNDU2Nzg5IiwiYXVkIjoiZGlkOmV0aHI6MHhhYmNkZWYwMTIzNDU2Nzg5YWJjZGVmMDEyMzQ1Njc4OWFiY2QiLCJleHAiOjE3MjUwMDAwMDAsImlhdCI6MTcyNDkwMDAwMCwibmJmIjoxNzI0OTAwMDAwfQ', // Placeholder: replace with actual payload
      signature: 'signature_here' // Placeholder: replace with actual signature
    },
    miniapp: {
      version: '1',
      name: 'GM Onchain',
      homeUrl: URL,
      iconUrl: `${URL}/gm-icon.png`,
      splashImageUrl: `${URL}/gm-splash.png`,
      splashBackgroundColor: '#0000FF',
      webhookUrl: `${URL}/api/webhook`,
      subtitle: 'Daily Good Morning Rewards',
      description: 'Post "Good Morning" onchain, track your streak, and earn rewards on Base!',
      screenshotUrls: [
        `${URL}/screenshot-portrait.png`
      ],
      primaryCategory: 'social',
      tags: ['gm', 'onchain', 'rewards', 'daily', 'base'],
      heroImageUrl: `${URL}/gm-hero.png`,
      tagline: 'Say GM and earn onchain!',
      ogTitle: 'GM Onchain Mini App',
      ogDescription: 'Daily rewards for your GM posts on Base.',
      ogImageUrl: `${URL}/gm-hero.png`
    }
  });
}