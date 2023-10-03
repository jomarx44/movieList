export interface IObjectKeys {
  [key: string]: string | number;
}
export interface MovieTypes {
  title: string;
  genre: string;
  author: string;
}
export interface MovieList extends IObjectKeys {
  id: number | string;
  title: string;
  author: string;
  genre: string;
};
