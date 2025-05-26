import React, { useState } from 'react';
import ICinema from '@interfaces/iCinema';
import ICinemaSession from '@interfaces/iCinemaSession';
import IMovie from '@interfaces/iMovie';

interface CheckoutDisplayProps {
    movie: IMovie;
    cinema: ICinema;
    session: ICinemaSession;
}

const ADULT_TICKET_PRICE = 10.0;
const CHILD_TICKET_PRICE = 7.5;
const SENIOR_TICKET_PRICE = 8.0;

const getPopcornPrice = (size: 'small' | 'medium' | 'large'): number => {
    return size === 'small' ? 3.0 : size === 'medium' ? 5.0 : 7.0;
};
const getDrinkPrice = (size: 'small' | 'medium' | 'large'): number => {
    return size === 'small' ? 2.0 : size === 'medium' ? 3.0 : 4.0;
};

const calcTotalPrice = (
    adultTickets: number,
    childTickets: number,
    seniorTickets: number,
    popcornSize: 'small' | 'medium' | 'large' | null,
    drinkSize: 'small' | 'medium' | 'large' | null,
): number => {
    const adultPrice = adultTickets * ADULT_TICKET_PRICE;
    const childPrice = childTickets * CHILD_TICKET_PRICE;
    const seniorPrice = seniorTickets * SENIOR_TICKET_PRICE;

    const popcornPrice = popcornSize ? getPopcornPrice(popcornSize) : 0;
    const drinkPrice = drinkSize ? getDrinkPrice(drinkSize) : 0;

    return adultPrice + childPrice + seniorPrice + popcornPrice + drinkPrice;
};

const CheckoutDisplay = ({ movie, cinema, session }: CheckoutDisplayProps) => {
    const [adultTickets, setAdultTickets] = useState(0);
    const [childTickets, setChildTickets] = useState(0);
    const [seniorTickets, setSeniorTickets] = useState(0);
    const [popcornSize, setPopcornSize] = useState<'small' | 'medium' | 'large' | null>(null);
    const [drinkSize, setDrinkSize] = useState<'small' | 'medium' | 'large' | null>(null);

    const totalPrice = calcTotalPrice(adultTickets, childTickets, seniorTickets, popcornSize, drinkSize);

    return (
        <div>
            <h1>Checkout</h1>
            <h2>{movie.title}</h2>
            <p>{cinema.name}</p>
            <p>{session.startTime}</p>

            <div>
                <h3>Tickets</h3>
                <label>
                    Adults:
                    <input
                        type="number"
                        min="0"
                        value={adultTickets}
                        onChange={(e) => setAdultTickets(Number(e.target.value))}
                    />
                </label>
                <label>
                    Children:
                    <input
                        type="number"
                        min="0"
                        value={childTickets}
                        onChange={(e) => setChildTickets(Number(e.target.value))}
                    />
                </label>
                <label>
                    Seniors:
                    <input
                        type="number"
                        min="0"
                        value={seniorTickets}
                        onChange={(e) => setSeniorTickets(Number(e.target.value))}
                    />
                </label>
            </div>

            <div>
                <h3>Popcorn</h3>
                <label>
                    <input
                        type="radio"
                        name="popcorn"
                        value="small"
                        checked={popcornSize === 'small'}
                        onChange={() => setPopcornSize('small')}
                    />
                    Small
                </label>
                <label>
                    <input
                        type="radio"
                        name="popcorn"
                        value="medium"
                        checked={popcornSize === 'medium'}
                        onChange={() => setPopcornSize('medium')}
                    />
                    Medium
                </label>
                <label>
                    <input
                        type="radio"
                        name="popcorn"
                        value="large"
                        checked={popcornSize === 'large'}
                        onChange={() => setPopcornSize('large')}
                    />
                    Large
                </label>
                <label>
                    <input
                        type="radio"
                        name="popcorn"
                        value="none"
                        checked={popcornSize === null}
                        onChange={() => setPopcornSize(null)}
                    />
                    None
                </label>
            </div>

            <div>
                <h3>Drinks</h3>
                <label>
                    <input
                        type="radio"
                        name="drink"
                        value="small"
                        checked={drinkSize === 'small'}
                        onChange={() => setDrinkSize('small')}
                    />
                    Small
                </label>
                <label>
                    <input
                        type="radio"
                        name="drink"
                        value="medium"
                        checked={drinkSize === 'medium'}
                        onChange={() => setDrinkSize('medium')}
                    />
                    Medium
                </label>
                <label>
                    <input
                        type="radio"
                        name="drink"
                        value="large"
                        checked={drinkSize === 'large'}
                        onChange={() => setDrinkSize('large')}
                    />
                    Large
                </label>
                <label>
                    <input
                        type="radio"
                        name="drink"
                        value="none"
                        checked={drinkSize === null}
                        onChange={() => setDrinkSize(null)}
                    />
                    None
                </label>
            </div>

            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
    );
};

export default CheckoutDisplay;
