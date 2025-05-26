import ICinemaSession from "./iCinemaSession";

export default interface ICinema{
    id?: number;
    name: string;
    location: string;
    
    cinemaSessions?: ICinemaSession[];

    createdAt?: Date;
    updatedAt?: Date;
}