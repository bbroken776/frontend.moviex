'use client';

import { useEffect, useState } from 'react';

import Container from '@components/(shared)/custom/container';
import DashboardCard from './components/card';

import apiClient from '@services/apiClient';

interface DashboardCardsInformation {
  movies: number;
  users: number;
  likes: number;
}

const DashboardCards = () => {
  const [data, setData] = useState<DashboardCardsInformation>({ movies: 0, users: 0, likes: 0 });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await apiClient.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <DashboardCard title="Users" data={data.users} />
        <DashboardCard title="Movies" data={data.movies} />
        <DashboardCard title="Likes" data={data.likes} />
      </div>
    </Container>
  );
};

export default DashboardCards;
