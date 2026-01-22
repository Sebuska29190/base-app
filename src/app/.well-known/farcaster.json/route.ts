function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://gm-on-base.vercel.app'; // placeholder, assume deployed on vercel

  return Response.json({
    accountAssociation: {
      header: '',
      payload: '',
      signature: ''
    },
    miniapp: {
      version: '1',
      name: 'Gm on Base',
      homeUrl: URL,
      iconUrl: `${URL}/icon.png`,
      splashImageUrl: `${URL}/splash.png`,
      splashBackgroundColor: '#ffffff',
      webhookUrl: `${URL}/api/webhook`,
      subtitle: 'Daily Gm streaks on Base',
      description: 'Say Gm on the Base blockchain and maintain your daily greeting streak.',
      screenshotUrls: [
        `${URL}/screenshot1.png`,
        `${URL}/screenshot2.png`,
        `${URL}/screenshot3.png`
      ],
      primaryCategory: 'social',
      tags: ['gm', 'base', 'streak', 'daily', 'blockchain'],
      heroImageUrl: `${URL}/hero.png`,
      tagline: 'Gm every day on Base',
      ogTitle: 'Gm on Base',
      ogDescription: 'Maintain your daily Gm streak on the Base blockchain.',
      ogImageUrl: `${URL}/og.png`,
      noindex: true
    }
  });
}