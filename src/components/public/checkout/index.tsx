import ICinema from '@interfaces/iCinema';
import ICinemaSession from '@interfaces/iCinemaSession';
import IMovie from '@interfaces/iMovie';
import { useState, useEffect } from 'react';

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
  popcorns: { size: 'small' | 'medium' | 'large'; quantity: number }[],
  drinks: { size: 'small' | 'medium' | 'large'; quantity: number }[],
): number => {
  const adultPrice = adultTickets * ADULT_TICKET_PRICE;
  const childPrice = childTickets * CHILD_TICKET_PRICE;
  const seniorPrice = seniorTickets * SENIOR_TICKET_PRICE;

  const popcornPrice = popcorns.reduce((total, p) => total + p.quantity * getPopcornPrice(p.size), 0);
  const drinkPrice = drinks.reduce((total, d) => total + d.quantity * getDrinkPrice(d.size), 0);

  return adultPrice + childPrice + seniorPrice + popcornPrice + drinkPrice;
};

const CheckoutDisplay = ({ movie, cinema, session }: CheckoutDisplayProps) => {
  const [adultTickets, setAdultTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [popcorns, setPopcorns] = useState<{ size: 'small' | 'medium' | 'large'; quantity: number }[]>([]);
  const [drinks, setDrinks] = useState<{ size: 'small' | 'medium' | 'large'; quantity: number }[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const totalTickets = adultTickets + childTickets + seniorTickets;
  const totalPrice = calcTotalPrice(adultTickets, childTickets, seniorTickets, popcorns, drinks);

  // Automatically select random seats close to each other
  useEffect(() => {
    if (totalTickets > 0) {
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      const newSeats: string[] = [];

      if (totalTickets <= 5) {
        // Assign seats in the same row without crossing paths
        const randomRow = rows[Math.floor(Math.random() * rows.length)];
        const validStartPositions = [1, 6]; // Valid starting positions to avoid crossing paths
        const randomStart = validStartPositions[Math.floor(Math.random() * validStartPositions.length)];

        for (let i = 0; i < totalTickets; i++) {
          newSeats.push(`${randomRow}${randomStart + i}`);
        }
      } else {
        // Assign seats across rows, allowing crossing paths
        let remainingTickets = totalTickets;
        while (remainingTickets > 0) {
          const randomRow = rows[Math.floor(Math.random() * rows.length)];
          const seatsInRow = Math.min(remainingTickets, 10); // Max 10 seats per row
          const randomStart = Math.floor(Math.random() * (10 - seatsInRow + 1)) + 1;
          for (let i = 0; i < seatsInRow; i++) {
            newSeats.push(`${randomRow}${randomStart + i}`);
          }
          remainingTickets -= seatsInRow;
        }
      }

      setSelectedSeats(newSeats);
    } else {
      // Clear selected seats when ticket count is 0
      setSelectedSeats([]);
    }
  }, [totalTickets]);

  const handleAddPopcorn = (size: 'small' | 'medium' | 'large') => {
    setPopcorns(prev => [...prev, { size, quantity: 1 }]);
  };

  const handleRemovePopcorn = (index: number) => {
    setPopcorns(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddDrink = (size: 'small' | 'medium' | 'large') => {
    setDrinks(prev => [...prev, { size, quantity: 1 }]);
  };

  const handleRemoveDrink = (index: number) => {
    setDrinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(prev => prev.filter(s => s !== seat));
    } else if (selectedSeats.length < totalTickets) {
      setSelectedSeats(prev => [...prev, seat]);
    } else {
      alert(`You can only select up to ${totalTickets} seats.`);
    }
  };

  const handlePayment = (method: string) => {
    alert(`You bought the cinema tickets using ${method}!`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-mineshaft-900 p-6 rounded shadow-lg">
      <div className="flex-2 bg-mineshaft-800/40 p-6 rounded shadow-md">
        <h3 className="text-2xl font-bold text-amber-400 mb-4">Tickets</h3>
        <div className="space-y-4">
          <label className="block text-mineshaft-100">
            Adults:
            <input
              type="number"
              min="0"
              value={adultTickets}
              onChange={e => setAdultTickets(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 bg-mineshaft-700 text-mineshaft-100 rounded outline-none"
            />
          </label>
          <label className="block text-mineshaft-100">
            Children:
            <input
              type="number"
              min="0"
              value={childTickets}
              onChange={e => setChildTickets(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 bg-mineshaft-700 text-mineshaft-100 rounded outline-none"
            />
          </label>
          <label className="block text-mineshaft-100">
            Seniors:
            <input
              type="number"
              min="0"
              value={seniorTickets}
              onChange={e => setSeniorTickets(Number(e.target.value))}
              className="w-full mt-1 px-4 py-2 bg-mineshaft-700 text-mineshaft-100 rounded outline-none"
            />
          </label>
        </div>

        <h3 className="text-2xl font-bold text-amber-400 mt-6 mb-4">Popcorn</h3>
        <div className="flex gap-4">
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => handleAddPopcorn(size as 'small' | 'medium' | 'large')}
              className="px-4 py-2 bg-amber-500 text-white rounded shadow-md hover:bg-amber-600 transition-all"
            >
              Add {size.charAt(0).toUpperCase() + size.slice(1)} Popcorn
            </button>
          ))}
        </div>
        <ul className="mt-4 text-mineshaft-100">
          {popcorns.map((p, index) => (
            <li key={index} className="flex justify-between items-center">
              {p.quantity} x {p.size} Popcorn - ${getPopcornPrice(p.size).toFixed(2)}
              <button onClick={() => handleRemovePopcorn(index)} className="text-red-500 hover:underline">
                Remove
              </button>
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold text-amber-400 mt-6 mb-4">Drinks</h3>
        <div className="flex gap-4">
          {['small', 'medium', 'large'].map(size => (
            <button
              key={size}
              onClick={() => handleAddDrink(size as 'small' | 'medium' | 'large')}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-all"
            >
              Add {size.charAt(0).toUpperCase() + size.slice(1)} Drink
            </button>
          ))}
        </div>
        <ul className="mt-4 text-mineshaft-100">
          {drinks.map((d, index) => (
            <li key={index} className="flex justify-between items-center">
              {d.quantity} x {d.size} Drink - ${getDrinkPrice(d.size).toFixed(2)}
              <button onClick={() => handleRemoveDrink(index)} className="text-red-500 hover:underline">
                Remove
              </button>
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold text-amber-400 mt-6 mb-4">Seats</h3>
        <div className="bg-mineshaft-800 p-4 rounded-lg">
          <div className="bg-mineshaft-700 text-white py-2 rounded-t-lg text-center mb-4">Cinema Screen</div>
          <div className="flex flex-col gap-4">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((row, rowIndex) => (
              <div
                key={row}
                className={`flex justify-center gap-2 ${rowIndex % 2 === 1 ? 'mb-6' : ''}`} // Adds a path every 2 rows
              >
                {Array.from({ length: 10 }, (_, i) => `${row}${i + 1}`).map((seat, seatIndex) => (
                  <button
                    key={seat}
                    onClick={() => handleSeatSelection(seat)}
                    className={`w-10 h-10 rounded ${
                      selectedSeats.includes(seat) ? 'bg-amber-500' : 'bg-mineshaft-700'
                    } text-white text-sm flex items-center justify-center ${
                      seatIndex === 4 ? 'mr-6' : ''
                    } hover:bg-mineshaft-600 transition-all`} // Adds a path every 5 seats
                  >
                    {seat}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-mineshaft-800/40 p-6 rounded shadow-md flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-amber-400 mb-4">Order Summary</h3>
          <div className="space-y-2 text-mineshaft-100">
            <p>
              <strong>Adult Tickets:</strong> {adultTickets} x ${ADULT_TICKET_PRICE.toFixed(2)}
            </p>
            <p>
              <strong>Child Tickets:</strong> {childTickets} x ${CHILD_TICKET_PRICE.toFixed(2)}
            </p>
            <p>
              <strong>Senior Tickets:</strong> {seniorTickets} x ${SENIOR_TICKET_PRICE.toFixed(2)}
            </p>
            <p>
              <strong>Popcorn:</strong>{' '}
              {popcorns.map((p, i) => (
                <span key={i}>
                  {p.quantity} x {p.size} - ${getPopcornPrice(p.size).toFixed(2)}{' '}
                </span>
              ))}
            </p>
            <p>
              <strong>Drinks:</strong>{' '}
              {drinks.map((d, i) => (
                <span key={i}>
                  {d.quantity} x {d.size} - ${getDrinkPrice(d.size).toFixed(2)}{' '}
                </span>
              ))}
            </p>
            <p>
              <strong>Seats:</strong> {selectedSeats.join(', ')}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-amber-400 mt-6">Total: ${totalPrice.toFixed(2)}</h3>
          <div className="mt-6 flex flex-col gap-4">
            <button
              onClick={() => handlePayment('MB WAY')}
              className="w-full px-6 py-3 bg-amber-500 text-white font-bold rounded shadow-md hover:bg-amber-600 transition-all"
            >
              Pay with MB WAY
            </button>
            <button
              onClick={() => handlePayment('PayPal')}
              className="w-full px-6 py-3 bg-blue-500 text-white font-bold rounded shadow-md hover:bg-blue-600 transition-all"
            >
              Pay with PayPal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDisplay;
