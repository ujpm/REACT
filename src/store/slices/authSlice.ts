import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  role: 'admin' | 'user';
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
    role: 'admin' as const
  },
  user: {
    email: 'reactor@gmail.com',
    password: '2test',
    role: 'user' as const
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
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Authentication helper function
export const authenticateUser = (email: string, password: string) => {
  // Check admin credentials
  if (email === PREDEFINED_USERS.admin.email && password === PREDEFINED_USERS.admin.password) {
    return {
      success: true,
      user: {
        email: PREDEFINED_USERS.admin.email,
        role: PREDEFINED_USERS.admin.role
      },
      token: 'admin-token' // In a real app, this would be a JWT token
    };
  }
  
  // Check user credentials
  if (email === PREDEFINED_USERS.user.email && password === PREDEFINED_USERS.user.password) {
    return {
      success: true,
      user: {
        email: PREDEFINED_USERS.user.email,
        role: PREDEFINED_USERS.user.role
      },
      token: 'user-token'
    };
  }

  return { success: false, error: 'Invalid credentials' };
};

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
