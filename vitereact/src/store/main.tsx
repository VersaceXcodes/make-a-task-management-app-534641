import { create } from 'zustand';

// Basic types for the store
export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

export interface AuthState {
  token: string | null;
  is_authenticated: boolean;
  user_id?: string;
  user?: any;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profile_picture?: string;
  user_role?: string;
  full_name?: string;
  user_id?: string;
}

export interface UserSetting {
  theme: 'light' | 'dark';
  notifications_enabled: boolean;
  language: string;
  dark_mode_enabled?: boolean;
  timezone_offset?: number;
  notif_in_app_enabled?: boolean;
  notif_push_enabled?: boolean;
}

export interface AppState {
  // Auth
  auth: AuthState;
  auth_state: AuthState;
  auth_token: string | null;
  
  // User
  user_profile: UserProfile | null;
  user_setting: UserSetting | null;
  
  // UI
  ui_preferences: any;
  
  // Data
  notifications: Notification[];
  unread_count: number;
  workspaces: any[];
  task_lists: any[];
  tasks: any[];
  selected_tasks: any[];
  realtime_events: any[];
  
  // Undo
  undo: {
    last_action: any;
  };
  
  // Actions
  set_auth: (auth: AuthState) => void;
  set_auth_token: (token: string | null) => void;
  set_user_profile: (profile: UserProfile | null) => void;
  set_user_setting: (setting: UserSetting | null) => void;
  set_user_info: (info: any) => void;
  clear_auth: () => void;
  update_ui_preferences: (prefs: any) => void;
  setup_socket: (token?: string) => void;
  set_unread_count: (count: number) => void;
  set_workspaces: (workspaces: any[]) => void;
  set_tasks: (tasks: any[]) => void;
  set_selected_tasks: (tasks: any[]) => void;
  set_realtime_event: (event: any) => void;
  set_undo: (undo: any) => void;
  set_notifications: (notifications: Notification[]) => void;
}

// Create the store
export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  auth: {
    token: null,
    is_authenticated: false,
  },
  auth_state: {
    token: null,
    is_authenticated: false,
  },
  auth_token: null,
  user_profile: null,
  user_setting: null,
  ui_preferences: {},
  notifications: [],
  unread_count: 0,
  workspaces: [],
  task_lists: [],
  tasks: [],
  selected_tasks: [],
  realtime_events: [],
  undo: {
    last_action: null,
  },
  
  // Actions
  set_auth: (auth) => set({ auth, auth_state: auth, auth_token: auth.token }),
  set_auth_token: (token) => set({ 
    auth_token: token,
    auth: { ...get().auth, token },
    auth_state: { ...get().auth_state, token }
  }),
  set_user_profile: (profile) => set({ user_profile: profile }),
  set_user_setting: (setting) => set({ user_setting: setting }),
  set_user_info: (info) => set({ user_profile: info }),
  clear_auth: () => set({ 
    auth: { token: null, is_authenticated: false },
    auth_state: { token: null, is_authenticated: false },
    auth_token: null,
    user_profile: null,
  }),
  update_ui_preferences: (prefs) => set({ ui_preferences: prefs }),
  setup_socket: (token) => {}, // Placeholder
  set_unread_count: (count) => set({ unread_count: count }),
  set_workspaces: (workspaces) => set({ workspaces }),
  set_tasks: (tasks) => set({ tasks }),
  set_selected_tasks: (tasks) => set({ selected_tasks: tasks }),
  set_realtime_event: (event) => set({ realtime_events: [...get().realtime_events, event] }),
  set_undo: (undo) => set({ undo }),
  set_notifications: (notifications) => set({ notifications }),
}));

// Export alias for compatibility
export const use_app_store = useAppStore;