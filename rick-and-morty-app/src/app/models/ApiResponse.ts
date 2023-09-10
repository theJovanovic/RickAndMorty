import { Character } from "./Character"
import { Episode } from "./Episode"
import { Location } from "./Location"

export interface ApiResponse {
    info: {
      count: number
      pages: number
      next: string | null
      prev: string | null
    }
    results: Character[] | Episode[] | Location[]
  }