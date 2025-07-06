import { create } from 'zustand';

interface User {
  uid?: string;
  user_id?: string;
  name: string;
  email: string;
  profile_picture?: string;
  user_role?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  is_authenticated: boolean;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
}

interface AppState {
  // Auth state
  auth_token: string | null;
  user_info: User | null;
  is_authenticated: boolean;
  
  // Notifications
  notifications: Notification[];
  
  // Actions
  set_auth_token: (token: string | null) => void;
  set_user_info: (user: User | null) => void;
  set_auth: (auth: AuthState) => void;
  logout: () => void;
  add_notification: (notification: Notification) => void;
  mark_notification_read: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  auth_token: null,
  user_info: null,
  is_authenticated: false,
  notifications: [],
  
  // Actions
  set_auth_token: (token) => set({ auth_token: token, is_authenticated: !!token }),
  set_user_info: (user) => set({ user_info: user }),
  set_auth: (auth) => set({ 
    auth_token: auth.token, 
    user_info: auth.user, 
    is_authenticated: auth.is_authenticated 
  }),
  logout: () => set({ 
    auth_token: null, 
    user_info: null, 
    is_authenticated: false 
  }),
  add_notification: (notification) => set((state) => ({ 
    notifications: [...state.notifications, notification] 
  })),
  mark_notification_read: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
  })),
}));

// Export aliases for compatibility
export const use_app_store = useAppStore;
export type { Notification, User };