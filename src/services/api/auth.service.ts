import api from './config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Hardcoded test credentials - TEMPORARY SOLUTION
const TEST_CREDENTIALS = {
  email: 'test@react.com',
  password: 'test123'
};

const TEST_USER: User = {
  id: '1',
  email: TEST_CREDENTIALS.email,
  name: 'Test User',
  role: 'admin'
};

const TEST_TOKEN = 'test-token-12345';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Check for test credentials first
    if (credentials.email === TEST_CREDENTIALS.email && 
        credentials.password === TEST_CREDENTIALS.password) {
      const testResponse: AuthResponse = {
        user: TEST_USER,
        token: TEST_TOKEN
      };
      this.setAuthData(testResponse);
      return testResponse;
    }

    // If not test credentials, try regular API login
    try {
      const response = await api.post<AuthResponse>('/users/login', credentials);
      this.setAuthData(response.data);
      return { ...response.data };
    } catch (error) {
      // If API fails, show a helpful message about test credentials
      throw new Error(`Login failed. For testing, use email: ${TEST_CREDENTIALS.email} and password: ${TEST_CREDENTIALS.password}`);
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/users/register', data);
    this.setAuthData(response.data);
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get<User>('/users/profile');
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.patch<User>('/users/profile', data);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private setAuthData(data: AuthResponse): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
}

export default new AuthService();
