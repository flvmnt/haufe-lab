import type { User } from '../types';

const mockUser: User = { id: 'u-001', username: 'ada' };

interface AuthState {
    user: User | null;
}

export function useAuth(): AuthState {
    return { user: mockUser };
}
