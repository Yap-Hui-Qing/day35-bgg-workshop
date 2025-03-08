export interface SearchCriteria {
  q: string
  count: number
}

export interface SearchResult {
  gid: number,
  name: string
}

export interface SearchGame {
  gid: number
  name: string
  year: number
  ranking: number
  users_rated: number
  url: string
  image: string
}

export interface Comment {
  gid: number
  user: string
  rating: number
  c_text: string
}
