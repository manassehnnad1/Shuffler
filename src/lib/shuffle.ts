import type { Video } from './youtube'

// Convert hex string → array of floats between 0 and 1
function hexToFloats(hex: string, count: number): number[] {
  const floats: number[] = []
  // each 8 hex chars = 4 bytes = 1 uint32
  for (let i = 0; i < count; i++) {
    const chunk = hex.slice((i * 8) % hex.length, (i * 8) % hex.length + 8)
    const int = parseInt(chunk.padEnd(8, '0'), 16)
    floats.push(int / 0xFFFFFFFF)
  }
  return floats
}

async function getCosmicRandoms(count: number): Promise<{ floats: number[], proof: object }> {
  try {
    const res = await fetch('/api/shuffle')
    if (!res.ok) throw new Error('Proxy error')
    const data = await res.json()
    return {
      floats: hexToFloats(data.hex, count),
      proof: { src: data.src, hex: data.hex, signature: data.signature }
    }
  } catch {
    // fallback to crypto if SpaceComputer unreachable
    console.warn('SpaceComputer unavailable, falling back to crypto.getRandomValues')
    const arr = new Uint32Array(count)
    crypto.getRandomValues(arr)
    return {
      floats: Array.from(arr).map(v => v / 0xFFFFFFFF),
      proof: { src: 'crypto.getRandomValues (fallback)', hex: null, signature: null }
    }
  }
}

export async function cosmicShuffle(videos: Video[]): Promise<{ shuffled: Video[], proof: object }> {
  const { floats, proof } = await getCosmicRandoms(videos.length)
  const arr = [...videos]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(floats[i] * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return { shuffled: arr, proof }
}