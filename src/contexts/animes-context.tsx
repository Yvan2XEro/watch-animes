import React, { PropsWithChildren, createContext, useMemo } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { API_URL } from "../data";
const AnimesContext = createContext({
  loading: true,
  recents: [],
  populars: [],
  movies: [],
  topHairing: [],
});
const AppWithAnimesQueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 60000 * 60,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const AppWithAnimesContextValue = ({ children }: PropsWithChildren) => {
  const contextValue = useAnimesInit();

  return (
    <AnimesContext.Provider value={contextValue}>
      {children}
    </AnimesContext.Provider>
  );
};
export function Provider({ children }: PropsWithChildren) {
  return (
    <AppWithAnimesQueryClientProvider>
      <AppWithAnimesContextValue>{children}</AppWithAnimesContextValue>
    </AppWithAnimesQueryClientProvider>
  );
}

export function useAnimes() {
  const context = React.useContext(AnimesContext);
  if (context === undefined) {
    throw new Error("useAnimes must be used within animesProvider");
  }
  return context;
}

const useAnimesInit = () => {
  const {
    data: recents,
    isLoading: recentsLoading,
    error: recentsError,
  } = useQuery("recent-release", () =>
    fetch(`${API_URL}/recent-release`).then((response) => response.json())
  );

  const {
    data: populars,
    isLoading: popularsLoading,
    error: popularsError,
  } = useQuery("popular", () =>
    fetch(`${API_URL}/popular`).then((response) => response.json())
  );

  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery("anime-movies", () =>
    fetch(`${API_URL}/anime-movies`).then((response) => response.json())
  );

  const {
    data: topHairing,
    isLoading: topHairingLoading,
    error: topHairingError,
  } = useQuery("top-airing", () =>
    fetch(`${API_URL}/top-airing`).then((response) => response.json())
  );
  const loading = useMemo(() => {
    return (
      recentsLoading ||
      popularsLoading ||
      moviesLoading ||
      topHairingLoading ||
      topHairingLoading ||
      popularsLoading
    );
  }, [recentsLoading, popularsLoading, moviesLoading, topHairingLoading]);
  return {
    loading,
    recents: recents || [],
    populars: populars || [],
    movies: movies || [],
    topHairing: topHairing || [],
  };
};
