export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
  likes: number
  like_users_id: number[]
  dislikes: number
  dislike_users_id: number[]
}
