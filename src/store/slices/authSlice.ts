import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  role: 'admin' | 'user';
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Predefined users
export const PREDEFINED_USERS = {
  admin: {
    email: 'admin@react.act',
    password: '2ACT',
    role: 'admin' as const,
    name: 'Admin'
  },
  user: {
    email: 'reactor@gmail.com',
    password: '2test',
    role: 'user' as const,
    name: 'Test User'
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

// Authentication helper function
export const authenticateUser = (email: string, password: string): { user: User; token: string } | null => {
  // Check predefined users
  const predefinedUser = Object.values(PREDEFINED_USERS).find(
    (u) => u.email === email && u.password === password
  );

  if (predefinedUser) {
    const { password: _, ...userWithoutPassword } = predefinedUser;
    return {
      user: userWithoutPassword,
      token: 'dummy-jwt-token',
    };
  }

  return null;
};

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
