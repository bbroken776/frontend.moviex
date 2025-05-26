export default interface IMovie {
  id?: number;
  title: string;
  description: string;
  year: number;
  genres: string[];
  duration: number;
  trailer: string;
  poster: string
  banner: string

  createdAt?: Date;
  updatedAt?: Date;
}
