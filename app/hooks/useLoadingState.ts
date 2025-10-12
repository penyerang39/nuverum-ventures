import { useState, useEffect } from 'react';

// Global loading state management - default to false for immediate rendering
let globalLoadingState = false;
const loadingStateListeners = new Set<(isLoading: boolean) => void>();

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(globalLoadingState);

  useEffect(() => {
    // Add listener
    loadingStateListeners.add(setIsLoading);

    // Listen for loading complete event
    const handleLoadingComplete = () => {
      globalLoadingState = false;
      loadingStateListeners.forEach(listener => listener(false));
    };

    window.addEventListener('loadingComplete', handleLoadingComplete);

    // Ensure loading is false on mount
    setIsLoading(false);

    return () => {
      // Remove listener
      loadingStateListeners.delete(setIsLoading);
      window.removeEventListener('loadingComplete', handleLoadingComplete);
    };
  }, []);

  return isLoading;
}

// Function to manually set loading state (for testing or manual control)
export function setGlobalLoadingState(isLoading: boolean) {
  globalLoadingState = isLoading;
  loadingStateListeners.forEach(listener => listener(isLoading));
}
