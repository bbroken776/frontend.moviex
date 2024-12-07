import { useContext } from 'react';
import { AuthContext } from '@contexts/authContext';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context || context == null || context == undefined)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default useAuth;
