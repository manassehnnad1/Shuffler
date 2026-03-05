export type Video = {
  id: string
  title: string
  channel: string
  description: string
  thumb: string
  duration: number
}

export async function fetchPlaylist(playlistUrl: string, ytKey: string): Promise<Video[]> {
  const url = new URL(playlistUrl)
  const playlistId = url.searchParams.get('list')
  if (!playlistId) throw new Error('No playlist ID found in URL')

  const items: Video[] = []
  let pageToken = ''

  do {
    const apiUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
    apiUrl.searchParams.set('part', 'snippet')
    apiUrl.searchParams.set('playlistId', playlistId)
    apiUrl.searchParams.set('maxResults', '50')
    apiUrl.searchParams.set('key', ytKey)
    if (pageToken) apiUrl.searchParams.set('pageToken', pageToken)

    const res = await fetch(apiUrl.toString())
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`)
    const data = await res.json()

    for (const item of data.items) {
      const s = item.snippet
      if (s.title === 'Deleted video' || s.title === 'Private video') continue
      items.push({
        id: s.resourceId.videoId,
        title: s.title,
        channel: s.videoOwnerChannelTitle || '',
        description: s.description || '',
        thumb: s.thumbnails?.high?.url || s.thumbnails?.medium?.url || '',
        duration: 0,
      })
    }
    pageToken = data.nextPageToken || ''
  } while (pageToken)

  return items
}