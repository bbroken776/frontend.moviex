import IMovie from './iMovie';

export default interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN';

  likedMovies?: IMovie[];

  createdAt: string;
  updatedAt: string;
}
