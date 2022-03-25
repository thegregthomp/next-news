import { createContext } from 'react';
import { UserData } from '@/types';

export const UserContext = createContext<{ user: UserData | null }>({
  user: null,
});
