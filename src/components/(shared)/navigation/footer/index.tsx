import Container from '@components/(shared)/custom/container';

const Footer = () => {
  return (
    <footer className="mt-20 bg-mineshaft-900 py-4">
      <Container className="text-center text-zinc-100">
        <p>&copy; {new Date().getFullYear()} MovieX. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
