import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Step 1 — get access token from Auth0
    const tokenRes = await fetch(`https://auth.spacecomputer.io/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.OP_CLIENT_ID,
        client_secret: process.env.OP_CLIENT_SECRET,
        audience: 'https://op.spacecomputer.io/api',
        grant_type: 'client_credentials',
      }),
    })
    const { access_token } = await tokenRes.json()

    // Step 2 — call cTRNG
    const trngRes = await fetch('https://op.spacecomputer.io/api/v1/services/trng', {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    const trng = await trngRes.json()

    // trng.data is a hex string e.g. "0a4c2ea2..."
    res.json({ hex: trng.data, src: trng.src, signature: trng.signature })
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
}