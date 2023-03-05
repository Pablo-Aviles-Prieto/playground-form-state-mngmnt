interface IPokeObj {
  name: string;
  url: string;
}

export interface IPokeList {
  count: number;
  next: string;
  previous: string;
  results: IPokeObj[];
}

interface SpeciesOrSprites {}

export interface ISinglePokemon {
  abilities?: null[] | null;
  base_experience: number;
  forms?: null[] | null;
  game_indices?: null[] | null;
  height: number;
  held_items?: null[] | null;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves?: null[] | null;
  name: string;
  order: number;
  past_types?: null[] | null;
  species: SpeciesOrSprites;
  sprites: SpeciesOrSprites;
  stats?: null[] | null;
  types?: null[] | null;
  weight: number;
}
