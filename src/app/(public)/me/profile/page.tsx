'use client';

import Container from '@components/(shared)/custom/container';
import UserDetails from '@components/public/profile/userDetails';
import useAuth from '@hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Container className="min-h-screen mt-20">
      <UserDetails user={user} />
    </Container>
  );
}
