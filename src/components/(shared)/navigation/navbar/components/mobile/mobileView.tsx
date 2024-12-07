import Container from '@components/(shared)/custom/container';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import MobileLinkList from './mobileLinkList';
import MobileProfile from './mobileProfile';

interface MobileViewProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const MobileView = ({ isOpen, setOpen }: MobileViewProps) => {
  const handleStatus = () => setOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.removeAttribute('style');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden absolute top-0 left-0 w-full h-screen bg-mineshaft-900 z-[99999]"
          //          onClick={handleStatus}
          initial={{ x: '-100%', y: 130 }}
          animate={{ x: 0, y: 130 }}
          exit={{ x: '-100%', y: 130 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Container>
            <MobileLinkList />
            <MobileProfile />
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default MobileView;
