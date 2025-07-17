// Global type declarations to help with compilation

declare module '@tanstack/react-query' {
  interface UseMutationResult<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> {
    isLoading?: boolean;
  }
}

// Extend global types
declare global {
  interface Window {
    [key: string]: any;
  }
}

export {};