export interface Movie {
  id: string;
  title: string;
  image: string;
  synopsis: string;
  rating: number;
  type: string;
  released: number;
  runtime: string;
  largeimage: string;
  unogsdate: string;
  imdbid: string;
  download: string;
}

export class FilterState {
  year: number;
  rating: number;

  constructor(year: number, rating: number) {
    this.year = year;
    this.rating = rating;
  }
}
