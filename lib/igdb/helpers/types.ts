type DefaultObj = {
  id: number;
  name: string;
};

export type Game = {
  id: number;
  name: string;
  first_release_date: number;
  cover: {
    id: number;
    url: string;
  };
  screenshots: {
    id: number;
    url: string;
  }[];
  platforms: DefaultObj[];
  genres: DefaultObj[];
  total_rating: number;
  involved_companies: {
    id: number;
    developer: boolean;
    publisher: boolean;
    company: DefaultObj;
  }[];

  release_date: string;
  developers: DefaultObj[];
  publishers: DefaultObj[];
};
