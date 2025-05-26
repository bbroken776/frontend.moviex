export default interface ICinemaSession {
    id?: number;
    movieId: number;
    cinemaId: number;
    startTime: number;

    createdAt?: Date;
    updatedAt?: Date;
}