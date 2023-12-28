export interface People {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: Array<any>
  species: Array<any>
  vehicles: Array<any>
  starships: Array<any>
  created: string
  edited: string
  url: string
}

export interface Films {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: Array<any>
  planets: Array<any>
  starships: Array<any>
  vehicles: Array<any>
  species: Array<any>
  created: string
  edited: string
  url: string
}

export interface Planets {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: Array<any>
  films: Array<any>
  created: string
  edited: string
  url: string
}
